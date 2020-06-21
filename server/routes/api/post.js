const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const auth = require('../../middleware/auth');

const { postValidation, commentValidation, validate } = require('../../middleware/validator');

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
        const posts = await Post.find().populate('user', ['name', 'avatar'])
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


// @route       PUT /api/post/like/post_id
// @desc        like user's post
// @access      private

router.put('/like/:post_id', auth, async (req, res) => {
    try {

        const post_id = req.params['post_id']
        const user_id = req.user.id

        const post = await Post.findOne({ user: user_id, _id: post_id })        

        const index = post.likes.map(elem => elem._id).indexOf(user_id)
        const length = post.likes.filter(like => like.id.toString()==user_id ).length
        
        if( length == 0 ){ // or index == -1
            post.likes.unshift(user_id)
            await post.save()
            return res.status(200).json({ msg: "Post liked successfully."})
        }

        return res.status(400).json({ msg: "Post already liked."})

    } catch (err) {
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})


// @route       PUT /api/post/like/post_id
// @desc        like user's post
// @access      private

router.put('/unlike/:post_id', auth, async (req, res) => {
    try {

        const post_id = req.params['post_id']
        const user_id = req.user.id

        const post = await Post.findOne({ user: user_id, _id: post_id })        

        const index = post.likes.map(elem => elem._id).indexOf(user_id)
        
        if(index == -1 ){
            return res.status(400).json({ msg: "Post not liked."})
        }

        post.likes.splice(index, 1)
        await post.save()
        return res.status(200).json({ msg: "Post unliked successfully."})

    } catch (err) {
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})



// @route       POST /api/post/comment/post_id
// @desc        Add comment to post
// @access      private

router.post('/comment/:post_id', [ auth, commentValidation(), validate ],async (req, res) => {
    try {

        const { text } = req.body
        const post_id = req.params['post_id']
        const user_id = req.user.id

        const post = await Post.findOne({ user: user_id, _id: post_id })
        const user = await User.findById(user_id)

        const newComment = {
            text,
            user: user.id,
            avatar: user.avatar
        }
        
        post.comments.unshift(newComment)
        await post.save()
        return res.status(200).json({ msg: "Comment Added Successfully."})


    } catch (err) {
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})


// @route       DELETE /api/post/comment/post_id
// @desc        like user's post
// @access      private

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        
        const post_id = req.params['post_id']
        const comment_id = req.params['comment_id']
        const user_id = req.user.id

        const post = await Post.findOne({ user: user_id, _id: post_id })        

        const index = post.comments.map(elem => elem._id).indexOf(comment_id)
        
        if(index == -1 )
            return res.status(404).json({ msg: "Comment Not Found."})

        if(post.comments[index].user != user_id  && post.user != post_id )
            return res.status(401).json({ msg: "Not Allowed."})

        post.comments.splice(index, 1)
        await post.save()
        return res.status(200).json({ msg: "Comment removed successfully."})

    } catch (err) {
        console.log(err)
        res.status(500).json({"msg": "Internal Server Error"})
    }
})



module.exports = router