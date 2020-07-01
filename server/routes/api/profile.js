const express = require("express");
const config = require('config');
const request = require('request');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const { experienceValidation, validate } = require('../../middleware/validator');
const { educationValidation, profileValidation } = require('../../middleware/validator');


// @route       GET /api/profile/me
// @desc        Get current user profile
// @access      private

router.get('/me', auth, async (req, res)=>{
    try{
        var profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

        if(!profile)
            return res.status(400).json({ errors: [{ "msg": "No profile of user" }] })

        return res.status(200).json({ profile })
    }
    catch(err){
        console.log(err)
        res.status(500).json({ errors: [ {"msg" : "Internal Server Error"}] })
    }
})

// @route       POST /api/profile/
// @desc        update/create user profile
// @access      private

router.post('/', [ auth, profileValidation(), validate ], async (req, res)=>{
    try{
        const {
            company,
            location,
            website,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body

        const profileFields = {}
        profileFields.social = {}
        profileFields.user = req.user.id
        if(company) profileFields.company = company
        if(location) profileFields.location = location
        if(website) profileFields.website = website
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status
        if(githubusername) profileFields.githubusername = githubusername
        if(youtube) profileFields.social.youtube = youtube
        if(facebook) profileFields.social.facebook = facebook
        if(twitter) profileFields.social.twitter = twitter
        if(linkedin) profileFields.social.linkedin = linkedin
        if(instagram) profileFields.social.instagram = instagram
        if(skills)
            profileFields.skills = skills.split(',').map(skill=> skill.trim())
        try{
            let profile = await Profile.findOne({ user: req.user.id });
            if(profile){
                profile = await Profile.findOneAndUpdate({ user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );                
                return res.status(200).json({profile, "msg": "Updated profile."})                
            }
            profile = new Profile(profileFields)
            profile.save()
            return res.status(200).json({profile, "msg": "Profile created."})
        }
        catch(err){
            console.log(err)
            res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }    
})

// @route       GET /api/profile
// @desc        Get all profiles
// @access      private

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar', 'email'])
        return res.status(200).json(profiles)
    } catch (err) {
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})


// @route       GET /api/profile/user/user_id
// @desc        Get profile by user id
// @access      public

router.get('/user/:user_id', async (req, res) => {
    try {
        user_id = req.params['user_id']
        const profile = await Profile.findOne({ user: user_id }).populate('user', ['name', 'avatar', 'email'])
        if(!profile)
            return res.status(404).json({ errors: [{ "msg": "Profile Not Found." }] })
        return res.status(200).json(profile)
    } catch (err) {
        console.log(err)
        if(err.kind == 'ObjectId'){
            return res.status(404).json({ errors: [{ "msg": "Profile Not Found." }] })
        }
        return res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})

// @route       DELETE /api/profile
// @desc        Get all profiles
// @access      private

router.delete('/', auth, async (req, res) => {
    try {
        //remove profile      
        await Profile.findOneAndRemove({ user: req.user.id })

        //remove user
        await User.findOneAndRemove({ user: req.user.id })

        return res.status(200).json({ msg: "User deleted."})
    } catch (err) {
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})


// @route       PUT /api/profile/education
// @desc        Add profile education
// @access      private

router.put('/education', [ auth, educationValidation(), validate ] , async (req, res) => {
    try {

        const {
            degree, 
            school,
            fieldofstudy, 
            from,
            to,
            current,
            description
        } = req.body

        const newEdu = {
            degree, 
            school,
            fieldofstudy, 
            from,
            to,
            current,
            description
        } 

        try {
            const profile = await Profile.findOne({ user: req.user.id });        
            profile.education.unshift(newEdu);
            await profile.save()
            return res.status(200).send({msg: "Education Added."})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})



// @route       DELETE /api/profile/education/edu_id
// @desc        Add profile education
// @access      private

router.delete('/education/:edu_id', auth , async (req, res) => {
    try {
        const edu_id = req.params['edu_id']
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.map(edu => edu.id).indexOf(edu_id)
        profile.education.splice(removeIndex, 1)
        await profile.save()
        return res.status(200).send({msg: "Education Removed."})
    } catch (err) {
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})


// @route       PUT /api/profile/experience
// @desc        Add profile experience
// @access      private

router.put('/experience', [ auth, experienceValidation(), validate ] , async (req, res) => {
    try {

        const {
            title, 
            company,
            location, 
            from,
            to,
            current,
            description
        } = req.body

        const newExp = { title,  company, location,  from, to, current, description } 

        try {
            const profile = await Profile.findOne({ user: req.user.id });        
            profile.experience.unshift(newExp);
            await profile.save()
            return res.status(200).send({msg: "Experience Added."})
        } catch (err) {
            // console.log(err)
            return res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})



// @route       DELETE /api/profile/experience/exp_id
// @desc        Add profile experience
// @access      private

router.delete('/experience/:exp_id', auth , async (req, res) => {
    try {
        const exp_id = req.params['exp_id']
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.experience.map(exp => exp.id).indexOf(exp_id)
        profile.experience.splice(removeIndex, 1)
        await profile.save()
        return res.status(200).send({msg: "Experience Removed."})
    } catch (err) {
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})


// @route       GET /api/profile/github/:username
// @desc        Get user repos from github
// @access      Public

router.get('/github/:username' , async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params['username']}/repos?per_page=5&sort=creat
                ed:asc&client_id=${config.get('GITHUBCLIENTID')}&client_secret=${config.get('GITHUBSECRET')}`,
            method: "GET",
            headers: { 'user-agent': 'node.js'}
        }

        request(options, (err, response, body) => {
            if(err) console.log(err)
            if(response.statusCode != 200)
                return res.status(404).json({ errors: [{ "msg": "Github Profile Not Found." }] })
            return res.json(JSON.parse(body))
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ "errors": [ {"msg" : "Internal Server Error"}] })
    }
})


module.exports = router