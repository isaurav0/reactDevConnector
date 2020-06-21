const express = require("express")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const router = express.Router();
const secret = config.get('SECRET')

const auth = require('../../middleware/auth')
const { authValidation, validate } = require('../../middleware/validator');

const User = require('../../models/User')

// @route       GET /api/auth 
// @desc        get user
// @access      Public

router.get('/', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(err){
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})

// @route       POST /api/auth 
// @desc        get user
// @access      Public

router.post('/', authValidation(), validate, async (req, res)=>{
    
    const { email, password } = req.body
    
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({errors: [{ msg: "User doesn't exists."}]})
        }

        isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            res.status(401).json({errors: [{ msg: "Incorrect Password."}]})

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = await jwt.sign(payload, secret, { expiresIn: 360000 })

        res.status(200).json({ token })
    }
    catch(err){
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }

})

module.exports = router