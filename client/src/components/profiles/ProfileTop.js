import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile}) => {

    console.log(profile)
    return (
        <Fragment>
            <div className="profile-top bg-primary p-2">
                <img
                    className="round-img my-1"
                    src={profile.user.avatar}
                    alt=""
                />
                <h1 className="large">{profile.user.name}</h1>
                <p className="lead">{profile.status} at {profile.company}</p>
                <p>{profile.location}</p>

                { profile.social && (
                    <div className="icons my-1">
                        { profile.social.facebook && (
                            <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-facebook fa-2x"></i>
                            </a>
                        ) }


                        { profile.social.twitter && (
                            <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-twitter fa-2x"></i>
                            </a>
                        ) }

                        { profile.social.linkedin && (
                            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-linkedin fa-2x"></i>
                            </a>
                        ) }

                        { profile.social.youtube && (
                            <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-youtube fa-2x"></i>
                            </a>
                        ) }

                        { profile.social.instagram && (
                            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-instagram fa-2x"></i>
                            </a>
                        ) }

                    </div>
                )}                
            </div>
        </Fragment>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default ProfileTop
