import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Splash from '../layout/Splash';

const Dashboard = ({ getCurrentProfile, auth: { isAuthenticated, user }, profile: { profile, loading }}) => {

    useEffect(()=>{
        getCurrentProfile();
    }, [])

    const dashboardScreen = (
        <React.Fragment>
            <h1 className="large primary-text"> Dashboard </h1>
            <p className="lead">
                <i className="fa fa-user" />
                Welcome {user.name}
            </p>            
        </React.Fragment>
    )
    

    return (
        <React.Fragment>    
        { loading && profile===null ? <Splash/>: dashboardScreen}
        </React.Fragment>
    )
}

Dashboard.propTypes =  {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile} )(Dashboard)