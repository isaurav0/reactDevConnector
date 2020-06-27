import React, { useState, Fragment,useEffect } from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter, Link, Route, BrowserRouter as Router} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProfile, getCurrentProfile } from '../../actions/profile';
import Alert from '../layout/Alert';


const EditProfile = ({updateProfile, getCurrentProfile, history, profile: { loading, profile } }) => {

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            company: loading || !profile.company ? '': profile.company,
            location: loading || !profile.location ? '': profile.location,
            website: loading || !profile.website ? '': profile.website,
            bio: loading || !profile.bio ? '': profile.bio,
            status: loading || !profile.status ? '': profile.status,
            githubusername: loading || !profile.githubusername ? '': profile.githubusername,
            skills: loading || !profile.skills ? '': profile.skills.join(',') ,
            youtube: loading || !profile.youtube ? '': profile.youtube,
            facebook: loading || !profile.facebook ? '': profile.facebook,
            twitter: loading || !profile.twitter ? '': profile.twitter,
            instagram: loading || !profile.instagram ? '': profile.instagram,
            linkedin: loading || !profile.linkedin ? '': profile.linkedin
        })

        return 
    }, [loading]);

    const [ formData, setFormData ] = useState({
        company: '',
        location: '',
        website: '',
        bio: '',
        status: '',
        githubusername: '',
        skills: '',
        youtube: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: ''
    })

    const [displaySocialInputs, toggleSocialInputs ] = useState(false)

    const {
        company,
        location,
        website,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = formData

    const submitForm = (e) => {
        console.log(formData)
        e.preventDefault()
        updateProfile(formData, history, true)
        window.scrollTo(0,0)
    }

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    // if(props.profile!==null)
    //     return <Redirect To="/dashboard"></Redirect>

    return (
        <Fragment>
            <h1 className="large text-primary">
                Edit Your Profile
            </h1>
            <p className="lead">
                <i className="fa fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={ e => submitForm(e) }>
                <div className="form-group">
                    <select name="status" onChange={ e => onChange(e)} value={status}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                </div>
                <div className="form-group">
                    <input onChange={e=> onChange(e) } value={company} type="text" placeholder="Company" name="company" />
                    <small className="form-text"
                        >Could be your own company or one you work for
                    </small>
                </div>
                <div className="form-group">
                <input onChange={e=> onChange(e) } value={website} type="text" placeholder="Website" name="website" />
                    <small className="form-text">
                        Could be your own or a company website
                    </small>
                </div>
                <div className="form-group">
                    <input onChange={e=> onChange(e) } value={location} type="text" placeholder="Location" name="location" />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>
                <div className="form-group">
                    <input onChange={e=> onChange(e) } value={skills} type="text" placeholder="* Skills" name="skills" />
                    <small className="form-text">
                        Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input onChange={e=> onChange(e) }
                        value={githubusername} type="text"
                        placeholder="Github Username"
                        name="githubusername"
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include your
                        username
                    </small>
                </div>
                <div className="form-group">
                    <textarea onChange={e=>onChange(e)} value={bio} placeholder="A short bio of yourself" name="bio"></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" onClick={() => toggleSocialInputs(!displaySocialInputs) } className="btn btn-light">
                        Add Social Network Links
                    </button>
                    
                    <span>Optional</span>
                </div>
                
                { displaySocialInputs ===true  && <Fragment>
                    
                    <div className="form-group social-input">
                        <i className="fa fa-twitter fa-2x"></i>
                        <input type="text" onChange={e => onChange(e) }  value={twitter} placeholder="Twitter URL" name="twitter" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fa fa-facebook fa-2x"></i>
                        <input type="text" onChange={e => onChange(e) }  value={facebook} placeholder="Facebook URL" name="facebook" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fa fa-youtube fa-2x"></i>
                        <input type="text" onChange={e => onChange(e) }  value={youtube} placeholder="YouTube URL" name="youtube" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fa fa-linkedin fa-2x"></i>
                        <input type="text" onChange={e => onChange(e) }  value={linkedin} placeholder="Linkedin URL" name="linkedin" />
                    </div>

                    <div className="form-group social-input">
                        <i className="fa fa-instagram fa-2x"></i>
                        <input type="text" onChange={e => onChange(e) }  value={instagram} placeholder="Instagram URL" name="instagram" />
                    </div>
                </Fragment>}

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>

            </form>
        </Fragment>
    )
}

EditProfile.propTypes = ({
    updateProfile: PropTypes.func.isRequired,  
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
})

const mapStateToProps = state => ({
    profile: state.profile
})


export default connect(mapStateToProps, 
                { updateProfile, getCurrentProfile })
                (withRouter(EditProfile))