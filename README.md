# Gmail Quote Injector from Google Sheets Chrome Extension
Unpacked Chrome Extension that injects a random quote from a user specified Google Sheet into a Gmail Composer.

## Change Log
Date: 2/06/2023
a. Updated to V3 Chrome Manifest
b. Added a Text settings page with font selection, font size and font color
c. Changes once saved are applied immediately
d. Left Aligned elements on the Text Settings Page

## Google API Console & Initial Setup
1. Download the repository to a suitable location on your computer
2. Go to console.cloud.google.com
3. In the Project Selector Drop down, create a new project with a name like "Gmail Quote Injector"
4. Click into Enabled APIs and Services and click Enable APIs and Services > Search for Sheets > Enable Sheets API
5. Go to chrome://extensions > toggle Developer Mode ON > Load Unpacked and select the folder containing the extension
6. Click on Detail (of the Extension) > Copy the ID and keep handy
7. Go back to the Google API Console > click on OAuth Consent Screen > User Type External > Create > 
Give the App a Name > Your Email for user support > Your email address again for Dev Contact Info > Save and Continue > Add or Remove Scopes > Manually Paste the Following Scope https://www.googleapis.com/auth/spreadsheets.readonly > Add to Table > Update > Save and Continue > Test Users > Your Email > Save and Continue > Back to Dashboard
Click on Credentials > Create Credentials > OAuth Client ID > Application Type: Chrome Extension > Paste ID from step 6  into ITEM ID field. Give client a name and click CREATE > Copy the Client ID and paste into manifest.json where indicated.

## Setup the Google Sheet for the Quotes
1. Go to sheets.google.com > new
2. Add as many quotes as you like to a column, eg. A. The first row is ignored, so add headers or leave blank
3. Publish your sheet, and grab the SheetID. Look at the URL to find the SheetID > Keep Handy along with the Column containing the quotes.

## Extension Config
1. Click on Extensions (Puzzle Piece) > Pin the Extension
2. Click the Extension Icon > click the link for Extension options Page > Enter your Sheet ID and your Rang
3. eg. if your quotes are from A2 - A200 then enter A2:A200. If your quotes are on Column A and you keep adding them, then enter A:A and it will automatically set the range. You can even select a range such as A1:D100 as per your requirements
4. Click Save
5. Click the Extension Again and click Refresh Quotes
6. To use the Extension, simply login to your Gmail > click Compose and a random quote from your sheet will be pasted into the email composer.

## Troubleshooting
1. Open chrome://extensions > Locate the Extension > click on Background Page to open the Extension Dev Tools
2. Note the error and either google search or reach out for assistance. Include screenshots of the error.
3. Under Errors, you may see a warning about Manifest V2 Deprication, this does not interfere with the extension's functionality.
