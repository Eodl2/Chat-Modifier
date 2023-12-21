// ==UserScript==
// @name         Live Chat Pop-up
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Open live chat in a pop-up window on new broadcast platforms
// @author       때이엠
// @match        https://chzzk.naver.com/live/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Function to copy styles to the pop-up
  function copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
      try {
        if (styleSheet.cssRules) {
          // for <style> and <link> elements
          const newStyleEl = targetDoc.createElement("style");

          Array.from(styleSheet.cssRules).forEach((cssRule) => {
            newStyleEl.appendChild(targetDoc.createTextNode(cssRule.cssText));
          });

          targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) {
          // This part might be redundant now
          const newLinkEl = targetDoc.createElement("link");
          newLinkEl.rel = "stylesheet";
          newLinkEl.href = styleSheet.href;
          targetDoc.head.appendChild(newLinkEl);
        }
      } catch (e) {
        if (styleSheet.href) {
          // for external stylesheets
          const newLinkEl = targetDoc.createElement("link");
          newLinkEl.rel = "stylesheet";
          newLinkEl.href = styleSheet.href;
          targetDoc.head.appendChild(newLinkEl);
        }
      }
    });
  }

  // Function to update the chat pop-up with live messages
  let previousChatContent = ""; // Store the previous content outside the function
  let isUserAtBottom = true; // Flag to track if the user is at the bottom of the chat

  function updateChatPopup(popupWindow) {
    let chatContainer = document.querySelector(
      ".live_chatting_container__SvtrD"
    );
    if (chatContainer) {
      let currentChatContent = chatContainer.innerHTML; // Get current content of the chat

      if (currentChatContent !== previousChatContent) {
        // Clear existing content in the pop-up
        popupWindow.document.body.innerHTML = "";

        // Clone the live chat container
        let clonedContainer = chatContainer.cloneNode(true);

        // Remove the class that hides the chat
        clonedContainer.classList.remove("live_chatting_is_folded__GuPOx");

        // Append the cloned container to the pop-up
        popupWindow.document.body.appendChild(clonedContainer);

        if (isUserAtBottom) {
          // Scroll to the bottom of the popup window
          popupWindow.scrollTo(0, popupWindow.document.body.scrollHeight);
        } else {
          // Display 'New Messages' button
          displayNewMessagesButton(popupWindow);
        }

        // Update the stored content
        previousChatContent = currentChatContent;
      }
    } else {
      console.log("Chat container not found.");
    }
  }

  function displayNewMessagesButton(popupWindow) {
    // Check if the button already exists to avoid duplicates
    let existingButton = popupWindow.document.querySelector(
      ".live_chatting_scroll_button_arrow__tUviD"
    );
    if (existingButton) {
      return; // Button already exists, no need to recreate it
    }

    // Create the button element
    let button = popupWindow.document.createElement("button");
    button.type = "button";
    button.className = "live_chatting_scroll_button_arrow__tUviD"; // Use the same class as the original button
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = "1000"; // Ensure the button is above other elements
    button.style.cursor = "pointer";

    // Add SVG to the button (similar to the original button)
    button.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="live_chatting_scroll_icon__XV5Ou">
            <path d="M7 9L11 13L15 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    `;

    // Set the button's functionality to scroll to the bottom of the chat
    button.onclick = function () {
      popupWindow.scrollTo({
        top: popupWindow.document.body.scrollHeight,
        behavior: "smooth", // Smooth scroll
      });
      button.remove(); // Remove the button after use
    };

    // Append the button to the popup window
    popupWindow.document.body.appendChild(button);
  }

  // Function to create and show the chat pop-up
  function showChatPopup() {
    // Read the width of the .live_chatting_container__SvtrD element
    let chatContainer = document.querySelector(
      ".live_chatting_container__SvtrD"
    );
    let width = chatContainer ? `${chatContainer.offsetWidth}px` : "400px";

    // Create a new window for the pop-up with the dynamic width
    let popupWindow = window.open("", "_blank", `width=${width},height=600`);

    // Copy styles from the original document to the pop-up
    copyStyles(document, popupWindow.document);

    // Update the pop-up window every 2 seconds (or as needed)
    setInterval(() => updateChatPopup(popupWindow), 2000);

    // Add scroll event listener to update isUserAtBottom
    popupWindow.onscroll = function () {
      let scrollTop = popupWindow.scrollY;
      let windowHeight = popupWindow.innerHeight;
      let fullHeight = popupWindow.document.body.scrollHeight;

      // Check if the user is within a certain threshold from the bottom
      isUserAtBottom = scrollTop + windowHeight >= fullHeight - 100; // 100 can be adjusted
    };
  }

  // Function to create the 'Open Chat' button and attach it to .live_chatting_input_tools__OPA1R
  function createOpenChatButton() {
    // Find the .live_chatting_input_tools__OPA1R element
    let toolsContainer = document.querySelector(
      ".live_chatting_input_tools__OPA1R"
    );
    if (!toolsContainer) {
      console.log("Chat tools container not found.");
      return;
    }

    // Create the button element
    let button = document.createElement("button");
    button.textContent = "Open Chat";

    // Apply styling to the button
    button.style.backgroundColor = "rgb(46, 48, 51)";
    button.style.color = "rgba(255, 255, 255, 0.4)";
    button.style.fontFamily =
      '"Sandoll Nemony2", "Apple SD Gothic NEO", "Helvetica Neue", Helvetica, 나눔고딕, NanumGothic, "Malgun Gothic", "맑은 고딕", 굴림, gulim, 새굴림, "noto sans", 돋움, Dotum, sans-serif';
    button.style.fontSize = "13px";
    button.style.height = "29px";
    button.style.borderRadius = "8px";
    button.style.padding = "0px 9px";
    button.style.marginLeft = "auto"; // Add some margin if needed

    // Add the event listener to open the chat popup
    button.addEventListener("click", showChatPopup);

    // Check if there are any child elements in the toolsContainer
    if (toolsContainer.firstChild) {
      // Insert the button before the first child
      toolsContainer.insertBefore(button, toolsContainer.firstChild);
    } else {
      // If there are no child elements, just append the button
      toolsContainer.appendChild(button);
    }
  }
  // Function to observe DOM changes, adjust margin, and append the button
  function observeDOM() {
    const observer = new MutationObserver((mutations) => {
      let toolsContainerFound = false;
      let sendButtonFound = false;

      for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
          if (!toolsContainerFound) {
            const toolsContainer = document.querySelector(
              ".live_chatting_input_tools__OPA1R"
            );
            if (toolsContainer) {
              createOpenChatButton(toolsContainer);
              toolsContainerFound = true;
            }
          }

          if (!sendButtonFound) {
            const sendButton = document.querySelector(
              ".live_chatting_input_send_button__8KBrn"
            );
            if (sendButton) {
              sendButton.style.marginLeft = "10px";
              sendButtonFound = true;
            }
          }

          if (toolsContainerFound && sendButtonFound) {
            observer.disconnect(); // Stop observing after modifications are done
            break;
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Start observing the DOM for changes
  observeDOM();

  // Call the function to create and attach the button when the DOM is fully loaded
  //window.addEventListener('load', function() {
  // createOpenChatButton();
  //});
})();
