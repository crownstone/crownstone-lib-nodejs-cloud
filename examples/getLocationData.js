let cloudLib = require("../dist/")
let cloud = new cloudLib.CrownstoneCloud();

/**

 You can get your Crownstone data in a number of different ways. This library is built on a chained filtering approach.
 We will show this in the example.

 More information on logging in is found in the logging in example. This will focus on getting the Crownstone data.

 **/
async function run() {
  await cloud.login('crownstoneEmail', 'crownstonePassword')

  // we can get all crownstones that we have access to:
  let alllocationData = await cloud.locations().data();

  // you can also get all crownstones in a certain room, again the filter can be name, short-uid or id.
  let roomFilter = 'kitchen';
  let locationDataInRoom = await cloud.locations(roomFilter).data();

  // since you might have a kitchen in sphere1 and a kitchen in sphere2, you can also first select the sphere
  let locationDataInSphere1Kitchen = await cloud.spheres('sphere1').locations(roomFilter).data();

  // whenever possible, we cache your previous results in the cloud instance so you can access them quickly.
  // If you want to get new data, use the refresh method;
  let location = cloud.spheres('sphere1').locations(roomFilter);
  let newData = await location.refresh().data()
}
run().catch((e) => { console.log("There was a problem running this example:", e); });

