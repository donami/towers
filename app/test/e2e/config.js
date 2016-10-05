exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['login/login.spec.js'],

  chromeDriver: '/usr/local/lib/node_modules/protractor/selenium/chromedriver',

  seleniumServerJar: '/usr/local/lib/node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',
};
