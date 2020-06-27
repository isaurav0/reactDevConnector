import React, { useState, Fragment } from 'react';
import { Link, withRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profile';
import Alert from '../layout/Alert';

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        "title": "",
	    "company": "",
	    "location": "",
	    "from": "",
	    "to": "",
	    "current": false,
	    "description": ""
    })

    const {
        title,
	    company,
	    location,
	    from,
	    to,
	    current,
	    description
    } = formData

    const onSubmit = e => {
        e.preventDefault()        
        addExperience(formData, history)
        window.scrollTo(0,0)
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }

    const onCheck = e => {
        setFormData({...formData, current: !current})
    }

    return (
        <Fragment>
        
        <h1 className="large text-primary">
            Add An Experience
        </h1>
        <p className="lead">
            <i className="fa fa-black-tie"></i>&nbsp; Add any developer/programming
            positions that you have had in the past.
        </p>
        <small style={{ color: 'red'}}>* = required field</small>
        <form className="form" onSubmit={ e => onSubmit(e) }>
            <div className="form-group">
                <input type="text" placeholder="* Job Title" name="title"  onChange={e => onChange(e)}/>
            </div>
            <div className="form-group">
                <input type="text" placeholder="* Company" name="company"  onChange={e => onChange(e)}/>
            </div>
            <div className="form-group">
                <input type="text" placeholder="Location" name="location" onChange={e => onChange(e)}/>
            </div>
            <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" onChange={e => onChange(e)}/>
            </div>
            <div className="form-group">
                <p><input type="checkbox" name="current" value="" onClick={e=> onCheck(e)}/> Current Job</p>
            </div>
            <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" onChange={e => onChange(e)}/>
            </div>
            <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description" onChange={e => onChange(e)}/>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
      </Fragment>
    )
}

AddExperience.propTypes = ({
    addExperience: PropTypes.func.isRequired,
})

export default connect(null, { addExperience })(withRouter(AddExperience))
