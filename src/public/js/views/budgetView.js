import { elements, elementStrings } from './base';

const createNum = (el) => `<div class="budget__numberbox"> ${el} </div>`;

const clearBudget = () => {
  elements.budgetAmount.innerHTML = '';
};

export const displayBudget = (budget) => {
  let b, int, dec;

  b = budget.toFixed(2).split('.');
  int = Array.from(b[0]);
  dec = Array.from(b[1]);

  let integers = '';
  let decimals = '';

  int.forEach((el) => (integers += createNum(el)));
  dec.forEach((el) => (decimals += createNum(el)));

  const integersZero = `
            <div class="budget__numberbox">
            <i class="fas fa-umbrella-beach"></i>
            </div>
            <div class="budget__numberbox">
            <i class="fas fa-umbrella-beach"></i>
            </div>
            <div class="budget__numberbox">
            <i class="fas fa-umbrella-beach"></i>
            </div>`;

  const decimalsZero = `
              <div class="budget__numberbox">
              <i class="fas fa-umbrella-beach"></i>
              </div>
              <div class="budget__numberbox">
              <i class="fas fa-umbrella-beach"></i>
              </div>`;

  const markup = `<div class="budget__currency">€</div>
                    ${b[0] === '0' && b[1] === '00' ? integersZero : integers}<div class="budget__virgola"> , </div> ${b[0] === '0' && b[1] === '00' ? decimalsZero : decimals}`;

  clearBudget();
  elements.budgetAmount.insertAdjacentHTML('afterbegin', markup);
};

export const clearList = () => {
  elements.budgetList.classList.add('list__hidden');
  elements.budgetList.innerHTML = '';
  document.querySelector(`#${elementStrings.budgetBtn}`).classList.remove('btn__active');
};

const renderItem = (item) => `
    <li class="list__li" data-itemid=${item.id}>
    <i class="fas fa-angle-double-right budget__icon"></i>
        ${item.name} - ${item.price}€
    </li>
    `;

export const renderBudgetList = (expenses, budget) => {
  const markup = `
  <a href="#" class="list__hide">&times;</a>
  <h3 class="heading-tertiary">List of expenses:</h3>
  <ul class="list__ul">
    ${expenses.map((el) => renderItem(el)).join('')}
  </ul>
  <p class="list__amount">
  TOTAL: ${budget.toFixed(2)}€
  </p>
  <button id="print-budget-list" class="btn btn__small btn--red">Print list</button>
`;

  elements.budgetList.insertAdjacentHTML('beforeend', markup);
};

export const printBudgetList = (divName) => {
  const printContent = document.getElementById(`${divName}`).innerHTML;
  const originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  window.location.reload(true);
  document.body.innerHTML = originalContent;
};
