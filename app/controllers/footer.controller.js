export default class FooterController {
  constructor(LanguageService) {
    'ngInject';

    this.LanguageService = LanguageService;
  }

  changeLanguage(language) {
    this.LanguageService.setLanguage(language);
  }
}
