let duration = 120; // 2分 (秒)
let remaining = duration;
let timerElement = document.getElementById("timer");
let messageElement = document.getElementById("message");

function updateTimer() {
  let min = Math.floor(remaining / 60);
  let sec = remaining % 60;
  timerElement.textContent = `${min}:${String(sec).padStart(2, "0")}`;
}

function startCountdown() {
  updateTimer();
  let countdown = setInterval(() => {
    remaining--;
    updateTimer();

    if (remaining <= 0) {
      clearInterval(countdown);
      messageElement.textContent = "内容が変わりました！🎉";
      timerElement.textContent = "";

      sendNotification();
    }
  }, 1000);
}

function sendNotification() {
  if (Notification.permission === "granted") {
    new Notification("時間になりました！", {
      body: "ページの内容が更新されました。",
    });
  } else {
    Notification.requestPermission();
  }
}

document.getElementById("resetBtn").addEventListener("click", () => {
  remaining = duration;
  messageElement.textContent = "2分後に内容が変わります";
  startCountdown();
});

Notification.requestPermission();
startCountdown();
