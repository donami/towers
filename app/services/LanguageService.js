// LanguageService.$inject = ['$cookies', '$translate'];

export default class LanguageService {
  constructor($cookies, $translate) {
    'ngInject';

    this.$cookies = $cookies;
    this.$translate = $translate;
  }

  setLanguage(language) {
    this.$translate.use(language);
    this.$cookies.put('language', language);
  }
}
