import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({profile}) => {
    return (
        <Fragment>
            <h2 class="text-primary">{profile.user.name.split(' ')[0]}'s Bio</h2>
          <p>
            {profile.bio}
          </p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            { profile.skills.map(skill => {
                return <div class="p-1"><i class="fa fa-check"></i> {skill}</div>
            }) }
          </div>
        </Fragment>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout