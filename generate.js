var YAML = require("yaml");

function main() {
  const inputRaw = `  common-name.entities[0].key: "key1"
  common-name.entities[0].roles[0]: "ROLE_ADMIN"
  common-name.entities[0].callerName: "env1"
  common-name.entities[1].key: "key2"
  common-name.entities[1].roles[0]: "ROLE_USER"
  common-name.entities[1].callerName: "call1"
  common-name.entities[2].key: "key3"
  common-name.entities[2].roles[0]: "ROLE_ADMIN"
  common-name.entities[2].callerName: "call3"
  eureka.client.enabled: true
  eureka.client.eureka-connection-idle-timeout-seconds: 15
  eureka.client.eureka-server-connect-timeout-seconds: 3
  eureka.client.eureka-server-read-timeout-seconds: 4
  eureka.client.fetchRegistry: true
  eureka.client.registerWithEureka: true
  eureka.client.registry-fetch-interval-seconds: 10
  eureka.client.serviceUrl.defaultZone: "http://good-tizspm-upm-prod-i:8080/eu"
  eureka.instance.preferIpAddress: true
  guest-stars.apis[0]: "/api/contacts_persoone/v1"
  guest-stars.apis[1]: "/api/rendez_vous/v1"
  guest-stars.apis[2]: "/api/personnes/v1"

`;
  const input = YAML.parse(inputRaw);
  let output = {};
  for (const [key, value] of Object.entries(input)) {
    let cur = output;
    let field = "";
    for (const item of key.split(".")) {
      if (field != "") {
        if (field in cur) {
          cur = cur[field];
        } else {
          cur = (cur[field] = {});
        }
      }
      field = item;
    }
    cur[field] = value;
  }
  const result = YAML.stringify(output);
  console.log(result);
}
main();
