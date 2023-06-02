// content.js
function injectQuote(quote, fontSize, fontColor, fontFamily) {
  var composers = document.querySelectorAll('div[role="textbox"][aria-label="Message Body"]');
  composers.forEach(function(composer) {
    if (composer.innerText.trim() === '') {
      let styledQuote = "\n\n" + "<blockquote style='border-left: 2px solid #ddd; padding-left: 10px; margin-left: 10px; font-size: " + fontSize + "px; color: " + fontColor + "; font-family: " + fontFamily + "; font-weight: bold; font-style: italic;'>" + quote + "</blockquote>";
      composer.innerHTML += styledQuote;
    }
  });
}


chrome.runtime.sendMessage({method: "getQuote"}, function(response) {
  // Fetch settings
  chrome.storage.sync.get(['fontSize', 'fontColor', 'fontFamily'], function(items) {
    injectQuote(response, items.fontSize, items.fontColor, items.fontFamily);
    observeDOM(); // Start observing again for new composers
  });
});


function observeDOM() {
    var container = document.body;
    var observer = new MutationObserver(function() {
      var composer = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
      if (composer) {
        observer.disconnect();
        chrome.runtime.sendMessage({method: "getQuote"}, function(response) {
          // Fetch settings
          chrome.storage.sync.get(['fontSize', 'fontColor', 'fontFamily'], function(items) {
              injectQuote(response, items.fontSize, items.fontColor, items.fontFamily);
              observeDOM(); // Start observing again for new composers
          });
        });
      }
    });
    observer.observe(container, { childList: true, subtree: true });
}

observeDOM();

