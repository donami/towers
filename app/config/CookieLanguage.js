export default function cookieLanguage($cookies, $translate) {
  'ngInject';
  
  if ($cookies.get('language')) {
    $translate.use($cookies.get('language'));
  }
}
