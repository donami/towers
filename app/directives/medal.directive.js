export default class medal {
  constructor() {
    this.restrict = 'AE';
    this.template = '<div class="medal"></div>';
    this.replace = 'true';
    this.scope = {
      place: '='
    };
  }

  link(scope, elem, attrs) {
    switch (scope.place) {
      case 1: elem.addClass('gold'); break;
      case 2: elem.addClass('silver'); break;
      case 3: elem.addClass('bronze'); break;
      default:
    }
  }
}
