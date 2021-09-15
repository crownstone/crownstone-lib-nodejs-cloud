type UnauthorizedError = {
  statusCode: 401,
  error: {
    statusCode: 401,
    name: 'Error',
    message: 'login failed',
    code: 'LOGIN_FAILED'
  }
}
