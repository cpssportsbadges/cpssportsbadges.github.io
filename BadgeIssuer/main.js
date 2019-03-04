let CryptoJS = require("crypto-js");
//import BadgeLinkGenerator from './BadgeLinkGenerator.js';
let BadgeLinkGenerator = require("./BadgeLinkGenerator.js");

const rendererAppURL = 'https://jvarilla.github.io/BadgeRenderer/';
let badgeLinkGenerator = new BadgeLinkGenerator(rendererAppURL);

//Create output csv file by converting JSON to CSV

//Traverse DOM and cache the locations of important elements
  
  //File Input Elements
  let fileNameDisplay = $("#filename");
  let fauxFileUploadBtn = $("#faux-file-upload-btn");
  let realFileUploadBtn = $("#upload");

  //Generate Badge Links Button
  let generateCSVBtn = $("#generate-csv-btn");

  //Instructions
  let instructions = {
    step1: $("#step1"),
    step2: $("#step2"),
    step3: $("#step3")
  }

function resetScreen() {
  //Reset File Display Text To No File Selected
  fileNameDisplay.text("No File Selected");
  
  //Hide upload button
  realFileUploadBtn.hide();
  //Disable Generate CSV File Button
  generateCSVBtn.attr("disabled", true);
  //Reset Steps
  instructions.step1.attr("hidden", false);
  instructions.step2.hide();
  instructions.step3.hide();

}

//Convert CSV to JSON
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

  // Inject new line characters between entries
 


  //Make string and remove quotes
   let reformattedCSVData = csv.toString().replace(/['"]+/g, '').replace(/\n,+/g, "\n");//gets rid of quote marks
   return reformattedCSVData;//csv is an array
  }

const generateFileName = () => {
  let date = new Date(Date.now());
  return 'BadgeOutput' + (date.toISOString()).replace(/:/g, "-").replace(/\./g, "-") + ".csv";
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// function handleFileSelect(evt) {
//     const files = evt.target.files; // FileList object

//     // use the 1st file from the list
//     f = files[0];

//     let reader = new FileReader();

//     // Closure to capture the file information.
//     reader.onload = (function(theFile) {
//         return function(e) {
//           let jsonArr = CSV_to_JSON(e.target.result, ',');
//           //let hashBadgeData2 = hashBadgeData(jsonArr);
//           let hashBadgeData2 = badgeLinkGenerator.getBadgeLinks(jsonArr, 4);
//           let csvData = JSON_to_CSV(hashBadgeData2);
//           //let reformattedCSVData = csvData.toString().replace(/['"]+/g, '');//gets rid of quote marks
//           jQuery( '#ms_word_filtered_html' ).val(csvData);
//           download('output.csv', csvData);
//         };
//       })(f);

//       // Read in the image file as a data URL.
//       reader.readAsText(f);
//   }

function setupLoadScreen() { // hides and disables elements at start

  }
$(() => {
  let fileUploaded = '';

  //Setup initial loading screen
  resetScreen();
  fauxFileUploadBtn.on('click', function(){
    realFileUploadBtn.click();
   });


  function handleFileSelect(evt) {
    const files = evt.target.files; // FileList object

    // use the 1st file from the list
    f = files[0];

    let reader = new FileReader();
    // Closure to capture the file information.
     reader.onload = (function(theFile) {
        if (!theFile.name.includes(".csv")) {
          return function(e) {
             fileNameDisplay.text("Please upload a CSV file");
             generateCSVBtn.attr('disabled', true);
             return;
          }
        } else {
          return function(e) {
          let jsonArr = CSV_to_JSON(e.target.result, ',');
          console.log(e.target);
          //let hashBadgeData2 = hashBadgeData(jsonArr);
          fileNameDisplay.text(theFile.name);
          generateCSVBtn.attr('disabled', false);
          generateCSVBtn.on('click', function() {
            let hashBadgeData2 = badgeLinkGenerator.getBadgeLinks(jsonArr, 4);
            let csvData = JSON_to_CSV(hashBadgeData2);
            //let reformattedCSVData = csvData.toString().replace(/['"]+/g, '');//gets rid of quote marks
            jQuery( '#ms_word_filtered_html' ).val(csvData);
            download(generateFileName(), csvData);
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
          let hashBadgeData2 = badgeLinkGenerator.getBadgeLinks(fileUploaded, 4);
          let csvData = JSON_to_CSV(hashBadgeData2);
          //let reformattedCSVData = csvData.toString().replace(/['"]+/g, '');//gets rid of quote marks
          jQuery( '#ms_word_filtered_html' ).val(csvData);
          download(generateFileName(), csvData);
  }

})
 

