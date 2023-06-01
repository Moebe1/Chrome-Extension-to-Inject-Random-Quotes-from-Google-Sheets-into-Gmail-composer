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
  
