(function() {
  'use strict';

  angular
    .module('towersApp')
    .service('GraphFilter', GraphFilter);

  GraphFilter.$inject = ['$state'];
  function GraphFilter($state) {

    this.applyFilter = function(filter, options) {

      var startDate = '2000-01-01';
      var endDate = moment().add(10, 'years').format('YYYY-MM-DD');

      switch (filter) {
        case 'no_filter':
          endDate = moment().add(10, 'years').format('YYYY-MM-DD');
        break;
        case 'last_week':
          startDate = moment().startOf('isoweek').subtract(2, 'weeks').format('YYYY-MM-DD');
          endDate = moment().startOf('isoweek').subtract(1, 'weeks').subtract(1, 'days').format('YYYY-MM-DD');
          break;

        case 'last_seven_days':
          startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
          endDate = moment().format('YYYY-MM-DD');

          break;

        case 'today':
          startDate = moment().format('YYYY-MM-DD');
          endDate = moment().add(1, 'days').format('YYYY-MM-DD');

          break;

        case 'yesterday':
          startDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
          endDate = moment().format('YYYY-MM-DD');

          break;

        case 'current_year':
          startDate = moment().startOf('year').format('YYYY-MM-DD');
          endDate = moment().endOf('year').format('YYYY-MM-DD');

          break;

        case 'filter_by_year':
          if (!options.selectedYear) {
            return {
              error: {
                message: 'Please select a year',
                title: 'No date',
              }
            };
          }

          startDate = moment(options.selectedYear.value + '-01-01').startOf('year').format('YYYY-MM-DD');
          endDate = moment(options.selectedYear.value + '-01-01').endOf('year').format('YYYY-MM-DD');

          break;

        case 'filter_by_new_moons':
          startDate = moment(options.filterByMoonStart.iso8601).format('YYYY-MM-DD');
          endDate = moment(options.filterByMoonEnd.iso8601).format('YYYY-MM-DD');

          if (startDate > endDate) {
            return {
              error: {
                message: 'The last new moon could not be before the first',
                title: 'Ooops...',
              }
            };
          }

          break;

        default:

      }

      return {
        startDate: startDate,
        endDate: endDate
      };
    };

    this.getFilterOptions = function() {
      var filterOptions = [
        { name: 'No filter', value: 'no_filter' },
        { name: 'Last week', value: 'last_week' },
        { name: 'Last seven days', value: 'last_seven_days' },
        { name: 'Today', value: 'today' },
        { name: 'Yesterday', value: 'yesterday' },
        { name: 'This year', value: 'current_year' },
        { name: 'Specific year', value: 'filter_by_year' },
        { name: 'Between new moons', value: 'filter_by_new_moons' }
      ];
      return filterOptions;
    }

    this.getYearOptions = function() {
      var yearOptions = [
        { name: '2016', value: '2016' },
        { name: '2015', value: '2015'},
        { name: '2014', value: '2013'},
        { name: '2013', value: '2014'},
      ];
      return yearOptions;
    }

    this.getGraphData = function() {
      // Click event for graph
      var graphOnClick = function(evt) {
        var element = this.getElementsAtEvent(evt)[0];
        if (!element)
          return false;

        var index = element._index;

        if (!element._chart.config.data.datasets[0][index])
          return false;

        var link = element._chart.config.data.datasets[0][index].link;
        $state.go('app.towerSingle', {id: link});
      };

      // Default options for graph
      var graphDefaultOptions = {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,         // Graph starting at
            }
          }]
        },
        onClick: graphOnClick
      };

      return {
        towersByCity: {
          title: '_CITIES_WITH_MOST_TOWERS',
          type: 'bar',
          data: [],
          series: ['Cities with most towers'],
          labels: [],
          options: graphDefaultOptions,
        },
        towerPlayerCount: {
          title: '_TOWERS_WITH_MOST_PLAYER_COUNT',
          type: 'bar',
          data: [],
          series: ['Towers with most player count'],
          labels: [],
          options: graphDefaultOptions,
          dataset: []
        },
        towerHighestClaim: {
          title: '_TOWERS_WITH_MOST_CLAIMS',
          type: 'bar',
          data: [],
          series: ['Towers with most claims'],
          labels: [],
          dataset: [],
          options: graphDefaultOptions,
        },
        geldBonus: {
          title: '_HIGHEST_GELD_BONUS',
          type: 'bar',
          data: [],
          series: ['Highest geld bonus'],
          labels: [],
          options: graphDefaultOptions,
        },
        towersBuilt: {
          title: '_MOST_TOWERS_BUILT',
          type: 'bar',
          data: [],
          series: ['Most towers built'],
          labels: [],
          options: graphDefaultOptions,
        },
        geldCollected: {
          title: '_MOST_GELD_COLLECTED',
          type: 'bar',
          data: [],
          series: ['Most geld collected'],
          labels: [],
          options: graphDefaultOptions,
        },
        claimCount: {
          title: '_MOST_TOWERS_CLAIMED',
          type: 'bar',
          data: [],
          series: ['Most towers claimed'],
          labels: [],
          options: graphDefaultOptions,
        },
      }
    }

  }
})();
