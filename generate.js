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

  zuul.retryable: true
  zuul.routes.route-couvertures-a-date.path: "/abcd/couvertures_contractuelles/v*1/couvertures_a_date/**"
  zuul.routes.route-couvertures-contractuelles.path: "/abcd/couvertures_contractuelles/v*1/couvertures/**"
  zuul.routes.route-devis.path: "/abcd/devis/v*1/devis/**"
  zuul.routes.route-risques-a-assurer.path: "/abcd/devis/v*1/risques_a_assurer/**"
  zuul.routes.route-foyers-v1.path: "/xyz/personnes_physiques/v*1/foyers/**"
  zuul.routes.route-personnes-physiques-v1.path: "/xyz/personnes_physiques/v*1/personnes_physiques/**"
  zuul.routes.route-produits-concurrence.path: "/xyz/personnes_physiques/v*1/produits_concurrence/**"
  zuul.routes.route-donnees-references-v5.path: "/xyz/donnees_references/v5/**"

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
