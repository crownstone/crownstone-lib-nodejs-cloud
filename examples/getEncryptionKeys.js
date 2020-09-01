let cloudLib = require("../dist/")
let cloud = new cloudLib.CrownstoneCloud();

/**

 You can get the all keys your user has access to or just the ones from a specific sphere.

**/

async function run() {
  await cloud.login('crownstoneEmail', 'crownstonePassword')

  let allKeys = await cloud.keys();

  // you can call keys on a sphere object too. Filtering can be done by name, or short-uid, but preferably should be done by id.
  let keysInOffice = await cloud.spheres('office').keys();

}
run().catch((e) => { console.log("There was a problem running this example:", e); });

