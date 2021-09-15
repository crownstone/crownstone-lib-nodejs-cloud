# crownstone-lib-nodejs-cloud

This library is made up from 2 parts, one for the Crownstone Cloud and one for the Webhook API. 
Most users won't need to use the webhook API, [but the documentation is available here.](./docs/WEBHOOK_API.md)


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
This instance will cache your user tokens.

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

# API documentation

[The rest of the API docs can be found here](./docs/CLOUD_API.md)