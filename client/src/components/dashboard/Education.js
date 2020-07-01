import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';

const Education = ({ Educations }) => {    

    return (        
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    { 
                        Educations.map(education => {
                            let from = Moment(education.from).format('DD MMMM YYYY')
                            let to = Moment(education.to).format('DD MMMM YYYY')
                            return (
                                <tr>
                                    <td>{education.school}</td>
                                    <td>{education.degree}</td>                                    
                                    <td className="hide-sm">
                                        {from} - { education.current ? 'current' : to }
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

Education.propTypes = ({
    Educations: PropTypes.array.isRequired,
})

const mapStateToProps = state => ({
    Educations: state.profile.profile.education 
})

export default connect(mapStateToProps)(Education)
