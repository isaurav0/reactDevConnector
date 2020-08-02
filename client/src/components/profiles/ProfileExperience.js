import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment';

const ProfileExperience = ({profile: { experience }}) => {
    return (
        <Fragment>
            <h2 class="text-primary">Experience</h2>

            {experience.map(exp => {
                let from = Moment(exp.from).format('DD MMMM YYYY')
                let to = Moment(exp.to).format('DD MMMM YYYY')
                return (
                    <div>
                        <h3 class="text-dark">{exp.company}</h3>
                        <p>{from} - { exp.current ? 'Current' : to }</p>
                        <p><strong>Position: </strong>{exp.title}</p>
                        <p>
                        <strong>Description: </strong>{exp.description}
                        </p>
                    </div>
                )
            })}
        </Fragment>
    )
}

ProfileExperience.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileExperience
