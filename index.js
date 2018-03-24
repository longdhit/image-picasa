const Picasa = require('picasa')
const keys = require('./keys.json')
const {token} = require('./token.json')
const fs = require('fs')
const express = require('express');
const app = express();
var multer  = require('multer')
var upload = multer()

const config = {
    clientId     : keys.web.client_id,
    redirectURI  : keys.web.redirect_uris[0],
    clientSecret : keys.web.client_secret
  }
const picasa = new Picasa(config)
app.listen(80,function(){
    console.log("Server start")
})

app.get('/get_picasa_token',function(req,res){
    const config = {
        clientId     : keys.web.client_id,
        redirectURI  : keys.web.redirect_uris
      }
    const authURL = picasa.getAuthURL(config)
     res.redirect(authURL);
})

function uploadPhoto(renewedAccessToken, albumId, photoData){
    return new Promise((resolve, reject) => {
        picasa.postPhoto(renewedAccessToken, albumId, photoData, (error, response) => {
            resolve(response)
            reject(error)
          })
    });
}
app.post('/upload', upload.single('photo'),async function (req, res) {
    const renewedAccessToken =  await picasa.renewAccessToken(config,token)
    const albumId = '6535817659141168225'
    let {mimetype,buffer,originalname} = req.file;
    const photoData = {
      title       : originalname,
      summary     : originalname,
      contentType : mimetype,
      binary      : buffer
    }
    uploadPhoto(renewedAccessToken, albumId, photoData).then(result=>{
        res.send(result);
    })  
    .catch(err => res.send(err.message))
})
    