import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllPosts, addPost} from '../../actions/post';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import Splash from '../layout/Splash';

const Posts = ({addPost, getAllPosts, auth, posts, loading}) => {

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
    return loading ? <Splash /> : (
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

            <div className="posts">
            {posts.map(post=>{
                let date = Moment(post.date).format('DD MMMM YYYY')
                let likes_count = post.likes.length
                let comments_count = post.comments.length
                return (
                    <div class="post bg-white p-1 my-1">
                        <div>
                            <Link to={`/profile/${post.user._id}`}>
                                <img
                                    class="round-img"
                                    src={post.avatar}
                                    alt=""/>
                                <h4>{post.user.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p class="my-1">
                            {post.text}
                            </p>

                            <p class="post-date">
                                Posted on {date}
                            </p>

                            <button type="button" class="btn btn-light">
                                <i class="fa fa-thumbs-up"></i>&nbsp;&nbsp;
                                <span>{likes_count}</span>
                            </button>

                            <Link to={`/post/${post._id}`} class="btn btn-primary">
                                Discussion
                                <span class='comment-count'>{comments_count}</span>
                            </Link>

                            {post.user._id==auth.user._id && (
                            <button type="button" class="btn btn-danger">
                                x
                            </button>
                            )}
                        </div>
                    </div>
                )
            })}
            </div>

        </Fragment> 
    )
}

Posts.propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts.posts,
    loading: state.posts.loading
})

export default connect(mapStateToProps, {getAllPosts, addPost})(Posts)