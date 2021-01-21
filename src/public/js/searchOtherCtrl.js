import * as otherSearchView from './views/otherSearchView';
import Other from './models/Other';
import * as calculationsCtrl from './calculationsCtrl';
import { renderLoader, clearLoader, maxLogo, renderNewExpenseBtn, renderSearchBtns, clearResult } from './views/searchView';
import { elements } from './views/base';
import { state } from './index';

////////////////////
// OTHER EXPENSE //
////////////////////

export const controlOtherSearch = () => {
  // 1. Get values from the form
  const query = otherSearchView.getOtherInput();

  if (query) {
    // 2. Create new Other object and add it to the state
    state.otherExpense = new Other(query);
    state.otherExpense.getOtherExpenseDetails();

    // 3. Add new Expense to Calculations
    calculationsCtrl.addOtherExpense(state.otherExpense);
    window.location.hash = 'section-calculations';

    // 4. Reset UI
    clearResult();
    maxLogo();
    renderNewExpenseBtn();
  }
};
