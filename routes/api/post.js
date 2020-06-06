const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const { postValidation, validate } = require('../../middleware/validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');



// @route       POST /api/post
// @desc        Create post
// @access      private

router.post('/', [ auth, postValidation() , validate ], async (req, res)=>{
    try{
        
        const { name, text } = req.body 
        const user = await User.findById(req.user.id)
        console.log(user)
        const postField = {
            name,
            text,
            user: req.user.id,
            avatar: user.avatar
        }
        post = new Post(postField)
        await post.save()

        return res.status(200).json({post, "msg": "Post created."})
    }
    catch(err){
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})


// @route       GET /api/post
// @desc        retrieve all posts
// @access      public

router.get('/', async (req, res)=>{
    try{
        const posts = await Post.find()
        return res.status(200).json(posts)
    }
    catch(err){
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})



// @route       DELETE /api/post/post_id
// @desc        Delete user's post
// @access      private

router.delete('/:post_id', auth, async (req, res) => {
    try {

        const post_id = req.params['post_id']
        const user_id = req.user.id

        //remove post
        const post = await Post.findOne({ user: user_id, _id: post_id })
        console.log(post)
        await Post.findOneAndRemove({ user: user_id, _id: post_id })

        return res.status(200).json({ msg: "Post deleted."})
    } catch (err) {
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})


module.exports = router