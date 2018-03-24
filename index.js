const Picasa = require('picasa')
const keys = require('./keys.json')
const {token} = require('./token.json')
const fs = require('fs')
const express = require('express');
const app = express();
app.listen(80)
app.get('/oauth2callback',function(req,res){
    const code = {token:req.url.slice(21)}
    fs.writeFile(__dirname + '/token.json', JSON.stringify(code), function(err) {
        if(err) {
            return console.log(err);
        }
    
        res.send("Done!");
    }); 
    
})
app.get('/get_picasa_token',function(req,res){
    const config = {
        clientId     : keys.web.client_id,
        redirectURI  : keys.web.redirect_uris
      }
    const authURL = picasa.getAuthURL(config)
     res.redirect(authURL);
})
const code = token;
const config = {
    clientId     : keys.web.client_id,
    redirectURI  : keys.web.redirect_uris[0],
    clientSecret : keys.web.client_secret
  }
const picasa = new Picasa(config)

// picasa.renewAccessToken(config, "ya29.GluHBbKOqOsJP65rVcSKFmho9Q58H2zo5JyxHZ924fNW3Fs4WTIhmXK_PljIVhN28Z56LK3kUAH9T5tMbw9pz2BGJ-WTuOIUOIemyWYACnG_x_eE7Bxf5m4KaqFK").then(async renewedAccessToken => {
//     //console.log(renewedAccessToken)
//     const albumId = '6535817659141168225'
//     fs.readFile(__dirname + '/sample.jpg', (err, binary) => {
//         const photoData = {
//           title       : 'Jake the dog',
//           summary     : 'Corgis ftw!',
//           contentType : 'image/jpeg',
//           binary      : binary
//         }
//         picasa.postPhoto(renewedAccessToken, albumId, photoData, (error, response) => {
//             console.log(error, response)
//           })
//   })
// })