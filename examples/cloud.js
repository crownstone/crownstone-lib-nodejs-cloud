let cs = require("../dist/index");


cloud = new cs.CrownstoneCloud('http://localhost:3000/api/')
cloud.hubLogin('5e5e92454561fb37ef48c25d', 123456)
  .then((r) => { console.log("r",r)})
  .catch((err) => { console.log("error", err)})
