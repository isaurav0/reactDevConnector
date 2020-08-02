import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';

const ProfileEducation = ({profile: { education }}) => {
    return (
        <Fragment>
            <h2 class="text-primary">Education</h2>

            {education.map(edu => {
                let from = Moment(edu.from).format('DD MMMM YYYY')
                let to = Moment(edu.to).format('DD MMMM YYYY')
                return (
                    <div>
                        <h3 class="text-dark">{edu.company}</h3>
                        <p>{from} - { edu.current ? 'Current' : to }</p>
                        <p><strong>Position: </strong>{edu.title}</p>
                        <p>
                        <strong>Description: </strong>{edu.description}
                        </p>
                    </div>
                )
            })}
        </Fragment>
    )
}

ProfileEducation.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileEducation
