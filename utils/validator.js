const { body, validationResult } = require('express-validator')
const registerValidationRules = () => {
  return [
    // username must be an email
    body('email', "Invalid Email").isEmail(),
    // password must be at least 5 chars long
    body('password', "Password should more than 5 characters").isLength({ min: 5 }),
    body('name', "Name is required").not().isEmpty(),
  ]
}

const authValidationRules = () => {
  return [
    body('email', "Invalid Email").isEmail(),
    body('password', "Password can't be empty").not().isEmpty(),
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
  authValidationRules,
  validate,
  registerValidationRules
}