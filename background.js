// background.js
let quotes = [];
let currentQuoteIndex = 0;
let isFetching = false;

// Fisher-Yates Shuffle Algorithm
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function fetchQuotesFromGoogleSheets(sheetId, sheetRange) {
    isFetching = true;
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?valueRenderOption=FORMATTED_VALUE`,
        init)
        .then((response) => response.json())
        .then(function(data) {
          if (data.values && data.values.length > 1) {
            // The first row usually contains the headers, so we skip it
            quotes = shuffle(data.values.slice(1).map(item => item[0]));
          } else {
            console.log("No quotes found in the Google Sheet.");
            quotes = [];
          }
          currentQuoteIndex = 0;
          isFetching = false;
        })
        .catch(function(error) {
          console.error("Error fetching quotes from Google Sheets:", error);
          quotes = [];
          currentQuoteIndex = 0;
          isFetching = false;
        });
    });
  }

chrome.storage.sync.get(['sheetId', 'sheetRange', 'clientId'], function(items) {
  fetchQuotesFromGoogleSheets(items.sheetId, items.sheetRange);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getQuote") {
    if (isFetching) {
      setTimeout(function() {
        sendResponse(quotes[currentQuoteIndex]);
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        // Check if we need to refresh the quotes
        if (currentQuoteIndex === 0) {
          chrome.storage.sync.get(['sheetId', 'sheetRange', 'clientId'], function(items) {
            fetchQuotesFromGoogleSheets(items.sheetId, items.sheetRange);
          });
        }
      }, 1000); // Wait for fetching to complete
    } else {
      sendResponse(quotes[currentQuoteIndex]);
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      // Check if we need to refresh the quotes
      if (currentQuoteIndex === 0) {
        chrome.storage.sync.get(['sheetId', 'sheetRange', 'clientId'], function(items) {
          fetchQuotesFromGoogleSheets(items.sheetId, items.sheetRange);
        });
      }
    }
  } else if (request.method == "refreshQuotes") {
    chrome.storage.sync.get(['sheetId', 'sheetRange', 'clientId'], function(items) {
      fetchQuotesFromGoogleSheets(items.sheetId, items.sheetRange);
    });
  }
  return true; // to indicate the response is async
});

