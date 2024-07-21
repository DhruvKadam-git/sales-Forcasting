const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = "";  // Clear the textarea after sending the message
    chatbox.scrollTop = chatbox.scrollHeight;  // Scroll to the bottom of the chatbox
}

sendChatBtn.addEventListener("click", handleChat);

// Optionally, you can also allow pressing "Enter" to send the message
chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleChat();
    }
});
