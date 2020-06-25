import { cloudApiBase } from "./cloudApiBase";

export const user : user = {
  /**
   *
   * @param options
   * @returns {Promise}
   */
  registerUser: function(options) {
    return cloudApiBase._setupRequest('POST', 'users', {data:{
      email: options.email,
      password: options.password,
      firstName: options.firstName,
      lastName: options.lastName
    }}, 'body');
  },

  /**
   *
   * @param options
   * {
   *   email: string,
   *   password: string,
   *   onUnverified: callback,
   *   onInvalidCredentials: callback,
   *   background: boolean
   * }
   *
   * resolves with the parsed data, rejects with {status: httpStatus, data: data}
   */
  login: function(options) {
    return cloudApiBase._setupRequest('POST', 'users/login', {
      data: {
        email: options.email,
        password: options.password,
        ttl: 7*24*3600
      },
      noAccessToken: true
    }, 'body');

  },


  /**
   *
   * @param file {String} --> full path string.
   */
  setEarlyAccess: function(level) {
    return cloudApiBase._setupRequest('PUT', '/users/{id}', {data: { earlyAccessLevel: level }, background: false}, 'body');
  },

  removeProfileImage: function(options : any = {}) {
    return cloudApiBase._setupRequest(
      'DELETE',
      'users/{id}/profilePic',
      { background: options.background }
    );
  },

  /**
   *
   * @returns {*}
   */
  getUserData: function (background = true) {
    return cloudApiBase._setupRequest('GET', '/users/{id}', {background});
  },

  /**
   *
   * @returns {*}
   */
  getPendingInvites: function (background = true) {
    return cloudApiBase._setupRequest('GET', '/users/{id}/pendingInvites', {background});
  },

  /**
   *
   * @param data
   * @param background
   * @returns {Promise}
   */
  updateUserData: function(data, background = true) {
    return cloudApiBase._setupRequest('PUT', '/users/{id}', {data: data, background: background}, 'body');
  },

  /**
   *
   * @param options
   */
  requestVerificationEmail: function(options : any = {}) {
    return cloudApiBase._setupRequest(
      'POST',
      'users/resendVerification',
      { data: { email: options.email }, background: options.background },
      'query'
    );
  },

  /**
   *
   * @param options
   */
  requestPasswordResetEmail: function(options : any = {}) {
    return cloudApiBase._setupRequest(
      'POST',
      'users/reset',
      { data: { email: options.email }, background: options.background },
      'body'
    );
  },

  getKeys: function(cloudSphereId = undefined, cloudStoneId = undefined, background = true) {

    return cloudApiBase._setupRequest(
      'GET',
      'users/{id}/keysV2',
      {data: { sphereId: cloudSphereId, stoneId: cloudStoneId }, background : background},
      "query"
    );
  },


};