import * as carSearchView from './views/carSearchView';
import Car from './models/Car';
import * as calculationsCtrl from './calculationsCtrl';
import { maxLogo, renderSearchBtns, clearResult, changeSearchTitle } from './views/searchView';
import { state } from './index';

////////////////////
// CAR RENTAL COST //
////////////////////

export const controlCarSearch = () => {
  // 1. Get values from the form
  const query = carSearchView.getCarSearchInput();

  if (query) {
    // 2. Create new Car search object and add it to the state
    state.cars = new Car(query);
    state.cars.getCarRentalDetails();

    // 3. Add new Car rental cost to Calculations
    calculationsCtrl.addCarRentalCost(state.cars);
    window.location.hash = 'section-calculations';

    // 4. Reset UI
    clearResult();
    maxLogo();
    changeSearchTitle('Search');
    renderSearchBtns();
  }
};
