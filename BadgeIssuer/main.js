let CryptoJS = require("crypto-js");
//import BadgeLinkGenerator from './BadgeLinkGenerator.js';
let BadgeLinkGenerator = require("./BadgeLinkGenerator.js");

const rendererAppURL = 'https://jvarilla.github.io/BadgeRenderer/';
let badgeLinkGenerator = new BadgeLinkGenerator(rendererAppURL);

//Generate random key
const keyValArr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j',
'k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const generateRandomInt = (arrLength) => {//generates random int between 0 and one below the arr length
  return Math.floor(Math.random() * arrLength); 
  }
const generateRandomKey = (keyLength = 3) => {//Min of 3 char key
  let key = '';
  if (keyLength < 3) {
    keyLength = 3;
  }

  for(let keyIdx = 0; keyIdx < keyLength; keyIdx++) {
    key += keyValArr[generateRandomInt(keyValArr.length)]
  }
  return key;
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

//Make URL to Badge
const makeBadgeURL = (hash, baseWebsiteURL) => {
  return `${baseWebsiteURL}?ebs=${hash}`;
  }

//Encrypt the JSON String
const hashBadgeData = (arrOfBadgeData) => {
  let arrOfOutput = [];
  console.log(arrOfBadgeData);
  for (let badgeIdx = 0; badgeIdx < arrOfBadgeData.length; badgeIdx++) {
        
        
        let currentBadge = arrOfBadgeData[badgeIdx];
        let recipientEmail = currentBadge.email;
        //Generate Random Key
        let badgeKey = generateRandomKey(4);
        
        //Create Hash
        let badgeData = {
          recipientName: currentBadge.recipientName,
          badgeName: currentBadge.badgeName,
          badgeImage: currentBadge.badgeImage
        }

        
        let badgeDataString = JSON.stringify(badgeData);

        let bytes = CryptoJS.AES.encrypt(badgeDataString, badgeKey);
        
        let badgeHash = bytes.toString();
      
        let badgeURL = makeBadgeURL(badgeHash, rendererAppURL);
        
        arrOfOutput.push({email: recipientEmail, url: badgeURL, key: badgeKey});
    }
      return arrOfOutput;
  }


//Create output csv file by converting JSON to CSV
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

function download(filename, text) {
    console.log('downloading');
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
// document.getElementById("dwn-btn").addEventListener("click", function(){
//     // Generate download of hello.txt file with some content
//     var text = document.getElementById("text-val").value;
//     var filename = "hello.txt";
    
//     download(filename, text);
// }, false);

function handleFileSelect(evt) {
    const files = evt.target.files; // FileList object

    // use the 1st file from the list
    f = files[0];

    let reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
          let jsonArr = CSV_to_JSON(e.target.result, ',');
          //let hashBadgeData2 = hashBadgeData(jsonArr);
          let hashBadgeData2 = badgeLinkGenerator.getBadgeLinks(jsonArr, 4);
          let csvData = JSON_to_CSV(hashBadgeData2);
          //let reformattedCSVData = csvData.toString().replace(/['"]+/g, '');//gets rid of quote marks
          jQuery( '#ms_word_filtered_html' ).val(csvData);
          download('output.csv', csvData);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsText(f);
  }

  document.getElementById('upload').addEventListener('change', handleFileSelect, false);

