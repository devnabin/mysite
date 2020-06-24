const express = require('express')
const router = express.Router()

router.get('/blog',(req,res)=>{
    // if (!(req.cookies.user && req.cookies['coo-key'])) return res.render("404");
    res.render("blog");
})

module.exports = router