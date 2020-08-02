import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Splash from '../layout/Splash';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';


const Profile = ({ match, getProfileById,profile: { profile }, loading, auth }) => {
    
    useEffect(() => {
        getProfileById(match.params.id);        
    },[loading])

    return (
        <Fragment>
            { ( loading || profile==null ) ? <Splash /> 
            : 
            <Fragment>
                <Link to="/profiles" className='btn btn-light'>Back to Profiles</Link>

                { 
                auth.isAuthenticated && auth.loading == false && auth.user._id === profile.user._id 
                    && (
                    <Link to="/edit-profile" className='btn btn-dark'>Edit Profile</Link>
                )
                }

                <div className="profile-grid my-1">
                    <ProfileTop profile={profile}/>
                </div>

                <div className="profile-about bg-light p-2">
                    <ProfileAbout profile={profile}/>
                </div>

                <div class="profile-exp bg-white p-2">
                    <ProfileExperience profile={profile} />
                </div>

                <div class="profile-edu bg-white p-2">
                    <ProfileEducation profile={profile} />
                </div>

                <div class="profile-github">
                    <ProfileGithub username={profile.githubusername} />
                </div>

            </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    loading: state.profile.loading,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)