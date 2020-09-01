let cloudLib = require("../dist/")
let cloud = new cloudLib.CrownstoneCloud();

/**

 You can switch a Crownstone via the cloud using the Crownstones class. You can get this class in a number of different ways.

 More information on logging in is found in the logging in example. This will focus on getting the Crownstone data.

**/
async function run() {
  await cloud.login('crownstoneEmail', 'crownstonePassword')

  // you can get the Crownstones class using any of the filtering methods shown in the getCrownstoneData example.
  // here we get one crownstone called Ceiling light, which is in our kitchen.
  let ceilingLight = cloud.locations("kitchen").crownstones("Ceiling light");

  // alternatively, we might know the ID of this Crownstone. This means we do not first have to search the cloud for the one we want.
  let ceilingLightById = cloud.crownstoneById('5f3ea7fdd2e65b0004646ecf');

  // Both of these objects are the same, except the byId version will not require any calls to the cloud so this will be much faster!
  // Once you call setSwitch() or any of the other async switching methods, we will search the cloud for the crownstone you want to have. At that point, the byId version is much faster.

  // now let's set the ceiling light to 50%
  await ceilingLightById.setSwitch(0.5);

  // currently, we can only switch one crownstone at a time.
}
run().catch((e) => { console.log("There was a problem running this example:", e); });

