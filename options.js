function save_options() {
    var sheetId = document.getElementById('sheetId').value;
    var sheetRange = document.getElementById('sheetRange').value;
    var clientId = document.getElementById('clientId').value;
  
    chrome.storage.sync.set({
      sheetId: sheetId,
      sheetRange: sheetRange,
      clientId: clientId
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 2000);
  
      // Fetch quotes with the updated sheetId and sheetRange values
      chrome.runtime.sendMessage({ method: 'fetchQuotes', sheetId: sheetId, sheetRange: sheetRange });
    });
  }
  
  // Restores options from chrome.storage
  function restore_options() {
    chrome.storage.sync.get({
      sheetId: '',
      sheetRange: '',
      clientId: ''
    }, function(items) {
      document.getElementById('sheetId').value = items.sheetId;
      document.getElementById('sheetRange').value = items.sheetRange;
      document.getElementById('clientId').value = items.clientId;
    });
  
    // Get the extension ID
    var extensionId = chrome.runtime.id;
    var extensionIdElement = document.getElementById('extensionId');
    extensionIdElement.textContent = 'Your extension ID is: ' + extensionId;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('save');
    if (saveButton) {
      saveButton.addEventListener('click', save_options);
    }
  
    restore_options();
  });
  
  