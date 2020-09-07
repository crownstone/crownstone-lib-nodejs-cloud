let cloudLib = require("../dist/")
let cloud = new cloudLib.CrownstoneCloud();

/**

 Here you can see how to get your sphere's data.

 More information on logging in is found in the logging in example. This will focus on getting the Sphere data.

**/
async function run() {
  await cloud.login('crownstoneEmail', 'crownstonePassword')

  // we can get all crownstones that we have access to:
  let allSpheres = await cloud.spheres().data();

  // you can also get all crownstones in a specific sphere (since you might have more than 1 sphere).
  // You can use name, short-uid or id. For integrations, always use id.
  let sphereFilter = 'office';
  let officeSphere = cloud.spheres(sphereFilter);
  let officeSphereData = await officeSphere.data();

  // whenever possible, we cache your previous results in the cloud instance so you can access them quickly.
  // If you want to get new data, use the refresh method;
  let newData = await officeSphere.refresh().data();
}
run().catch((e) => { console.log("There was a problem running this example:", e); });

