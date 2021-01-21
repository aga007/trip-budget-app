import * as budgetView from './views/budgetView';
import { state } from './index';

/**
 * BUDGET CONTROLLER
 */

export const updateBudget = () => {
  // 1. Calculate the budget
  state.budgetList.calculateBudget();

  // 3. Display the budget on the UI
  budgetView.displayBudget(state.budgetList.budget);
};
