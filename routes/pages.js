const express = require("express");
const path = require("path");
const router = express.Router();

router.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views','/index.ejs'));
});

module.exports=router;