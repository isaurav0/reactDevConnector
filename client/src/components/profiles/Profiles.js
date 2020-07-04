import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getAllProfiles } from '../../actions/profile';
import Splash from '../layout/Splash';



const Profiles = ({ loading, profiles, getAllProfiles }) => {

    useEffect(()=>{
        getAllProfiles();
    }, [])

    const profileScreen = (
        <Fragment>
            <h1 class="large text-primary">Developers</h1>
            <p class="lead">
                <i class="fa fa-connectdevelop"></i> Browse and connect with developers
            </p>

            <div class="profiles">
                {
                    profiles.map(profile => {
                        return (
                            <div class="profile bg-light">
                                <img class="round-img" src={profile.user.avatar} alt="" />
                                <div>
                                    <h2>{ profile.user.name} </h2>
                                    <p> { profile.status } at { profile.company } </p>
                                    <p> { profile.location } </p>
                                    <Link to="/profile" class="btn btn-primary">View Profile</Link>
                                </div>

                                <ul>
                                {
                                    profile.skills.map(skill => {
                                        return (
                                            <li class="text-primary">
                                                <i class="fa fa-check"></i> {skill}
                                            </li>        
                                        )
                                    })
                                }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>   
        </Fragment>
    )

    return (
        <Fragment>
            { loading ? <Splash/> : profileScreen}
        </Fragment>
    )
}

Profiles.propTypes = ({
    loading: PropTypes.bool.isRequired,
    profiles: PropTypes.array.isRequired,
})

const mapStateToProps = state => ({
    loading: state.profile.loading,
    profiles: state.profile.profiles
})

export default connect(mapStateToProps, { getAllProfiles })(Profiles)
