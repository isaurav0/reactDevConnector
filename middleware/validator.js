const { body, validationResult } = require('express-validator')
const registerValidation = () => {
  return [
    // username must be an email
    body('email', "Invalid Email").isEmail(),
    // password must be at least 5 chars long
    body('password', "Password should more than 5 characters").isLength({ min: 5 }),
    body('name', "Name is required").not().isEmpty(),
  ]
}

const authValidation = () => {
  return [
    body('email', "Invalid Email").isEmail(),
    body('password', "Password can't be empty").not().isEmpty(),
  ]
}

const profileValidation = () => {
  return [
    body('status', "Status is required.").not().isEmpty(),
    body('skills', "At least one skill is required.").not().isEmpty(),
  ]
}

const experienceValidation = () => {
  return [
    body('title', "Title is required.").not().isEmpty(),
    body('company', "Company is required.").not().isEmpty(),
    body('from', "From is required.").not().isEmpty(),
    body('current', "Current is required.").not().isEmpty(),
  ]
}


const educationValidation = () => {
  return [
    body('degree', "Degree is required.").not().isEmpty(),
    body('school', "School is required.").not().isEmpty(),
    body('fieldofstudy', "Field of study is required.").not().isEmpty(),
    body('from', "From is required.").not().isEmpty(),
    body('current', "Current is required.").not().isEmpty(),
  ]
}


const postValidation = () => {
  return [
    body('name', "name is required.").not().isEmpty(),
    body('text', "text is required.").not().isEmpty(),      
  ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
      errors: extractedErrors,
    })
}

module.exports = {
  validate,
  registerValidation,
  authValidation,
  profileValidation,
  experienceValidation,
  educationValidation,
  postValidation
}