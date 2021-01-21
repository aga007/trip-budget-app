import { elements, elementStrings, displayNotification } from './base';

export const getFoodInput = () =>
  `tripStart=${document.getElementById('tripStart').value}&tripEnd=${document.getElementById('tripEnd').value}&travelStyle=${document.getElementById('travel-style').value}&priceLevel=${
    document.querySelector('input[name="priceLevel"]:checked').value
  }&dailySpending=${document.getElementById('daily-food-spending').value}&dailySpendingType=${document.querySelector('input[name="dailySpendingType"]:checked').value}&foodNrOfPeople=${
    document.getElementById('nr-of-people').value
  }`;

export const renderFoodSearchForm = (date) => {
  const markup = ` <form class="form" id="${elementStrings.foodSearch}">
    <p class="form__tip">Trip dates:</p>
    <div class="form__group">
    <label class="form__label" for="tripStart">From:</label>
    <input class="form__input" type="date" min="${date}" id="tripStart" name="tripStart" placeholder="Check-in" required>
    </div>
    <div class="form__group">
    <label class="form__label" for="tripEnd" >To:</label>
    <input class="form__input" type="date" min="${date}" id="tripEnd" name="tripEnd" placeholder="Check-out" required>
    </div>
    <div class="form__group">
    <label class="form__label" for="travel-style" >Travel style:</label>
    <select class="form__input" name="travelStyle" id="travel-style" >
        <option value="budget">Budget</option>
        <option value="mid-range">Mid-Range</option>
        <option value="luxury">Luxury</option>
    </select>
    </div>
    <p class="form__tip u-margin-bottom-medium">How expensive is the destination country compared to the home country (3 = home prices level)</p>
    <div class="form__centered-box">
    <div class="form__radio-row-group">
    <input class="form__radio-input" type="radio" value="1" id="price-level-1" name="priceLevel">
    <label class="form__radio-row-label" for="price-level-1" ><span class="form__radio-row-btn"></span>1</label>  
    </div>
    <div class="form__radio-row-group">
    <input class="form__radio-input" type="radio" value="2" id="price-level-2" name="priceLevel">
    <label class="form__radio-row-label" for="price-level-2" ><span class="form__radio-row-btn"></span>2</label>
    </div>
    <div class="form__radio-row-group">
    <input class="form__radio-input" type="radio" value="3" id="price-level-3" name="priceLevel" checked>
    <label class="form__radio-row-label" for="price-level-3" ><span class="form__radio-row-btn"></span>3</label>  
    </div>
    <div class="form__radio-row-group">
    <input class="form__radio-input" type="radio" value="4" id="price-level-4" name="priceLevel">
    <label class="form__radio-row-label" for="price-level-4" ><span class="form__radio-row-btn"></span>4</label>
    </div>
    <div class="form__radio-row-group">
    <input class="form__radio-input" type="radio" value="5" id="price-level-5" name="priceLevel">
    <label class="form__radio-row-label" for="price-level-5" ><span class="form__radio-row-btn"></span>5</label>  
    </div>
    </div>
    
    <p class="form__tip">Average daily food spending in home country:</p>
      <div class="form__group">
      <label class="form__label" for="daily-food-spending" >Daily cost:</label>
      <input class="form__input form__input--nr" type="number" min="0" step=".01" id="daily-food-spending" name="dailySpending" required>
      <div class="form__currency">€</div>
      </div>
      <div class="form__radio-group">
      <input class="form__radio-input" type="radio" value="total" id="total-expense-cost" name="dailySpendingType">
      <label class="form__radio-label" for="total-expense-cost" ><span class="form__radio-btn"></span> Total cost</label>  
      </div>
      <div class="form__radio-group">
      <input class="form__radio-input" type="radio" value="perPerson" id="expense-per-person" name="dailySpendingType">
      <label class="form__radio-label" for="expense-per-person" ><span class="form__radio-btn"></span> Per person</label>
      </div>
      <div class="form__group hidden" id="nr-of-people-group">
      <label class="form__label" for="nr-of-people" >Nr of people:</label>
      <select class="form__input" name="nrOfPeople" id="nr-of-people" >
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
