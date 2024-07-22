const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".chatbot header span");
const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");

let userMessage;
const API_KEY = "YOUR_API_KEY"; // Replace with a secure method of storing the API key
const inputInitHeight = chatInput.scrollHeight;

const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

document.querySelector("#current-date").textContent = getCurrentDate();

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    const chatContent = className === "outgoing" 
        ? `<p></p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    };

    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content;
        })
        .catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        generateResponse(incomingChatLi);
    }, 600);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

toggleDarkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

document.addEventListener("DOMContentLoaded", () => {
    const sideMenu = document.querySelector('aside');
    const menuBtn = document.querySelector('#menu_bar');
    const closeBtn = document.querySelector('.close');
    const themeToggler = document.querySelector('.theme-toggler');
    const settingsButton = document.querySelector('#settings_button');
    const settingsPanel = document.querySelector('.settings-panel');
    const closeSettingsButton = document.querySelector('#close_settings_button');
    const settingsForm = document.querySelector('.settings-panel form');
    const logoutButton = document.getElementById('logoutButton');

    // Toggle side menu visibility
    menuBtn.addEventListener('click', () => {
        sideMenu.style.display = "block";
    });

    closeBtn.addEventListener('click', () => {
        sideMenu.style.display = "none";
    });

    // Toggle theme
    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme-variables');
        document.body.classList.toggle('dark-theme');
        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
    });

    // Toggle settings panel visibility
    settingsButton.addEventListener('click', () => {
        settingsPanel.style.display = settingsPanel.style.display === 'none' || settingsPanel.style.display === '' ? 'block' : 'none';
    });

    closeSettingsButton.addEventListener('click', () => {
        settingsPanel.style.display = 'none';
    });

    // Handle settings form changes
    settingsForm.addEventListener('change', (event) => {
        if (event.target.type === 'checkbox') {
            const isChecked = event.target.checked;
            console.log(`Setting ${event.target.name} is now ${isChecked ? 'enabled' : 'disabled'}`);
        }
    });

    // Logout function
    logoutButton.addEventListener('click', () => {
        sessionStorage.clear(); // Or localStorage.clear();

        fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login';
            } else {
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});





