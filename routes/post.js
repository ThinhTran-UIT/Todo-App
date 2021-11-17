const express = require('express')
const router = express.Router()


const Post = require("../models/post")

// @route POST api/posts
// @desc Create post
// @access Private

router.post('/', async(req, res) =>{
    const{title, description, url, status} = req.body;

    //Simple Validation
    if(!title)
    return res.status.apply(400).json({success: false, message:'Title is required!'})
    try{
        const newPost = new Post({
            title, 
            description, 
            url: (url.startsWith('https://')) ? url: `https://${url}`,
            status: status || 'TO LEARN',
            user: '619522a3ffb490dc8439c1be'
        })
        await newPost.save()

        res.json({success: true, message:'Happy learning', post: newPost})
    }    catch{
        console.log(error);
        res.status(500).json({success: false, message:"Internal Server Error"});
    }
})

module.exports = router;