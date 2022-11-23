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

# License

## Open-source license

This firmware is provided under a noncontagious open-source license towards the open-source community. It's available under three open-source licenses:
 
* License: LGPL v3+, Apache, MIT

<p align="center">
  <a href="http://www.gnu.org/licenses/lgpl-3.0">
    <img src="https://img.shields.io/badge/License-LGPL%20v3-blue.svg" alt="License: LGPL v3" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
  </a>
  <a href="https://opensource.org/licenses/Apache-2.0">
    <img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License: Apache 2.0" />
  </a>
</p>

## Commercial license

This firmware can also be provided under a commercial license. If you are not an open-source developer or are not planning to release adaptations to the code under one or multiple of the mentioned licenses, contact us to obtain a commercial license.

* License: Crownstone commercial license

# Contact

For any question contact us at <https://crownstone.rocks/contact/> or on our discord server through <https://crownstone.rocks/forum/>.
