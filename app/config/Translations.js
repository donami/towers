import { langEnglish, langSwedish } from './../languages';

export default function translations($translateProvider) {
  'ngInject';

  $translateProvider.translations('en', langEnglish);

  $translateProvider.translations('se', langSwedish);

  $translateProvider.preferredLanguage('en');
  $translateProvider.useSanitizeValueStrategy('escape');
}
