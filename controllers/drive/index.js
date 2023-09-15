const methods = {}
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const {google} = require('googleapis');
const TOKEN_PATH = 'token.json';
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const CLIENT_ID = ''
const CLIENT_SECRET = ''
const REDIRECT_URI = ''
const REFERESH_TOKEN = ''

const filePath = path.join(__dirname, '../../public/image/photo.jpg');

const oauthClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauthClient.setCredentials({ refresh_token: REFERESH_TOKEN })

const drive = google.drive({
    version: "v3",
    auth: oauthClient
})

methods.getAllFiles = async function(){
      drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            console.log(`${file.name} (${file.id}) [${files.indexOf(file)}]`);
          });
        } else {
          console.log('No files found.');
        }
      });
}

methods.createFile = async function(){
      try {
        const response = await drive.files.create({
          requestBody: {
            name: 'photo.jpg',
            mimeType: 'image/photo.jpg',
          },
          media: {
            mimeType: 'image/jpg',
            body: fs.createReadStream(filePath),
          },
        });

        console.log(response.data.id);

        return response.data.id

      } catch (error) {
        console.log(error.message);
      }
}

methods.deleteFile = async function(id){

    try{
        const response = await drive.files.delete({
  		        fileId: id
  		});
  		console.log(response.data, response.status);
  	} catch (err){
  		console.log(err.message);
  	}
}

methods.generatePublicUrl = async function (id) {
  try {
    fs.unlink("public/image/photo.jpg", (err) => {
        if (err) console.log(err);
        else console.log("photo was deleted");
    });

    const fileId = id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });

    return result.data.webContentLink

  } catch (error) {
    console.log(error.message);
  }
}

methods.generateDefaultUrl = async function () {
  try {
      const listFile = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
      });

    const fileId = listFile.data.files[0].id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });

    return result.data.webContentLink

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = methods;
