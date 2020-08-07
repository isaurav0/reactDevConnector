import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addReply} from '../../actions/post';
import Splash from '../layout/Splash';
import {getAllPosts} from '../../actions/post';

const Discussion = ({ match, auth, posts, addReply, getAllPosts, loading }) => {
    
    useEffect(() => {
        if(posts.length == 0 && loading == true){            
            getAllPosts()
        }        
    }, [])

    const postComment = e => {
        e.preventDefault()
        let text = document.getElementById('comment_text').value
        addReply(match.params.post_id, text)
    }

    return loading ? <Splash /> : (
        <Fragment>
            {posts.map(post => {
                if (post._id == match.params.post_id)
                    return (
                            <Fragment>
                                <Link to="/posts" class="btn">Back To Posts</Link>
                                <div class="post bg-white p-1 my-1">
                                <div>
                                    <Link to="profile.html">
                                        <img class="round-img" src={post.user.avatar} alt=""/>
                                        <h4>{post.user.name}</h4>
                                    </Link>
                                </div>
                                <div>
                                    <p class="my-1">
                                    {post.text}
                                    </p>
                                </div>
                                </div>
                        
                                <div class="post-form">
                                    <div class="bg-primary p">
                                        <h3>Comments</h3>
                                    </div>
                                    <form class="form my-1">
                                        <textarea
                                            id = "comment_text"
                                            name="text"
                                            cols="30"
                                            rows="5"
                                            placeholder="Comment on this post"
                                            required>
                                        </textarea>
                                        <input type="submit" class="btn btn-dark my-1" value="Comment" onClick={e=>postComment(e)}/>
                                    </form>
                                </div>
                        
                                <div class="comments">
                                    {post.comments.map(comment => {
                                        return (
                                            <div class="post bg-white p-1 my-1">
                                                <div>
                                                    <a href="profile.html">
                                                        <img
                                                        class="round-img"
                                                        src={comment.avatar}
                                                        alt=""
                                                        />
                                                        <h4>{comment.user}</h4>
                                                    </a>
                                                </div>
                                                <div>
                                                    <p class="my-1">
                                                        {comment.text}
                                                    </p>
                                                    <p class="post-date">
                                                        Posted on {comment.date}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    )
                                    }
                                </div>
                            </Fragment>
                        )
                })
            }
        </Fragment>
    )
}

Discussion.propTypes = {
    auth: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    posts: state.posts.posts,
    loading: state.posts.loading
})

export default connect(mapStateToProps, {addReply, getAllPosts})(Discussion)