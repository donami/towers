import * as _ from 'underscore';
import moment from 'moment';

export default class MeController {
  constructor($scope, $state, $cookies, $filter, MeFactory, DateService, DataFactory) {
    'ngInject';

    this.MeFactory = MeFactory;
    this.DateService = DateService;
    this.DataFactory = DataFactory;
    this.$filter = $filter;

    this.userApiKey = $cookies.get('userApiKey');
    this.state = {
      view: $state.current.name
    };
    this.claimedTowers = [];
    this.totalItems = 0;
    this.currentPage = 1;
    this.numPerPage = 5;
    this.orderBy = 'claimed_on';
    this.reverse = true;
    this.paginate = this.paginate.bind(this);

    this.lastClaimedTower = {
      tower_id: 0,
      info: [],
      stats: []
    };

    // For displaying of graphs
    this.graphData = {
      claimDays: {
        title: '_DAYS_WITH_MOST_CLAIMS',
        type: 'bar',
        data: [],
        labels: [],
        series: ['Days with most claims'],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                min: 0,
              }
            }]
          }
        }
      },
      claimsPerDay: {
        title: 'Claims per day this week',
        type: 'bar',
        data: [],
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        series: ['Claims per day this week'],
        options: {
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 1,
                min: 0,
              }
            }]
          }
        }
      }
    };

    $scope.$watch(() => $state.current.name, (newValue) => this.state.view = newValue);

    this.init();
  }

  init() {
    this.getClaims();
    this.getLatestClaimedTower();
  }

  // Get your claims
  getClaims() {
    return this.MeFactory.getClaims()
      .then((response) => {
        this.DataFactory.attatchMetaToClaims(response.data)
          .then((data) => {
            this.claimedTowers = this.$filter('orderBy')(data, this.orderBy, this.reverse);
            this.totalItems = data.length;
          })
          .catch(error => console.log(error));

        this.getDaysWithMostClaims(response.data);
        this.getClaimsPerDay(response.data);

      })
      .catch(error => console.log(error));
  }

  // Get the latest claimed tower
  getLatestClaimedTower() {
    return this.MeFactory.getLatestClaimedTower()
      .then((response) => {
        let claimedTower = {};

        let towerId = response.data[0].lastClaimedTowerId;

        let info = response.data[1].find((obj) => {
          return obj.tower_id == towerId;
        });

        let stats = response.data[2].find((obj) => {
          return obj.tower_id == towerId;
        });

        claimedTower.tower_id = towerId;
        claimedTower.info = info;
        claimedTower.stats = stats;

        this.lastClaimedTower = claimedTower;
      })
      .catch(error => console.log(error));
  }

  // Filter for paginating the results
  paginate(value) {
    let begin, end, index;
    begin = (this.currentPage - 1) * this.numPerPage;
    end = begin + this.numPerPage;
    index = this.claimedTowers.indexOf(value);
    return (begin <= index && index < end);
  }

  // Sort the table
  sortBy(property, parseFloat) {
    this.reverse = !this.reverse;
    this.orderBy = property;

    if (parseFloat) {
      this.claimedTowers.forEach((obj) => {
        if (obj[property] !== '')
          obj[property] = parseInt(obj[property]);
      });
    }

    this.claimedTowers = this.$filter('orderBy')(this.claimedTowers, this.orderBy, this.reverse);
  }


  // Get the days that user has claimed the most towers
  getDaysWithMostClaims(data) {
    data = data.map((obj) => {
      obj.claimed_on = obj.claimed_on.substr(0, 10);
      return obj;
    });

    var counts = _.countBy(data, 'claimed_on');
    var sortable = _.pairs(counts);

    sortable.sort((a, b) => b[1] - a[1]);

    sortable = sortable.slice(0, 10);

    sortable.forEach((obj) => {
      this.graphData.claimDays.labels.push(obj[0]);
      this.graphData.claimDays.data.push(obj[1]);
    });
  }

  // Get data for graph, displaying all claims made current week
  getClaimsPerDay(data) {
    var thisYear = moment().format('YYYY');

    // Get only the day without the time and remove dates from other year
    data = data.filter(function(obj) {
      if (obj.claimed_on.substring(0, 4) !== thisYear)
        return null;

      obj.claimed_on = obj.claimed_on.substring(0, 10);
      return obj;
    });

    // Get the number of claims per day
    data = _.countBy(data, function(obj) {
      return obj.claimed_on;
    });

    var countsByDay = [];

    // Return the count if exists, otherwise return 0
    this.DateService.getDaysInWeek().forEach((obj) => {
      if (obj in data)
        countsByDay.push(data[obj]);
      else
        countsByDay.push(0);
    });

    // Set max value based on max value of week
    this.graphData.claimsPerDay.options.scales.yAxes[0].ticks.max = (Math.max.apply(Math, countsByDay) + 1);
    this.graphData.claimsPerDay.data = [countsByDay];
  }
}
