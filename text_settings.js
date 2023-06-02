document.addEventListener('DOMContentLoaded', function() {
    // Load settings from storage and set the current UI elements to those values
    chrome.storage.sync.get(['fontSize', 'fontColor', 'fontFamily'], function(items) {
        document.getElementById('fontSize').value = items.fontSize || 10; // default to 10 if no value is set
        document.getElementById('fontColor').value = items.fontColor || 'black'; // default to black if no color is set
        document.getElementById('fontFamily').value = items.fontFamily || 'Arial'; // default to Arial if no font is set
    });

    // Save settings to storage when the Save button is clicked
    document.getElementById('saveSettings').addEventListener('click', function() {
        var fontSize = document.getElementById('fontSize').value;
        var fontColor = document.getElementById('fontColor').value;
        var fontFamily = document.getElementById('fontFamily').value;

        chrome.storage.sync.set({
            fontSize: fontSize,
            fontColor: fontColor,
            fontFamily: fontFamily
        }, function() {
            // Update status to let user know settings were saved.
            alert('Settings saved!');
        });
    });

    // Close the tab when the Close Page button is clicked
    document.getElementById('closePage').addEventListener('click', function() {
        window.close();
    });
});
