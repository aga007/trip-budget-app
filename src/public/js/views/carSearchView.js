import { elements, elementStrings } from './base';

export const getCarSearchInput = () => `carRentalCost=${document.getElementById('car-rental-cost').value}&carRentalCompany=${document.getElementById('car-rental-company').value}`;

export const renderCarSearchForm = () => {
  const markup = ` <form class="form" id="${elementStrings.carSearch}">
    <p class="form__tip u-margin-bottom-medium">The car search option is temporarily unavailable. 
    Please search your car at <a href="https://www.rentalcars.com/en/" target="_blank" class="link">Rentalcars</a> 
    and add the total rental cost below. </p>
    <div class="form__group">
    <label class="form__label" for="car-rental-company" >Company: </label>
    <input class="form__input"  type="text" id="car-rental-company" name="carRentalCompany" placeholder="Car rental company" required>
    </div>
    <div class="form__group">
    <label class="form__label" for="car-rental-cost" >Cost:</label>
    <input class="form__input form__input--nr" type="number" min="0" step=".01" id="car-rental-cost" name="carRentalCost" required>
    <div class="form__currency">€</div>
    </div>
    <div class="form__button">
    <button class="btn btn__big ">Add expense</button>
    </div>
    </form>`;
  elements.reqBox.insertAdjacentHTML('afterbegin', markup);
};
