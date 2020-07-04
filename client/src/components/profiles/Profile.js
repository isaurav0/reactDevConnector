import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Splash from '../layout/Splash';
import { getProfileById } from '../../actions/profile';


const Profile = ({ match, getProfileById, profile, loading, auth }) => {
    
    useEffect(() => {
        getProfileById(match.params.id);
        console.log(match.params.id)
    },[])

    const profilePage = (
        <h1>Hello {match.params.id}</h1>
    )

    return (
        <Fragment>
            { loading || profile===null ? <Splash /> : profilePage }
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