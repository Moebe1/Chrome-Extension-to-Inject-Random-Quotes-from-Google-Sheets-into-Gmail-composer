document.getElementById('refresh').addEventListener('click', function() {
    chrome.runtime.sendMessage({method: "refreshQuotes"});
  });
  
  document.getElementById('textSettings').addEventListener('click', function() {
    chrome.tabs.create({url: 'text_settings.html'});
});
