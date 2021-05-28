import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Splash from './Splash';

const Landing = ({ isAuthenticated, loading }) => {

    if(isAuthenticated){
        return <Redirect to='/dashboard' />
    }

    const landingScreen = (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                <h1 className="x-large">Automata </h1>
                <p className="lead">
                    A portfolio sharing platform for coders, programmers, creators and inventors
                </p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">
                        Sign Up
                    </Link>
                    <Link to="/login" className="btn btn-light">
                        Login
                    </Link>
                </div>
                </div>
            </div>
        </section>
    )

    return (
        <React.Fragment>    
        { loading ? <Splash/>: landingScreen}
        </React.Fragment>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})

export default connect(mapStateToProps)(Landing)