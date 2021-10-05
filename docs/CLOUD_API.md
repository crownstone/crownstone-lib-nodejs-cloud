# CrownstoneCloud


<details>
<summary><i>async</i> login(email: string, password: string) : Promise&lt;UserLoginData></summary>

> You use this method to login to the Crownstone Cloud. 
> Your userId and accesstoken will be cached in the CrownstoneCloud class instance.
> 
> - Parameters
>   - **email**(string): the email address of your Crownstone account.
>   - **password**(string): the corresponding password.
>
> 
> - Returns
>     - **Promise<UserLoginData: { accessToken: string, ttl: number, userId: string }>**
> 
> 
> - Raised errors
>    - [**UnauthorizedError**](../src/declarations/errors.d.ts) if the credentials are incorrect.
> 
> 
> - Example
>   ```js
>   await cloud.login('crownstone@gmail.com','h3ll0W0rld!');
>   ```
</details>


<details>
<summary><i>async</i> loginHashed(email: string, hashedPassword: string) : Promise&lt;UserLoginData></summary>

> You use this method to login to the Crownstone Cloud. If you have cached a SHA1 hash of the user's password, you can use this method
> to log in using that. The login method above will hash the plaintext password and use this method to login.
> 
> Your userId and accesstoken will be cached in the CrownstoneCloud class instance.
> 
> - Parameters
>   - **email**(string): the email address of your Crownstone account.
>   - **hashedPassword**(string): sha1 hash of the corresponding password.
>
> 
> - Returns
>     - **Promise<UserLoginData: { accessToken: string, ttl: number, userId: string }>**
> 
> 
> - Raised errors
>    - [**UnauthorizedError**](../src/declarations/errors.d.ts) if the credentials are incorrect.
> 
> 
> - Example
>   ```js
>   await cloud.loginHashed('crownstone@gmail.com','250e77f12a5ab6972a0895d290c4792f0a326ea8!');
>   ```
</details>


<details>
<summary>hashPassword(plaintextPassword: string) : string</summary>

> This will hash the password for you so you can use the loginHashed method with it.
> 
> - Parameters
>   - **plaintextPassword**(string): password to hash using sha1.
>
>
> - Returns
>    - **string**
>
> 
> - Example
>   ```js
>   let hashed = cloud.hashPassword('250e77f12a5ab6972a0895d290c4792f0a326ea8!');
>   ```
</details>


<details>
<summary><i>async</i> hubLogin(hubId: string, hubToken: string) : Promise&lt;HubLoginData></summary>

> You use this method to login to the Crownstone Cloud if you're a Crownstone hub. 
> Your accesstoken will be cached in the CrownstoneCloud class instance.
>
> - Parameters
>   - **hubId**(string): cloudId of the hub.
>   - **hubToken**(string): secret token of the hub.
>
>
> - Returns
>    - **Promise<HubLoginData: { accessToken: string, ttl: number }>**
>
>
> - Example
>   ```js
>   await cloud.hubLogin(
>     '612f7f0679aaa50004a04920',
>     '1a72d28efda421e2215d5e246cc32348fdf2f22d61364f8e9445ab0ceda4fc6fcc2674f9e25e15a531d7524d333bac486acfcccc904ab91b54536abc2346024b'
>   );
>   ```
</details>


<details>
<summary>setAccessToken(accessToken: string, userId?: string)</summary>

> This will authenticate you for the subsequent calls to the cloud. Does not do any request to the cloud itself.
>
> - Parameters
>   - **accessToken**(string): access token from the Crownstone cloud, or an oauth token from a Crownstone user.
>   - **userId**(string): optionally provide the userId if you know it beforehand.
>
>
> - Example
>   ```js
>   cloud.setAccessToken('ecababLpKYwQw3cBFq2xShGUTvHKk5SewVgZDvgZeFEsvNC7DMNHZhR49XQkUe3', '612f7f0679aaa50004a04920');
>   ```
</details>


<details>
<summary><i>async</i> spheres() : Promise&lt;cloud_Sphere[]></summary>

> You use this method to download the data of your different spheres. Use this to get the sphereId you need for the sphere method.
>
> - Returns
>   - **cloud_Sphere[]**: JSON containing the data for all spheres available to you. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
> 
> - Example
>   ```js
>   let spheres = await cloud.spheres();
>   ```
</details>


<details>
<summary><i>async</i> locations() : Promise&lt;cloud_Location[]></summary>

> You use this method to download the data of your different locations. Use this to get the location id you need to get a specific location.
>
> - Returns
>   - **cloud_Location[]**: JSON containing the data for all locations available to you. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
> 
> - Example
>   ```js
>   let locations = await cloud.locations();
>   ```
</details>
 

<details>
<summary><i>async</i> crownstones() : Promise&lt;cloud_Stone[]></summary>

> You use this method to download the data of your different locations. Use this to get the location id you need to get a specific location.
>
> - Returns
>   - **cloud_Stone[]**: JSON containing the data for all crownstones available to you. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
> 
> - Example
>   ```js
>   let crownstones = await cloud.crownstones();
>   ```
</details>
 

<details>
<summary><i>async</i> keys() : Promise&lt;cloud_Stone[]></summary>

> You use this method to download the data of your different locations. Use this to get the location id you need to get a specific location.
>
> - Returns
>   - **cloud_Keys[]**: JSON containing keys for all spheres. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
> 
> - Example
>   ```js
>   let keys = await cloud.keys();
>   ```
</details>



<details>
<summary>sphere(id: string) : Sphere</summary>

 >You use this method if you want to get data related to the sphere. This does not request anything from the cloud by itself.
>
> - Parameters
>   - **id**(string): A valid cloud Id of a Sphere.
> 
> 
> - Returns
>   - **Sphere**: This object is the starting point to get specific data from your sphere. This is documented below.
>
>
> - Example
> ```js
> let sphere = cloud.sphere('612f7f0679aaa50004a0492a');
> ```
</details>

<details>
<summary>location(id: string) : Location</summary>

> You use this method if you want to get data related to the location. This does not request anything from the cloud by itself.
>
> - Parameters
>   - **id**(string): A valid cloud Id of a Location.
> 
> 
> - Returns
>   - **Location**:  This object is the starting point to get specific data from your location.
>
>
> - Example
>   ```js
>   let location = cloud.location('612f7f0679aaa50004a0492a');
>   ```
</details>


<details>
<summary>crownstone(id: string) : Crownstone</summary>

> You use this method if you want to get data related to the Crownstone. This does not request anything from the cloud by itself.
>
> - Parameters
>   - **id**(string): A valid cloud Id of a Crownstone.
>
>
> - Returns
>   - **Crownstone**:  This object allows you to get data related to Crownstone as well as switch it via the cloud.
>
>
> - Example
>   ```js
>   let location = cloud.location('612f7f0679aaa50004a0492a');
>   ```
</details>



<details>
<summary>me() : User</summary>

> Use this to get the user object, from which you can get you userId, userData and location.
>
> - Parameters
>   - **id**(string): A valid cloud Id of a Crownstone.
>
>
> - Returns
>   - **User**: This object allows you to get data related to your user.
>
>
> - Example
>   ```js
>   let myUser = cloud.me();
>   ```
</details>



### Sphere
This class is not meant to be created directly, you get this from the CrownstoneCloud. It represents a single Sphere.

<details>
<summary><i>async</i> data() : Promise&lt;cloud_Sphere></summary>

> This method will get the sphere data from the cloud.
>
> - Returns
>   - **cloud_Sphere**:  JSON containing the data of this sphere. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let sphere     = cloud.sphere("612f7f0679aaa50004a0492a");
>   let sphereData = await sphere.data();
>   ```
</details>


<details>
<summary><i>async</i> keys() : Promise&lt;cloud_Keys></summary>

> Get the keys belonging to this sphere. These keys can be used for any bluetooth related operations.
>
> - Returns
>   - **cloud_Keys**: JSON containing keys for this sphere. [Type definition found here.](../src/declarations/cloudTypes.d.ts#L113)
>
>
> - Example
>   ```js
>   let sphere     = cloud.sphere("612f7f0679aaa50004a0492a");
>   let sphereKeys = await sphere.keys();
>   ```
</details>


<details>
<summary><i>async</i> locations() : Promise&lt;cloud_Location></summary>

> You use this method to download the data of the locations in your sphere.
>
> - Returns
>   - **cloud_Location[]**: JSON containing the data for all locations in this sphere. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let sphere          = cloud.sphere("612f7f0679aaa50004a0492a");
>   let sphereLocations = await sphere.locations();
>   ```
</details>


<details>
<summary><i>async</i> crownstones() : Promise&lt;cloud_Stone></summary>

> You use this method to download the data of the Crownstones in your sphere.
>
> - Returns
>   - **cloud_Stone[]**: JSON containing the data for all Crownstones in this sphere. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let sphere              = cloud.sphere("612f7f0679aaa50004a0492a");
>   let crownstonesInSphere = await sphere.crownstones();
>   ```
</details>


<details>
<summary><i>async</i> users() : Promise&lt;cloud_sphereUserDataSet></summary>

> Get all users in sphere, with their corresponding permission levels.
>
> - Returns
>   - **cloud_sphereUserDataSet[]**: JSON containing the users in the sphere, with their access levels. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let sphere = cloud.sphere("612f7f0679aaa50004a0492a");
>   let users  = await sphere.users();
>   ```
</details>


<details>
<summary><i>async</i> authorizationTokens() : Promise&lt;cloud_SphereAuthorizationTokens></summary>

> Used for hubs to get the tokens identifying users.
>
> **IMPORTANT! This method requires hub-level access. Userlevel access will throw an unauthorized error, even for admins.**
>
> - Returns
>   - **cloud_SphereAuthorizationTokens[]**: JSON containing the users in the sphere, with their authorization tokens. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let sphere = cloud.sphere("612f7f0679aaa50004a0492a");
>   let tokens  = await sphere.authorizationTokens();
>   ```
</details>



<details>
<summary><i>async</i> presentPeople(ignoreDeviceId?: string) : Promise&lt;SpherePresentPeople></summary>

> Used to get the locations of all users in the sphere. User devices (like phones) have locations. If a user has multiple devices, they can have multiple locations.
> If the location array is empty, this means that they're in the sphere, but the indoor localization has not determined which room they are in.
>
> - Parameters
>   - **ignoreDeviceId**(string): optionally provide the ignoreDeviceId which is the device that will not be taken into account when determining the locations of the users.
>
>
> - Returns
>   - **SpherePresentPeople[]**: JSON containing the data for the locations of all users in this sphere. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let sphere        = cloud.sphere("612f7f0679aaa50004a0492a");
>   let presentPeople = await sphere.presentPeople();
>   ```
</details>


### Location
This class is not meant to be created directly, you get this from the CrownstoneCloud. It represents a single location.


<details>
<summary><i>async</i> data() : Promise&lt;cloud_Location></summary>

> This method will get the location data from the cloud.
>
> - Returns
>   - **cloud_Location**:  JSON containing the data of this location. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let location     = cloud.location("612f7f0679aaa50004a0492a");
>   let locationData = await location.data();
>   ```
</details>


<details>
<summary><i>async</i> crownstones() : Promise&lt;cloud_Stone></summary>

> You use this method to download the data of the Crownstones in this location.
>
> - Returns
>   - **cloud_Stone[]**: JSON containing the data for all Crownstones in this location. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let location              = cloud.location("612f7f0679aaa50004a0492a");
>   let crownstonesInLocation = await location.crownstones();
>   ```
</details>


### Crownstone
This class is not meant to be created directly, you get this from the CrownstoneCloud. It represents a single Crownstone.


<details>
<summary><i>async</i> data() : Promise&lt;cloud_Stone></summary>

> This method will get the Crownstone data from the cloud.
>
> - Returns
    >   - **cloud_Stone**:  JSON containing the data of this Crownstone. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let crownstone     = cloud.crownstone("612f7f0679aaa50004a0492a");
>   let crownstoneData = await crownstone.data();
>   ```
</details>



<details>
<summary><i>async</i> getCurrentSwitchState() : Promise&lt;number></summary>

> Get the last known switch state of a Crownstone. Keep in mind that a user can opt-out of sending the Crownstone state to the cloud via
> the privacy settings in the Crownstone app.
>
> - Returns
    >   - **number**:  the current switchstate between 0 and 100.
>
>
> - Example
>   ```js
>   let crownstone  = cloud.crownstone("612f7f0679aaa50004a0492a");
>   let switchState = await crownstone.getCurrentSwitchState();
>   ```
</details>

<details>
<summary><i>async</i> setCurrentSwitchState(percentage: number)</summary>

> Set the current switch state in the cloud. This will not switch the Crownstone, but it will update the database for the next time getCurrentSwitchState is called.
>
> - Parameters
    >   - **percentage**(number): value between 0 and 100.
>
> - Example
>   ```js
>   let crownstone  = cloud.crownstone("612f7f0679aaa50004a0492a");
>   await crownstone.setCurrentSwitchState(75);
>   ```
</details>

<details>
<summary><i>async</i> setSwitch(percentage: number)</summary>

> Get the last known switch state of a Crownstone. Keep in mind that a user can opt-out of sending the Crownstone state to the cloud via
> the privacy settings in the Crownstone app.
>
> - Parameters
    >   - **percentage**(number): value between 0 and 100. If the Crownstone cannot dim, all values larger than 0 will turn on the Crownstone via the relay.
>
> - Example
>   ```js
>   let crownstone  = cloud.crownstone("612f7f0679aaa50004a0492a");
>   await crownstone.setSwitch(75);
>   ```
</details>



<details>
<summary><i>async</i> turnOn() : Promise&lt;void></summary>

> Turn the Crownstone on. If you have a twilight behaviour configured, the exact intensity will depend on the behaviour. If you want to fully turn on a Crownstone, use setSwitch.
>
> - Example
>   ```js
>   let crownstone  = cloud.crownstone("612f7f0679aaa50004a0492a");
>   await crownstone.turnOn();
>   ```
</details>

<details>
<summary><i>async</i> turnOff() : Promise&lt;void></summary>

> Turn the Crownstone off.
>
> - Example
>   ```js
>   let crownstone  = cloud.crownstone("612f7f0679aaa50004a0492a");
>   await crownstone.turnOff();
>   ```
</details>


### User
This class is not meant to be created directly, you get this from the CrownstoneCloud. It represents you as a User.


<details>
<summary><i>async</i> data() : Promise&lt;cloud_UserData></summary>

> This method will get the User data from the cloud.
>
> - Returns
    >   - **cloud_UserData**:  JSON containing the data of this User. [Type definition found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let user     = cloud.me();
>   let userData = await user.data();
>   ```
</details>


<details>
<summary><i>async</i> id() : Promise&lt;string></summary>

> This will return the userId of your used
>
> - Returns
    >   - **string**:  the database id of your user.
>
>
> - Example
>   ```js
>   let user   = cloud.me();
>   let userId = await user.id();
>   ```
</details>

<details>
<summary><i>async</i> currentLocation() : Promise&lt;cloud_UserLocation[]></summary>

> Get your current location, based on the devices you have. Each device can be in a different location. Keep in mind that the user can opt-out of sharing his/her location with the cloud. If the app's privacy settings allow sharing location, this endpoint will have data if you're in a sphere or room that you're a part of.
>
>If you require a notification when location changes, take a look at the server-sent events. Do not poll this endpoint for changes!
>
>If you'd like to know the location of the people in a Sphere, take a look at the presentPeople endpoint below in the Sphere section.
>
> - Parameters
>   - **cloud_UserLocation[]**: array of JSON objects describing the current location of the user's devices.  [Type definition found here.](../src/declarations/cloudTypes.d.ts)
> 
> - Example
>   ```js
>   let user         = cloud.me();
>   let userLocation = await user.currentLocation();
>   ```
</details>

