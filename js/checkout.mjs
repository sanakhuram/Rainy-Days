
document.addEventListener("DOMContentLoaded", function () {
  function displayMessage() {
    const messageContainer = document.querySelector(".message-container");
    messageContainer.style.display = "block";
  }

  setTimeout(displayMessage, 1000);
});

