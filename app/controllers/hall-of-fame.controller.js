// HallOfFameController.$inject = ['_countries'];
export default class HallOfFameController {
  constructor(_countries) {
    'ngInject';
    this.countries = _countries.data;
  }
}
