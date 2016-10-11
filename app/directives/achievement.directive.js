export default class achievement {
  constructor() {
    this.link = this.linkFunc;
    this.templateUrl = 'templates/achievement.html';
    this.restrict = 'AE';
    this.scope = {
      data: '='
    };
  }

  linkFunc(scope, elem, attrs) {
    if (scope.data.createdAt) {
      scope.achieved = true;
    }
  }
}
