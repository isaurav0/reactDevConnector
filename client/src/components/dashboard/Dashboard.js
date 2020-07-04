import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import Splash from '../layout/Splash';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ getCurrentProfile, auth: { isAuthenticated, user }, profile: { profile, loading }}) => {

    useEffect(()=>{
        getCurrentProfile();
    }, [getCurrentProfile])

    const dashboardScreen = (
        <Fragment>
            <h1 className="large primary-text"> Dashboard </h1>
            <p className="lead">
                <i className="fa fa-user" />
                Welcome, {user && user.name }.<br/>                
            </p>

            { profile !== null  ? 
                <Fragment>
                    <DashboardActions></DashboardActions>
                    <Experience></Experience>
                    <Education></Education>
                </Fragment> 
            : 
                <Fragment>
                    You have not created a profile yet. Please add some info about you.<br/>
                    <Link exact to='/create-profile' className="btn btn-primary my-1"> Create Profile </Link>
                </Fragment>
            }
        </Fragment>
    )
    

    return (
        <Fragment>    
        { loading && profile===null ? <Splash/>: dashboardScreen}
        </Fragment>
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