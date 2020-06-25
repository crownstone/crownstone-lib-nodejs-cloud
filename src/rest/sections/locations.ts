import { cloudApiBase } from "./cloudApiBase";

export const locations : locations = {
  getLocations: function (background = true) {
    return cloudApiBase._setupRequest('GET', '/Spheres/{id}/ownedLocations', {background: background, data:{filter:{"include":["sphereOverviewPosition","presentPeople"]}}});
  },

  createLocation: function (data, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Spheres/{id}/ownedLocations',
      {data: data, background: background},
      'body'
    );
  },

  updateLocation: function (cloudLocationId, data, background = true) {
    return cloudApiBase._setupRequest(
      'PUT',
      '/Spheres/{id}/ownedLocations/' + cloudLocationId,
      {background: background, data: data},
      'body'
    );
  },

  updateLocationPosition: function (data, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Locations/{id}/sphereOverviewPosition/',
      {background: background, data: data},
      'body'
    );
  },

  deleteLocation: function(cloudLocationId) {
    return cloudApiBase._setupRequest(
      'DELETE',
      '/Spheres/{id}/ownedLocations/' + cloudLocationId
    );
  },


  deleteLocationPicture: function() {
    return cloudApiBase._setupRequest(
      'DELETE',
      '/Locations/{id}/image/'
    );
  },
};