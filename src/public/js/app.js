const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(messages) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = messages;
    ul.appendChild(li);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value="";
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const roomTitle = document.getElementById("roomTitle");
    roomTitle.innerText = `You have joined [ ${roomName} ] room.`;
    const form = room.querySelector("form");
    form.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value="";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
    addMessage("Someone joined");
})

socket.on("bye", () => {
    addMessage("Someone left the room!");
})

socket.on("new_message", addMessage);

