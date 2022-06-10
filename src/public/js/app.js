const messageList = document.querySelector("ul");
const messageForm = document.getElementById("message");
const nicknameForm = document.getElementById("nickname");
const socket = new WebSocket(`ws://${window.location.host}`);

function nameMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}


socket.addEventListener("open", () => {
    console.log("Connected to Server. ✅")
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.appendChild(li);
})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server. ❌")
})

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input")
    socket.send(nameMessage("new_message", input.value));
    input.value = "";
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(nameMessage("nickname", input.value));
}

messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit)