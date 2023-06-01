chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(["clientId"], function(result) {
      if (result.clientId) {
        chrome.identity.getAuthToken({ interactive: false }, function(token) {
          if (chrome.runtime.lastError || !token) {
            console.log("OAuth token not found.");
            return;
          }
  
          // Use the OAuth client ID and token in your logic
          var clientId = result.clientId;
          console.log("OAuth client ID:", clientId);
          console.log("OAuth token:", token);
  
          // Pass the client ID and token to your background.js file
          chrome.runtime.sendMessage({
            clientId: clientId,
            token: token
          });
        });
      } else {
        console.log("OAuth client ID not found.");
      }
    });
  });
  