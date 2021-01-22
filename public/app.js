const socket = io();
let uname = undefined;

do {
  uname = prompt("Enter Your Name");
} while (!uname);

const input = document.querySelector("#msg");
const sendBtn = document.querySelector("#submit");
const msgArea = document.querySelector(".messages");

document.body.style.minHeight = window.getComputedStyle(document.body).height;

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) {
    input.value = "";
    return;
  }
  const msgblock = document.createElement("div");
  msgblock.classList.add("o-msg");
  const desc = `
        <span>${uname}</span>
          <p>${message}</p>
    `;
  msgblock.innerHTML = desc;
  msgArea.appendChild(msgblock);
  scrollToBottom();
  const msg = { uname, msg: message };
  socket.emit("msg", msg);
  input.value = "";
});

socket.on("msg", (data) => {
  update(data);
});

const update = (data) => {
  const uname = data.uname;
  const message = data.msg;
  const msgblock = document.createElement("div");
  msgblock.classList.add("i-msg");
  const desc = `
        <span>${uname}</span>
          <p>${message}</p>
    `;
  msgblock.innerHTML = desc;
  msgArea.appendChild(msgblock);
  scrollToBottom();
};

function scrollToBottom() {
  msgArea.scrollTop = msgArea.scrollHeight;
}
