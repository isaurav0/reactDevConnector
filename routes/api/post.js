const express = require("express")
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const config = require('config')
const { postValidation, validate } = require('../../middleware/validator');


// @route       /api/post 
// @desc        Create post
// @access      private

router.get('/', [ auth, postValidation, validate ], async (req, res)=>{
    try{
        const { name, text } = req.body
        
    }
    catch(err){
        throw err;
    }
})

module.exports = router