import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'moment';
import { deleteEducation, deleteAccount } from '../../actions/profile';

const Education = ({ Educations, deleteEducation, deleteAccount }) => {    

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
                                        <button className="btn btn-danger" onClick={()=>{ deleteEducation(education._id) } }>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="my-2">
                <button className="btn btn-danger" onClick={ () => deleteAccount}>
                    <i className="fas fa-user-minus"></i>
                    Delete My Account
                </button>
            </div>
        </Fragment>
    )
}

Education.propTypes = ({
    Educations: PropTypes.array.isRequired,
})

const mapStateToProps = state => ({
    Educations: state.profile.profile.education 
})

export default connect(mapStateToProps, { deleteEducation, deleteAccount })(Education)
