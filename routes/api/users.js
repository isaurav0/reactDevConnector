const express = require("express")
const router = express.Router();
const { registerValidation, validate } = require('../../middleware/validator');
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const secret = config.get('SECRET')

// @route       /api/users 
// @desc        Register user
// @access      Public

router.get('/', async (req, res)=>{
    res.send("users")
})

router.post('/', registerValidation(), validate, async (req, res)=>{
    
    const { name, email, password } = req.body
    
    try{
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({errors: [{ msg: "user already exists"}]})
        }

        const avatar = gravatar.url(email, {
            s: '200',
            pg: 'pg',
            d: 'mm'
        })

        user = new User({
            name, 
            email, 
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user._id
            }
        }

        const token = await jwt.sign(payload, secret, { expiresIn: 360000 })

        res.status(200).json({ msg: "user registered", token })
    }
    catch(err){
        console.log(err)
        res.status(500).json({ "error": "Internal Server Error"})
    }

})

module.exports = router