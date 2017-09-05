const Joi = require('joi')

exports.validator = (schema) => (data, requiredKeys) => {
  requiredKeys = requiredKeys || []
  let newSchema = schema
  if (Array.isArray(requiredKeys) && requiredKeys.length > 0) {
    newSchema = schema.requiredKeys.apply(schema, requiredKeys)
  }
  const { value, err } = Joi.validate(data, newSchema, {abortEarly: false})
  if (!err) {
    return value
  }
  throw err
}
