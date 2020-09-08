# crownstone-lib-nodejs-cloud
Cloud module for the nodejs lib.

# WORK IN PROGRESS
Do not use in current state. The bluenet-nodejs-lib is in the process of being separated into individual modules:
- crownstone-lib-nodejs-core
- crownstone-lib-nodejs-uart
- crownstone-lib-nodejs-ble
- crownstone-lib-nodejs-cloud
- crownstone-lib-nodejs-sse

Will be usable on release 1.0.

This library is made up from 2 parts, one for the Crownstone Cloud and one for the Webhook API. 
You probably don't need the webhook api, but the documentation can be found here [TODO: Write documentation.]
The rest of this document is only regarding the Crownstone Cloud API.

# Installation

If you want to use this library as part of your own codebase, install it using yarn or npm

```
yarn add crownstone-cloud
```
```
npm install crownstone-cloud
```

# Cloning the repository

If you just want to run the library, without getting it from npm, you will have to build manually install the dependencies and build the typescript files to run the examples.
You can do this by running:

```
npm install && npm run build
```

# Getting started


You can use this library as promises or async/await. We will only show async/await here, but all *async* functions are promises. 
This means, everything that can be awaited, can be thenned. More information available on Google.

### Create instance

Let's make an instance of the Crownstone cloud! We will use this instance in the rest of the documentation.
This instance will cache all the data you have requested from the cloud, as well as your user tokens.

```
import {CrownstoneCloud} from 'crownstone-cloud';

const cloud = new CrownstoneCloud();
```
If you're using pure node, you can also use require:
```
const csLib = require("crownstone-cloud")

const cloud = new csLib.CrownstoneCloud();
```



### Logging in / authenticating

Before using the cloud library, you should first tell it who you are. You can do this in two ways. You can either log in, using the login method:
```
await cloud.login(crownstoneEmailAddress, crownstonePassword)
```

### Chained filtering

This library is built upon chained filtering. What do we mean by this? Let's explain by examples. 

Each of these methods will get a Crownstones interface which we will explain later on.

First without filters:
```
// get reference to all crownstones we have access to:
let allCrownstones = cloud.crownstones();
```

We can filter on a Crownstone, Location or Sphere. Here we show the Crownstone method:
```
// we can also get the data of a specific Crownstone using a filter.
// this filter can be the name, short-uid or id of the Crownstone. If you're building integrations, always use the id to avoid duplication.
let filter = 'kitchenLight';
let oneCrownstone = cloud.crownstones(filter);
```

You can use them together as well, here we get all crownstones in a specific sphere (since you might have more than 1 sphere)
This again uses a filter. You can use name, short-uid or id. For integrations, always use id.

```
let sphereFilter = 'office';
let crownstonesInOffice = cloud.spheres(sphereFilter).crownstones();
```


You can get all crownstones in a certain room, again the filter can be name, short-uid or id.
```
let roomFilter = 'kitchen';
let csDataInRoom = cloud.locations(roomFilter).crownstones();
```

Since you might have a kitchen in sphere1 and a kitchen in sphere2, you can also first filter on the Sphere, and then filter on the location.
```
let csDataInSphere1Kitchen = cloud.spheres('sphere1').locations('kitchen').crownstones();
```

# API

### CrownstoneCloud

#### *async* login(email: string, password: string) : Promise\<UserLoginData>
>> email: the email address of your Crownstone account.
>>
>> password: the corresponding password.
>>
>> returns UserLoginData: { accessToken: string, ttl: number, userId: string }
>
> You use this method to login to the Crownstone Cloud. Your userId and accesstoken will be cached in the CrownstoneCloud class instance.


#### *async* loginHashed(email: string, hashedPassword: string) : Promise\<UserLoginData> 
>> email: the email address of your Crownstone account.
>>
>> hashedPassword: sha1 hash of the corresponding password.
>>
>> returns UserLoginData: { accessToken: string, ttl: number, userId: string }
>
> You use this method to login to the Crownstone Cloud. Your userId and accesstoken will be cached in the CrownstoneCloud class instance.


#### hashPassword(plaintextPassword: string) : string
>> plaintextPassword: a password.
>>
>> returns hashedPassword: sha1 hash of the corresponding password.
>
> This will hash the password for you so you can use the loginHashed method with it.

#### *async* hubLogin(hubId: string, hubToken: string) : Promise\<HubLoginData> 
>> hubId: cloudId of the hub
>>
>> hubToken: secret token of the hub
>>
>> returns HubLoginData: { accessToken: string, ttl: number }
>
> You use this method to login to the Crownstone Cloud if you're a hub. Your accesstoken will be cached in the CrownstoneCloud class instance.

#### setAccessToken(accessToken: string, userId?: string)
>> accessToken: access token from the Crownstone cloud, or an oauth token from a Crownstone user.
>>
>> userId: optionally provide the userId if you know it beforehand.
>>
>
> This will authenticate you for the subsequent calls to the cloud. Does not do any request to the cloud itself.

#### spheres(filter : filter = null) : Spheres 
>> filter: You can optionally provide a filter to get a subset of all your spheres. This filter can be it's name, short-uid or cloud id. 
>> All integrations must only use cloud id as filters, since the other properties are either user-changable or not unique.
>>
>> returns Spheres: This is the startingpoint from which you can continue filtering, or get data related to spheres.
>
> You use this method to filter subsequent locations and/or Crownstones, or if you want to get data related to the sphere(s). This does not request anything from the cloud by itself.

#### locations(filter: filter = null) : Locations 
>> filter: You can optionally provide a filter to get a subset of all your locations (ie. rooms). This filter can be it's name, short-uid or cloud id. 
>> All integrations must only use cloud id as filters, since the other properties are either user-changable or not unique.
>>
>> returns Locations: This is the startingpoint from which you can continue filtering, or get data related to locations.
>
> You use this method to filter subsequent Crownstones, or if you want to get data related to the locations(s). This does not request anything from the cloud by itself.

#### crownstones(filter: filter = null) : Crownstones 
>> filter: You can optionally provide a filter to get a subset of all your Crownstones. This filter can be it's name, short-uid or cloud id. 
>> All integrations must only use cloud id as filters, since the other properties are either user-changable or not unique.
>>
>> returns Crownstones: This object allows you to get data related to Crownstones as well as switch them via the cloud.
>
> You use this method as a startingpoint to get data related to the Crownstone(s) or if you want to switch them. This does not request anything from the cloud by itself.


#### crownstoneById(id: string) : Crownstones 
>> id: A valid cloud Id of the Crownstone.
>>
>> returns Crownstones: This object allows you to get data related to Crownstones as well as switch them via the cloud.
>
> If you use the Crownstones with a filter, we must do an extra request to the cloud to find the corresponding Crownstone, even if you provide an id there. If you know the id beforehand
> you can directly switch a Crownstone without this additional request, speeding up your implementation.


#### *async* keys() : Promise\<cloud_Keys[]> 
>> returns cloud_Keys[]: JSON containing keys for all spheres. [Type definition found here.](https://github.com/crownstone/crownstone-lib-nodejs-cloud/blob/master/src/declarations/cloudTypes.d.ts#L113) 
>
> These keys can be used for any bluetooth related operations

#### me() : User
>> returns User: This object allows you to get data related to your user.
>
> Use this to get the user object, from which you can get you userId, userData and location.


### Spheres
This class is not meant to be created directly, you get this from the CrownstoneCloud. If you have received this class using a filter,
 this class represents all spheres that have been filtered, and all subsequent items called on this object will also belong to these spheres.

#### *async* data() : Promise<cloud_Sphere[]>
>> returns cloud_Sphere[]: JSON containing the data for all spheres that match the filter. [Type definition found here.](https://github.com/crownstone/crownstone-lib-nodejs-cloud/blob/master/src/declarations/cloudTypes.d.ts) 
>
> This method will get the sphere data from the cloud. If it has been obtained once, it will be cached and returned directly the next time this method is called.

#### *async* refresh() : Promise<self>
>> returns Spheres. This is the same class as this method was called upon so you can chain after it. 
>
> This method will refresh the cache of data for this sphere collection. This does not include all items downstream, like locations and Crownstones. Just the Sphere Data.

#### *async* keys() : Promise\<cloud_Keys[]> 
>> returns cloud_Keys[]: JSON containing keys for all spheres that match the filter. [Type definition found here.](https://github.com/crownstone/crownstone-lib-nodejs-cloud/blob/master/src/declarations/cloudTypes.d.ts#L113) 
>
> These keys can be used for any bluetooth related operations


#### locations(filter: filter = null) : Locations 
>> filter: You can optionally provide a filter to get a subset of all your locations (ie. rooms). This filter can be it's name, short-uid or cloud id. 
>> All integrations must only use cloud id as filters, since the other properties are either user-changable or not unique.
>>
>> returns Locations: This is the startingpoint from which you can continue filtering, or get data related to locations in the .
>
> You use this method to filter subsequent Crownstones, or if you want to get data related to the locations(s). This does not request anything from the cloud by itself.

#### crownstones(filter: filter = null) : Crownstones 
>> filter: You can optionally provide a filter to get a subset of all your Crownstones. This filter can be it's name, short-uid or cloud id. 
>> All integrations must only use cloud id as filters, since the other properties are either user-changable or not unique.
>>
>> returns Crownstones: This object allows you to get data related to Crownstones as well as switch them via the cloud.
>
> You use this method as a startingpoint to get data related to the Crownstone(s) or if you want to switch them. This does not request anything from the cloud by itself.


### Locations
This class is not meant to be created directly, you get this from the CrownstoneCloud or via the Spheres. If you have received this class using a filter,
 this class represents all locations that have been filtered, and all subsequent items called on this object will also belong to these locations.
 
 #### *async* data() : Promise<cloud_Location[]>
 >> returns cloud_Location[]: JSON containing the data for all locations that match the filter. [Type definition found here.](https://github.com/crownstone/crownstone-lib-nodejs-cloud/blob/master/src/declarations/cloudTypes.d.ts) 
 >
 > This method will get the location data from the cloud. If it has been obtained once, it will be cached and returned directly the next time this method is called.
 
 #### *async* refresh() : Promise<self>
 >> returns Locations. This is the same class as this method was called upon so you can chain after it. 
 >
 > This method will refresh the cache of data for this location collection. This does not include all items downstream like the Crownstones. Just the Location Data.
 
 #### crownstones(filter: filter = null) : Crownstones 
 >> filter: You can optionally provide a filter to get a subset of all your Crownstones. This filter can be it's name, short-uid or cloud id. 
 >> All integrations must only use cloud id as filters, since the other properties are either user-changable or not unique.
 >>
 >> returns Crownstones: This object allows you to get data related to Crownstones as well as switch them via the cloud.
 >
 > You use this method as a startingpoint to get data related to the Crownstone(s) or if you want to switch them. This does not request anything from the cloud by itself.
 

### Crownstones
This class is not meant to be created directly, you get this from the CrownstoneCloud or via the Spheres. If you have received this class using a filter,
 this class represents all locations that have been filtered, and all subsequent items called on this object will also belong to these locations.
 
 #### *async* data() : Promise<cloud_Stone[]>
 >> returns cloud_Stone[]: JSON containing the data for all locations that match the filter. [Type definition found here.](https://github.com/crownstone/crownstone-lib-nodejs-cloud/blob/master/src/declarations/cloudTypes.d.ts) 
 >
 > This method will get the Crownstone data from the cloud. If it has been obtained once, it will be cached and returned directly the next time this method is called.
 
 #### *async* refresh() : Promise<self>
 >> returns Crownstones. This is the same class as this method was called upon so you can chain after it. 
 >
 > This method will refresh the cache of data for this Crownstone collection.

#### *async* currentSwitchState() : Promise<number> 
>> returns the current switchstate between 0 and 100.
>
>This assumes that there is only one Crownstone selected by the filter or that it came from crownstoneById. If not, an error will be thrown.

#### *async* currentSwitchStateData() : Promise<{[stoneId: string]: cloud_SwitchState}> 
>> returns the current switchstate for all Crownstones matching the filter conditions.  cloud_Switchstate: { timestamp: string, switchState: number } where switchState is between 0 and 100.
>
>You can use this to get the current switchstate for a collection of Crownstones.

#### *async* setSwitch(percentage: number)
>> value: number between 0 and 100.
>
>This will switch the Crownstone(s) to the provided state. It will affect all Crownstones in the selection. Currently only 1 Crownstone supported.
 
#### *async* turnOn() 
>This will turn the Crownstones matching the filter conditions on. On respects any behaviour or twilight intensity preference, unlike setSwitch(100), which turns the Crownstone fully on.

#### *async* turnOff() 
>This will turn the Crownstones matching the filter conditions off.

#### *async* setMultiSwitch(switchData: SwitchData[])
 >> switchData: Array of SwitchData. Filtering before does not affect this method since everything is specified. [Type definition found here.](https://github.com/crownstone/crownstone-lib-nodejs-cloud/blob/master/src/declarations/declarations.d.ts)
 >
 > Use this method if you want to switch multiple Crownstones at the same time. 
 > NOT IMPLEMENTED YET