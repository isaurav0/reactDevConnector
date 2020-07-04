import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getAllProfiles } from '../../actions/profile';
import Splash from '../layout/Splash';
import ProfileItem from './ProfileItem';



const Profiles = ({ loading, profiles, getAllProfiles }) => {

    useEffect(()=>{
        getAllProfiles();
    }, [getAllProfiles])

    const profileScreen = (
        <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fa fa-connectdevelop"></i> Browse and connect with developers
            </p>

            <div className="profiles">
                {
                    profiles.map(profile => {
                        return <ProfileItem profile={profile} key={profile.id}/>
                    })                        
                }
            </div>   
        </Fragment>
    )

    return (
        <Fragment>
            { loading && profiles.length===0 ? <Splash/> : profileScreen}
        </Fragment>
    )
}

Profiles.propTypes = {
    loading: PropTypes.bool.isRequired,
    profiles: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    loading: state.profile.loading,
    profiles: state.profile.profiles
})

export default connect(mapStateToProps, { getAllProfiles })(Profiles)
