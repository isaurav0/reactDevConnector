import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import {getGithubRepo} from '../../actions/profile';
import {connect} from 'react-redux';

const ProfileGithub = ({ getGithubRepo, username, repos }) => {

    useEffect(()=>{
        getGithubRepo(username)
    }, [])

    return (
        <Fragment>
            <h2 class="text-primary my-1">
                <i class="fa fa-github"></i> Github Repos
            </h2>
            {repos.map(repo => {
                return(
                <div class="repo bg-white p-1 my-1">
                    <div>
                        <h4>
                            <a href={repo.clone_url} target="_blank" rel="noopener noreferrer">
                                {repo.full_name}
                            </a>
                        </h4>
                        <p>
                            {repo.description}
                        </p>
                    </div>
                    <div>
                        <ul>
                            <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                            <li class="badge badge-dark">Watchers: {repo.watchers}</li>
                            <li class="badge badge-light">Forks: {repo.forks}</li>
                        </ul>
                    </div>
                </div>
                )
            })}
        </Fragment>
    )
}

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    repos: state.profile.repos
})

export default connect(mapStateToProps, {getGithubRepo})(ProfileGithub)
