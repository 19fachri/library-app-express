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
    case "LoginIsRequired":
      status = 401
      message = "Login is required"
      break;
    case "ForbidenAccess":
      status = 403
      message = "Forbiden access"
      break;
    case "DataNotFound":
      status = 404
      message = "Data not found"
      break;
  }
  // console.log(err);
  res.status(status).json({message})
}