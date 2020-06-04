const express = require("express")
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile')
const User = require('../../models/User');
const { profileValidationRules, validate } = require('../../middleware/validator');


// @route       GET /api/profile/me
// @desc        Get current user profile
// @access      private

router.get('/me', auth, async (req, res)=>{
    try{
        var profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

        if(!profile)
            return res.status(400).json({ msg: "No profile of user"})

        return res.status(200).json({ profile })
    }
    catch(err){
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})

// @route       POST /api/profile/
// @desc        update/create user profile
// @access      private

router.post('/', [ auth, profileValidationRules(), validate ], async (req, res)=>{
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
                return res.status(200).json({profile, "msg": "updated profile"})                
            }
            profile = new Profile(profileFields)
            profile.save()
            return res.status(200).json({profile, "msg": "Profile created "})
        }
        catch(err){
            console.log(err)
            res.status(500).json({"msg": "Internal Server Error"})
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
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
        res.status(500).json({"msg": "Internal Server Error"})
    }
})


// @route       GET /api/profile/user/user_id
// @desc        Get profile by user id
// @access      private

router.get('/user/:user_id', async (req, res) => {
    try {
        user_id = req.params['user_id']
        const profile = await Profile.findOne({ user: user_id }).populate('user', ['name', 'avatar', 'email'])
        if(!profile)
            return res.status(404).json({"msg": "Profile not found"})
        return res.status(200).json(profile)
    } catch (err) {
        console.log(err)
        if(err.kind == 'ObjectId'){
            return res.status(404).json({"msg": "Profile not found"})
        }
        return res.status(500).json({"msg": "Internal Server Error"})
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

        return res.status(200).json({ msg: "user deleted"})
    } catch (err) {
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})




module.exports = router