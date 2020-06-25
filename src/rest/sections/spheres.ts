
import { TokenStore } from "./cloudApiBase";
import { stones } from "./stones";
import { locations } from "./locations";
import { REST } from "../cloudAPI";

export const spheres : spheres = {



  updateSphere: function(cloudSphereId, data, background = true) {
    return REST._setupRequest(
      'PUT',
      '/Spheres/' + cloudSphereId,
      {background: background, data: data},
      'body'
    );
  },

  inviteUser: function(email, permission = "") {
    permission = permission.toLowerCase();
    switch (permission) {
      case 'admin':
        return REST._setupRequest('PUT', '/Spheres/{id}/admins', { data: { email: email }});
      case 'member':
        return REST._setupRequest('PUT', '/Spheres/{id}/members', { data: { email: email }});
      case 'guest':
        return REST._setupRequest('PUT', '/Spheres/{id}/guests', { data: { email: email }});
      default:
        return new Promise((resolve, reject) => {
          reject(new Error('Invalid Permission: "' + permission + '"'))
        });
    }
  },

  getPendingSphereInvites: function(background = true) {
    return REST._setupRequest('GET', '/Spheres/{id}/pendingInvites', {background:background});
  },

  resendInvite: function(email, background = false) {
    return REST._setupRequest('GET', '/Spheres/{id}/resendInvite', {data:{email: email}, background: background});
  },

  revokeInvite: function(email, background = false) {
    return REST._setupRequest('GET', '/Spheres/{id}/removeInvite', {data:{email: email}, background: background});
  },



  /**
   *
   * @returns {*}
   */
  getSpheres: function (background = true) {
    return REST._setupRequest('GET', '/users/{id}/spheres', { data: {filter: {include:"floatingLocationPosition"}}, background: background });
  },

  getUsers: function (background = true) {
    return REST._setupRequest('GET', '/Spheres/{id}/users', { background : background } );
  },

  getAdmins: function (background = true) {
    return REST._setupRequest('GET', '/Spheres/{id}/admins', { background : background });
  },

  getMembers: function (background = true) {
    return REST._setupRequest('GET', '/Spheres/{id}/members', { background : background });
  },

  getGuests: function (background = true) {
    return REST._setupRequest('GET', '/Spheres/{id}/guests', { background : background });
  },

  getToons: function (background = true) {
    return REST._setupRequest('GET', '/Spheres/{id}/Toons', { background : background });
  },

  getPresentPeople: function (ignoreDeviceId, background = true) {
    return REST._setupRequest('GET', '/Spheres/{id}/PresentPeople', {
      data: { ignoreDeviceId: ignoreDeviceId },
      background : background
    }, 'query');
  },


  /**
   * @param data
   * @param background
   */
  createSphere: function(data, background = true) {
    return REST._setupRequest('POST', 'users/{id}/spheres', { data: data, background: background }, 'body');
  },

  changeSphereName: function(sphereName) {
    return REST._setupRequest('PUT', '/Spheres/{id}', { data: { name: sphereName }}, 'body');
  },

  changeUserAccess: function(email, accessLevel, background = false) {
    return REST._setupRequest('PUT', '/Spheres/{id}/role', {data: {email: email, role:accessLevel}, background:background}, 'query');
  },

  updateFloatingLocationPosition: function (data, background = true) {
    return REST._setupRequest(
      'POST',
      '/Spheres/{id}/floatingLocationPosition/',
      {background: background, data: data},
      'body'
    );
  },

  deleteUserFromSphere: function(userId) {
    // userId is the same in the cloud as it is locally
    return REST._setupRequest('DELETE', '/Spheres/{id}/users/rel/' + userId);
  },

  deleteSphere: function() {
    let sphereId = TokenStore.sphereId;

    let promises      = [];
    let stoneData     = [];
    let locationData  = [];

    promises.push(
      stones.getStonesInSphere()
        .then((stones : any) => {
          stoneData = stones;
        }).catch((err) => {})
    );


    // for every sphere, we get the locations
    promises.push(
      locations.getLocations()
        .then((locations : any) => {
          locationData = locations;
        }).catch((err) => {})
    );

    return Promise.all(promises)
      .then(() => {
        let deletePromises = [];

        stoneData.forEach((stone) => {
          deletePromises.push(REST.forSphere(sphereId).deleteStone(stone.id));
        });

        locationData.forEach((location) => {
          deletePromises.push(REST.forSphere(sphereId).deleteLocation(location.id));
        });

        return Promise.all(deletePromises);
      })
      .then(() => {
        return this._deleteSphere(sphereId);
      })
  },

  _deleteSphere: function(cloudSphereId) {
    if (cloudSphereId) {
      return REST._setupRequest(
        'DELETE',
        'Spheres/' + cloudSphereId
      );
    }
  },

  leaveSphere: function(cloudSphereId) {
    if (cloudSphereId) {
      return REST._setupRequest(
        'DELETE',
        'users/{id}/spheres/rel/' + cloudSphereId
      );
    }
  },

  acceptInvitation: function() {
    return REST._setupRequest(
      'POST',
      '/Spheres/{id}/inviteAccept/',
      {background: false},
      'body'
      );
  },

  declineInvitation: function() {
    return REST._setupRequest(
      'POST',
      '/Spheres/{id}/inviteDecline/',
      {background: false},
      'body'
      );
  },


  getSphereAuthorizationTokens: function(sphereId? : string) {
    if (sphereId) { TokenStore.sphereId = sphereId; }
    return REST._setupRequest(
      'GET',
      'Spheres/{id}/tokenData'
    );
  }

};
