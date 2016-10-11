import moment from 'moment';

export default class GraphController {
  constructor(TowerFactory, DataFactory, MoonFactory, $q, $filter, toastr, $state, $location, smoothScroll, GraphFilter) {
    'ngInject';

    this.TowerFactory = TowerFactory;
    this.DataFactory = DataFactory;
    this.MoonFactory = MoonFactory;
    this.smoothScroll = smoothScroll;
    this.GraphFilter = GraphFilter;
    this.toastr = toastr;

    this.moons = [];
    this.filter = {};

    this.yearOptions = GraphFilter.getYearOptions();
    this.filterOptions = GraphFilter.getFilterOptions();
    this.filter = this.filterOptions[0];

    this.init();
    this.loadData();
  }

  init() {
    this.getNewMoons();

    this.graphData = this.GraphFilter.getGraphData();
  }

  getNewMoons() {
    return this.MoonFactory.getNewMoons()
      .then((response) => this.moons = response.data)
      .catch((error) => console.log(error));
  }

  loadData(startDate, endDate) {
    if (!startDate) startDate = '2000-01-01';
    if (!endDate) endDate = moment().add(10, 'years').format('YYYY-MM-DD');

    this.TowerFactory.getLeaderboard(startDate, endDate)
      .then((response) => {
        // Handle data for players with most claims
        this.graphData.claimCount = Object.assign(this.graphData.claimCount, this.DataFactory.handleTopClaims(response.data));

        // Get the data for players collecting most geld
        this.graphData.geldCollected = Object.assign(this.graphData.geldCollected, this.DataFactory.handleMostGeldCollected(response.data));

        // Get data for players with most geld bonus
        this.graphData.geldBonus = Object.assign(this.graphData.geldBonus, this.DataFactory.handleMostGeldBonus(response.data));
      })
      .catch((error) => console.log(error));

    this.TowerFactory.getLeaderboardTowerBuilder(startDate, endDate)
      .then((response) => {
        // Get data for players who built the most towers
        this.graphData.towersBuilt = Object.assign(this.graphData.towersBuilt, this.DataFactory.handleMostTowersBuilt(response.data));
      })
      .catch((error) => console.log(error));

    this.TowerFactory.getStats(startDate, endDate)
      .then((response) => {
        // Filter data to get towerst with most claims
        this.graphData.towerHighestClaim = Object.assign(this.graphData.towerHighestClaim, this.DataFactory.handleTowersTopClaimed(response.data));

        // Filter out data to get towers with highest player count
        this.graphData.towerPlayerCount = Object.assign(this.graphData.towerPlayerCount, this.DataFactory.handleTowersPlayerCount(response.data));
      })
      .catch((error) => console.log(error));

    this.TowerFactory.getTowers(startDate, endDate)
      .then((response) => {
        // Filter data to get cities with most towers built
        this.DataFactory.handleCitiesWithMostTowers(response.data).forEach((obj) => {
          this.graphData.towersByCity.data.push(obj.amount);
          this.graphData.towersByCity.labels.push(obj.city);
        });
      })
      .catch((error) => console.log(error));
  }

  filterData() {
    var value = this.filter.value;

    var options = {
      selectedYear: this.selectedYear,
      filterByMoonStart: this.filterByMoonStart,
      filterByMoonEnd: this.filterByMoonEnd,
    };

    var filter = this.GraphFilter.applyFilter(value, options);

    if (filter.error) {
      this.toastr.error(filter.error.message, filter.error.title);
    }
    else {
      this.toastr.clear();
      this.init();
      this.loadData(filter.startDate, filter.endDate);
    }
  }

  // Reset filter
  clearFilter() {
    this.init();
    this.loadData();
  }

  // Scroll to anchor
  gotoAnchor(x) {
    var element = document.getElementById('anchor' + x);
    var options = {
      duration: 700,
      easing: 'easeInQuad',
      offset: 0,
    };
    this.smoothScroll(element, options);
  }

}
