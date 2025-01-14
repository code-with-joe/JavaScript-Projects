const inputBox = document.querySelector("input");
const send = document.querySelector(".send");
const chatBox = document.querySelector(".chat-box");
const apiKey = "API_KEY";

function sendBtn() {
  send.style.display = inputBox.value ? "block" : "none";
}

send.addEventListener("click", async () => {
  const userMessage = inputBox.value.trim();
  if (userMessage) {
    const usermsg = document.createElement("h4");
    usermsg.className = "user";
    usermsg.textContent = userMessage;
    chatBox.appendChild(usermsg);
    inputBox.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    const botMsg = document.createElement("h5");
    botMsg.className = "ai";
    botMsg.textContent = "Loading....";
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      });

      const data = await response.json();
      const botReplay = data?.candidates[0]?.content.parts[0]?.text || "Sorry, I couldn't understand that.";
      botMsg.textContent = botReplay;
      chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
      console.log("error");
      botMsg.textContent = "Sorry, I couldn't understand that.";
    }
  }
});

window.setInterval(sendBtn, 1000);
