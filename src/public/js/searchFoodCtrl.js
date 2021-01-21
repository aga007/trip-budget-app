import * as foodSearchView from './views/foodSearchView';
import Food from './models/Food';
import * as calculationsCtrl from './calculationsCtrl';
import { maxLogo, changeSearchTitle, renderSearchBtns, clearResult } from './views/searchView';
import { elements } from './views/base';
import { state } from './index';

////////////////////
// FOOD SPENDING //
////////////////////

export const controlFoodSearch = () => {
  // 1. Get values from the form
  const query = foodSearchView.getFoodInput();

  if (query) {
    // 2. Create new Food object and add it to the state
    state.foodSpending = new Food(query);
    state.foodSpending.getFoodSpendingDetails();

    // // 3. Add new Expense to Calculations
    calculationsCtrl.addFoodSpending(state.foodSpending);
    window.location.hash = 'section-calculations';

    // // 4. Reset UI
    clearResult();
    maxLogo();
    changeSearchTitle('Search');
    renderSearchBtns();
  }
};
