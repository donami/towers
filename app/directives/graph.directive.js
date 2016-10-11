
export default class graph {
  constructor($compile) {
    this.restrict = 'AE';
    this.replace = 'true';
    this.templateUrl = 'templates/graph.html';
    this.scope = {
      type: '=',
      data: '=',
      labels: '=',
      series: '=',
      options: '=',
      graphTitle: '=',
      datasetoverride: '=',
    };
    this.link = this.linkFunc;

    this.$compile = $compile;
  }

  linkFunc(scope, elem, attrs) {
    let canvas = elem.find('canvas');
    switch (scope.type) {
      case 'bar':
        canvas.addClass('chart-bar');
        break;
      case 'line':
        canvas.addClass('chart-line');
        break;
      default:
        canvas.addClass('chart-bar');
    }
    // Recompile
    this.$compile(elem)(scope);
  }

  static directiveFactory($compile){
    graph.instance = new graph($compile);
    return graph.instance;
  }
}
graph.directiveFactory.$inject = ['$compile'];
