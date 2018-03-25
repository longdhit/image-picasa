const Picasa = require('picasa')
const keys = require('./keys.json')
const express = require('express');
const app = express();
var multer  = require('multer')
var upload = multer()
var access;
const config = {
    clientId     : keys.web.client_id,
    redirectURI  : keys.web.redirect_uris[0],
    clientSecret : keys.web.client_secret
  }
const picasa = new Picasa(config)
app.listen(3000,function(){
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
app.get('/oauth2callback',function(req,res){
    picasa.getAccessToken(config,req.url.slice(21),function(err,accessToken,refreshToken){
        if(err) return res.send({success:false,msg:err.message})
        console.log(accessToken,refreshToken)
        return res.send(refreshToken)
    })
        
})
