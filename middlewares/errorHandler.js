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
  }
  res.status(status).json({message})
}