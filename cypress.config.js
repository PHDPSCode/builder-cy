const { defineConfig } = require("cypress");
 
module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl:'https://builderstudio-qa.smartlms.com.br/login',
     setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
  },
});
