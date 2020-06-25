import { cloudApiBase } from "./cloudApiBase";

export const stonesBehaviours : stonesBehaviours = {

  createBehaviour: function(data, background = true) {
    return cloudApiBase._setupRequest(
      'POST',
      '/Stones/{id}/behaviours/',
      {data: data, background: background},
      'body'
    );
  },
  updateBehaviour: function(cloudBehaviourId, data, background = true) {
    return cloudApiBase._setupRequest(
      'PUT',
      '/Stones/{id}/behaviours/' + cloudBehaviourId,
      {data:data, background: background},
      'body'
    );
  },
  deleteBehaviour: function(cloudBehaviourId, background = true) {
    return cloudApiBase._setupRequest(
      'DELETE',
      '/Stones/{id}/behaviours/' + cloudBehaviourId,
      {background: background},
    );
  },
  deleteAllBehaviours: function(background = true) {
    return cloudApiBase._setupRequest(
      'DELETE',
      '/Stones/{id}/behaviours/',
      {background: background},
    );
  },
  getBehaviours: function(background = true) {
    return cloudApiBase._setupRequest(
      'GET',
      '/Stones/{id}/behaviours/',
      {background: background},
    );
  },


};