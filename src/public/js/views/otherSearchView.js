import { elements, elementStrings, displayNotification } from './base';

export const getOtherInput = () =>
  `otherExpense=${document.getElementById('other-expense').value}&otherExpenseCost=${document.getElementById('other-expense-cost').value}&otherExpenseType=${
    document.querySelector('input[name="otherExpenseType"]:checked').value
  }&otherExpensePeople=${document.getElementById('nr-of-people').value}`;

export const renderOtherSearchForm = () => {
  const markup = ` <form class="form" id="${elementStrings.otherSearch}">
    <div class="form__group">
    <label class="form__label" for="other-expense" >Expense </label>
    <input class="form__input" list="other-expenses" type="text" id="other-expense" name="otherExpense" placeholder="Expense name" required>
    <datalist id="other-expenses">
        <option value="Visa">Visa</option>
        <option value="Insurance">Insurance</option>
        <option value="Vaccinations">Vaccinations</option>
        <option value="SIM card / WiFi">SIM card / WiFi</option>
        <option value="Entrance fees">Entrance fees</option>
        <option value="Fuel">Fuel</option>
        <option value="Parking">Parking</option>
        <option value="Public transport">Public transport</option>
        <option value="Sightseeing and activities">Sightseeing and activities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Souvenirs and gifts">Souvenirs and gifts</option>
    </datalist>
    </div>
    <div class="form__group">
    <label class="form__label" for="other-expense-cost" >Cost:</label>
    <input class="form__input form__input--nr" type="number" min="0" step=".01" id="other-expense-cost" name="otherExpenseCost" required>
    <div class="form__currency">€</div>
    </div>
    <div class="form__radio-group">
    <input class="form__radio-input" type="radio" value="total" id="total-expense-cost" name="otherExpenseType">
    <label class="form__radio-label" for="total-expense-cost" ><span class="form__radio-btn"></span> Total cost</label>  
    </div>
    <div class="form__radio-group">
    <input class="form__radio-input" type="radio" value="perPerson" id="expense-per-person" name="otherExpenseType">
    <label class="form__radio-label" for="expense-per-person" ><span class="form__radio-btn"></span> Per person</label>
    </div>
    <div class="form__group hidden" id="nr-of-people-group">
    <label class="form__label" for="nr-of-people" >Nr of people:</label>
    <select class="form__input" name="otherExpensePeople" id="nr-of-people" >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
    </select>
    </div>
    <div class="form__button">
    <button class="btn btn__big">Add expense</button>
    </div>
    </form>`;
  elements.reqBox.insertAdjacentHTML('afterbegin', markup);
};
