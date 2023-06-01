document.getElementById('refresh').addEventListener('click', function() {
    chrome.runtime.sendMessage({method: "refreshQuotes"});
  });
  