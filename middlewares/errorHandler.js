module.exports = (err, req, res, next) => {
  const { name } = err
  let status = 500
  let message = "Internal Server Error"
  switch (name) {
    case "SequelizeValidationError":
      status = 400
      message = err.errors[0].message
      break;
    case "SequelizeUniqueConstraintError":
      status = 400
      message = err.errors[0].message
      break;
    case "IncorectEmailOrPassword":
      status = 401
      message = "Incorect email or password"
      break;
  }
  res.status(status).json({message})
}