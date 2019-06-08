/* 
  main.js
  About: 
  Powers the user interface
  of the BadgeIssuer. This file makes
  use of jQuery and some NPM packages.

  main.js does not actually get sent to
  the user's browser, you need to build all
  the dependencies into bundle.js which get sent over.

  Created by: Joseph Varilla
  Last Edited: 6/6/2019
*/

// PLEASE REPLACE WITH THE NEW URL OF THE BADGE RENDERER APPLICATION
const rendererAppURL = 'https://cpssportsbadges.github.io/BadgeRenderer/';

/* Import CryptoJS - Used for creating hashes of badges
  to be appended to badge links */

let CryptoJS = require("crypto-js");

/* Custom JavaScript object used to make badge links and keys */
let BadgeLinkGenerator = require("./BadgeLinkGenerator.js");

// use base link for creating badge links
let badgeLinkGenerator = new BadgeLinkGenerator(rendererAppURL);


// Traverse DOM and cache the locations of important elements

// File Input Elements
let fileNameDisplay = $("#filename");
let fauxFileUploadBtn = $("#faux-file-upload-btn");
let realFileUploadBtn = $("#upload");

// Generate Badge Links Button
let generateCSVBtn = $("#generate-csv-btn");

// Instructions Loaded at the bottom of the screen
let instructions = {
  step1: $("#step1"),
  step2: $("#step2"),
  step3: $("#step3")
}

// Resets the screen to how looked before interacting with it
function resetScreen() {
  //Reset File Display Text To No File Selected
  fileNameDisplay.text("No File Selected");
  
  //Hide upload button
  realFileUploadBtn.hide();
  //Disable Generate CSV File Button
  generateCSVBtn.attr("disabled", true);
  //Reset Instruction Steps
  instructions.step1.attr("hidden", false);
  instructions.step2.hide();
  instructions.step3.hide();

}

// Convert CSV to JSON (Converts the user uploaded csv file)
const CSV_to_JSON = (data, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {});
    });
  };

// Create output csv file by converting JSON to CSV
const JSON_to_CSV = (arrOfJSONData) => {
  const json = arrOfJSONData;
  const fields = Object.keys(json[0])
  //replaces all empty entries with null
  const replacer = function(key, value) { return value === null ? '' : value } 
  
  let csv = json.map(function(row){
    return fields.map(
      function(fieldName){
        return JSON.stringify(row[fieldName], replacer)
    }).join(',').concat(['\n'])
  })
  //csv.unshift(fields.join('\n')); //join via a new line character so it renders properly in excel
  csv.unshift(fields.join(',').concat(['\n'])) // add header column makes header columns horizontal
  // csv.join('\r\n');

  // Remove the extra Record at the end
  csv.pop();
  // Inject new line characters between entries
 


  //Make string and remove quotes
   let reformattedCSVData = csv.toString().replace(/['"]+/g, '').replace(/\n,+/g, "\n");//gets rid of quote marks
   return reformattedCSVData;//csv is an array
  }

// Creates the name of the output file based on the date of creation
const generateFileName = () => {
  let date = new Date(Date.now());
  return 'BadgeOutput' + (date.toISOString()).replace(/:/g, "-").replace(/\./g, "-") + ".csv";
}

// Turns text into a csv file and downloads it onto the user's browser
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

/* After all elements are loaded onto the 
    screen attach these event handlers */
$(() => {
  let fileUploaded = '';

  // Setup initial loading screen
  resetScreen();

  /* The original file button input type
    style was incosistent accross browsers
    so we have it hidden and created a fauxfilebtn
    that we styled with css and linked the click event handler
    for the faux button to the real btn */
  fauxFileUploadBtn.on('click', function(){
    realFileUploadBtn.click();
   });

  
  // Handle the file selection
  function handleFileSelect(evt) {
    const files = evt.target.files; // FileList object

    // use the 1st file from the list
    f = files[0];

    let reader = new FileReader();
    // Closure to capture the file information.
     reader.onload = (function(theFile) {
        if (!theFile.name.includes(".csv")) {
          return function(e) { // Handle if the file was not a csv file
             fileNameDisplay.text("Please upload a CSV file");
             generateCSVBtn.attr('disabled', true);
             instructions.step2.hide();
             instructions.step3.hide();
             instructions.step1.show()
             return;
          }
        } else { // Handle the csv file upload
          return function(e) { // Convert CSV to JSON
            let csvText = e.target.result;
            // Remove excess commas (empty rows)
            csvText = csvText.replace(/\n\,{3,}/gm, "");

            let jsonArr = CSV_to_JSON(csvText, ',');
            
            // Advance Instructions to step 2
            instructions.step1.hide();
            instructions.step2.show();
            instructions.step3.hide();

            // Change file name in upload file button span
            fileNameDisplay.text(theFile.name);
            generateCSVBtn.attr('disabled', false);

            // Handle the generate CSV Button Click
            generateCSVBtn.on('click', function() {
              let hashBadgeData2 = badgeLinkGenerator.getBadgeLinks(jsonArr, 4);
              let csvData = JSON_to_CSV(hashBadgeData2);
              
              // Create and download the csv file
              jQuery( '#ms_word_filtered_html' ).val(csvData);
              download(generateFileName(), csvData);
              
              // Advance to Instruction Step 3
              instructions.step1.hide();
              instructions.step2.hide();
              instructions.step3.show();
          })
        };
      }
        
      })(f);


      // Read in the image file as a data URL.
      fileUploaded = reader.readAsText(f);
  }
   document.getElementById('upload').addEventListener('change', handleFileSelect, false);
  
  //Generate output csv file
  function generateOutputCSV() {
          // Create the get links and keys to the badges
          let hashBadgeData2 = badgeLinkGenerator.getBadgeLinks(fileUploaded, 4);
          let csvData = JSON_to_CSV(hashBadgeData2);
          jQuery( '#ms_word_filtered_html' ).val(csvData);
          download(generateFileName(), csvData);
  }

})

/* Prevents the user from making changes to local storage */
// window.addEventListener('storage', function(e) {
//   if (e.newValue !== null) {// Allow them to delete records
//       localStorage.setItem(e.key, e.oldValue);
//   }
// })
 

