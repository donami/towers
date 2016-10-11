export default class TowerController {
  /*@ngInject*/
  constructor($scope, TowerFactory, MeFactory, $state, $stateParams, MapService) {
    'ngInject';

    this.TowerFactory = TowerFactory;
    this.MeFactory = MeFactory;
    this.MapService = MapService;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.state = {
      loading: true,
      view: this.$state.current.name,
    };

    this.init();

    $scope.$watch(() => $state.current.name, (newValue) => this.state.view = newValue);
  }

  init() {
    this.findTower(this.$stateParams.id);
    this.getLog(this.$stateParams.id);
  }

  findTower(id) {
    this.TowerFactory.findById(id)
      .then((response) => {
        this.state.loading = false;
        this.tower = response.data;

        return this.MapService.getMap(this.tower.formatted_address);
      })
      .then(response => this.map = response.map)
      .catch((error) => {
        this.state.loading = false;

        if (error.status) {
          if (error.status === 404) {
            this.error = {
              type: 'Unable to load tower: ' + error.data.message,
              message: 'This tower is missing data',
            };
          }
        }
      });
  }

  getLog(id) {
    return this.MeFactory.getClaims()
      .then((response) => {
        // Get claims on this tower
        var data = response.data.filter(obj => obj.tower_id == id);

        // Sort the data
        data.sort((a, b) => {
          if (a.claimed_on > b.claimed_on) return -1;
          if (a.claimed_on < b.claimed_on) return 1;

          return 0;
        });

        this.log = data;
      })
      .catch(error => console.log(error));
  }
}
