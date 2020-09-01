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
  let allCsData = await cloud.crownstones().data();

  // we can also get the data of a specific Crownstone using a filter.
  let filter = 'kitchenLight';
  let oneCsData = await cloud.crownstones(filter).data();

  // this filter can be the name, short-uid or id of the Crownstone. If you're building integrations, always use the id to avoid duplication.
  let idFilter = '5f3ea7fdd2e65b0004646ecf';
  let dataFromIdFilter = await cloud.crownstones(idFilter).data();

  // If the id is passed as a filter, there will be a query to the cloud to verify that you have passed an ID, not a name.
  // To avoid this additional cloud request, you can directly get a crownstones object providing the Id.
  // This should be used when you have stored the crownstone ID and just wish to switch a crownstone with it.
  let crownstoneReference = cloud.crownstoneById(idFilter);

  // you can also get all crownstones in a specific sphere (since you might have more than 1 sphere)
  // This again uses a filter. You can use name, short-uid or id. For integrations, always use id.
  let sphereFilter = 'office';
  let csDataInSphere = await cloud.spheres(sphereFilter).crownstones().data();

  // you can also get all crownstones in a certain room, again the filter can be name, short-uid or id.
  let roomFilter = 'kitchen';
  let csDataInRoom = await cloud.locations(roomFilter).crownstones().data();

  // since you might have a kitchen in sphere1 and a kitchen in sphere2, you can also first select the sphere
  let csDataInSphere1Kitchen = await cloud.spheres('sphere1').locations(roomFilter).crownstones().data();

  // whenever possible, we cache your previous results in the cloud instance so you can access them quickly.
  // If you want to get new data, use the refresh method;
  let crownstones = cloud.spheres('sphere1').locations(roomFilter).crownstones();
  let newData = await crownstones.refresh().data()

}
run().catch((e) => { console.log("There was a problem running this example:", e); });

