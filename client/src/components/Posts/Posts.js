import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllPosts, addPost} from '../../actions/post';

const Posts = ({addPost, getAllPosts, auth, posts}) => {

    useEffect(() => {
        getAllPosts()
    }, []);

    const createPost = (e) => {
        e.preventDefault()
        const text = document.getElementById('text').value;
        const name = auth.user.name
        addPost(name, text)
        document.getElementById('text').value = "";
    }
    

    return (
        <Fragment>
            <h1 class="large text-primary">
            Posts
            </h1>
            <p class="lead"><i class="fa fa-user"></i> Welcome to the community!</p>

            <div class="post-form">
                <div class="bg-primary p">
                <h3>Say Something...</h3>
                </div>
                <form class="form my-1">
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Create a post"
                        required
                        id="text">
                    </textarea>
                    <input type="submit" class="btn btn-dark my-1" value="Submit" onClick={e=>createPost(e)}/>
                </form>
            </div>
        </Fragment> 
    )
}

Posts.propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts
})

export default connect(mapStateToProps, {getAllPosts, addPost})(Posts)