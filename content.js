// content.js
// function injectQuote(quote) {
//     var composer = document.querySelector('div[role="textbox"][aria-label="Message Body"][class="Am Al editable LW-avf tS-tW"]');
//     if (composer) {
//       composer.innerText += "\n\n" + quote;
//     }
//   }
  
//   chrome.runtime.sendMessage({method: "getQuote"}, function(response) {
//     injectQuote(response);
//   });

// function injectQuote(quote) {
//     var composer = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
//     if (composer) {
//       // Add the quote only if it doesn't already contain one
//       if (!composer.innerText.includes("--- Quote ---")) {
//         composer.innerText += "\n\n--- Quote ---\n" + quote + "\n--- End Quote ---";
//       }
//     }
//   }

// function observeDOM() {
//     var container = document.body;
//     var observer = new MutationObserver(function() {
//       var composer = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
//       if (composer) {
//         observer.disconnect();
//         chrome.runtime.sendMessage({method: "getQuote"}, function(response) {
//           injectQuote(response);
//           observeDOM(); // Start observing again for new composers
//         });
//       }
//     });
//     observer.observe(container, { childList: true, subtree: true });
//   }
  
//   observeDOM();
  
// content.js
// let processedComposers = new Set();

// function injectQuote(quote) {
//   var composer = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
//   if (composer) {
//     let composerId = Date.now() + composer.innerText;
//     if (!processedComposers.has(composerId)) {
//       composer.innerText += "\n\n" + quote;
//       processedComposers.add(composerId);
//     }
//   }
// }

// function observeDOM() {
//   var container = document.body;
//   var observer = new MutationObserver(function() {
//     var composer = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
//     if (composer) {
//       observer.disconnect();
//       chrome.runtime.sendMessage({method: "getQuote"}, function(response) {
//         injectQuote(response);
//         observeDOM(); // Start observing again for new composers
//       });
//     }
//   });
//   observer.observe(container, { childList: true, subtree: true });
// }

// observeDOM();

// content.js
function injectQuote(quote) {
    var composers = document.querySelectorAll('div[role="textbox"][aria-label="Message Body"]');
    composers.forEach(function(composer) {
      if (composer.innerText.trim() === '') {
        let styledQuote = "\n\n" + "<blockquote style='border-left: 2px solid #ddd; padding-left: 10px; margin-left: 10px; font-weight: bold; font-style: italic;'>" + quote + "</blockquote>";
        composer.innerHTML += styledQuote;
      }
    });
  }
  
  function observeDOM() {
    var container = document.body;
    var observer = new MutationObserver(function() {
      var composer = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
      if (composer) {
        observer.disconnect();
        chrome.runtime.sendMessage({method: "getQuote"}, function(response) {
          injectQuote(response);
          observeDOM(); // Start observing again for new composers
        });
      }
    });
    observer.observe(container, { childList: true, subtree: true });
  }
  
  observeDOM();
  