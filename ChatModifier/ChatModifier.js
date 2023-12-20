// ==UserScript==
// @name         Broadcast Platform Chat Modifier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Modify the size of the live chat container
// @author       때이엠
// @match        https://chzzk.naver.com/live/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Function to update the width of the chat container
  function updateChatWidth() {
    var width = document.getElementById("chatWidthInput").value;
    var chatContainer = document.querySelector(
      ".live_chatting_container__SvtrD"
    );
    if (chatContainer) {
      chatContainer.style.width = width + "px";
    }
  }

  // Create an input box for width
  var inputBox = document.createElement("input");
  inputBox.id = "chatWidthInput";
  inputBox.type = "number";
  inputBox.placeholder = "채팅창 크기(기본값 380)";
  inputBox.style.position = "fixed";
  inputBox.style.top = "20px";
  inputBox.style.right = "200px";
  inputBox.style.zIndex = "1000";
  inputBox.style.backgroundColor = "white"; // Better visibility on black background
  inputBox.style.color = "black";
  inputBox.style.border = "1px solid gray";
  inputBox.style.padding = "2px";

  // Add an event listener to the input box
  inputBox.addEventListener("change", updateChatWidth);

  // Append the input box to the body
  document.body.appendChild(inputBox);
})();
