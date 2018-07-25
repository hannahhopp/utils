/*
    This was written for generating request JSONs to submit to Google Cloud Vision via curl.
    Medium post about it: https://medium.com/google-cloud/how-to-make-batch-requests-to-google-cloud-vision-using-node-js-and-curl-a16ae20be4fb
*/

const fs = require('fs');
const path = require('path');
const folder = PATH_TO_YOUR_FOLDER;

const writeRequests = () => {
  // creates an array of the files to loop through
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error('Could not list the directory', err);
      process.exit(1);
    }

    files.forEach(file => {
      let [filename, extension] = file.split('.');

      // makes sure you are only looping through your images
      if (extension === 'png' || extension === 'jpeg') {
        let base64 = fs.readFileSync(path.join(folder, file)).toString('base64');
        let req = {
          requests: [{
            image: {
              content: base64
            },
            features: {
              type: "LABEL_DETECTION"
            }
          }]
        }
        fs.writeFileSync(`${filename}.json`, JSON.stringify(req));
      }
    });
  });
}

writeRequests();