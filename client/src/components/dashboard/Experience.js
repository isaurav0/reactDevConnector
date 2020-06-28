import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';

const Experience = ({ experiences }) => {    

    return (        
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>                    
                    <th className="hide-sm">Years</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    { 
                        experiences.map(experience => {
                            let from = Moment(experience.from).format('DD MMMM YYYY')
                            let to = Moment(experience.to).format('DD MMMM YYYY')
                            return (
                                <tr>
                                    <td>{experience.company}</td>
                                    <td>{experience.title}</td>                                    
                                    <td className="hide-sm">
                                        {from} - { experience.current ? 'current' : to }
                                    </td>
                                    <td>
                                        <button className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }               
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = ({
    experiences: PropTypes.array.isRequired,
})

const mapStateToProps = state => ({
    experiences: state.profile.profile.experience 
})

export default connect(mapStateToProps)(Experience)
