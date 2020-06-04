const express = require("express")
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')
const secret = config.get('SECRET')
const { authValidationRules, validate } = require('../../utils/validator');

router.get('/', auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }
    catch(err){
        throw err;
    }
})

router.post('/', authValidationRules(), validate, async (req, res)=>{
    
    const { email, password } = req.body
    
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({errors: [{ msg: "User doesn't exists."}]})
        }

        console.log(email)
        isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            res.status(401).json({errors: [{ msg: "Incorrect Password."}]})

        const payload = {
            user: {
                id: user._id
            }
        }

        const token = await jwt.sign(payload, secret, { expiresIn: 360000 })

        res.status(200).json({ token })
    }
    catch(err){
        console.log(err)
        res.status(500).json({ "error": "Internal Server Error"})
    }

})

module.exports = router