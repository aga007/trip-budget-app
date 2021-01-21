import * as budgetCtrl from './budgetCtrl';
import Calculations from './models/Calculations';
import * as calculationsView from './views/calculationsView';
import { elementStrings, isEmpty, displayNotification } from './views/base';
import { state } from './index';
import { controlSkySearch } from './searchFlightCtrl';

//////////////////////////
// FLIGHTS ///
/////////////////////////

// DISPLAY FLIGHT RESULTS
export const addFlightDetails = (id) => {
  // 1. Find selected flight
  let selectedFlight = state.flightsArr[state.flightsArr.findIndex((el) => el.id === id)];

  if (!state.calcList) {
    // 2. Create Calculations object
    state.calcList = new Calculations();
  }

  // 3. Check if calcList is empty
  if (isEmpty(state.calcList)) {
    // 4. Render calcBox
    calculationsView.renderCalcBox();
  }

  // 5. Check if that flight is already selected
  if (state.calcList.flights.findIndex((el) => el.id === id) >= 0) {
    displayNotification('error', 'This flight is already selected!');
  } else {
    // 6. Add flight to calcList
    state.calcList.addFlightItem(selectedFlight);
    displayNotification('success', 'Flight successfully added.');

    // 7. Add flight to BudgetList
    state.budgetList.addExpense(selectedFlight.id, selectedFlight.name, selectedFlight.price);

    // 8. Prepare UI for changes
    calculationsView.cleanCalcBox(elementStrings.itemFlights);

    // 9. Render flight on UI
    calculationsView.renderFlightsDetails(state.calcList.flights);

    // 10. Update budget
    budgetCtrl.updateBudget();
  }
};

// DELETE FLIGHT

export const deleteFlightItem = (nrId) => {
  const id = nrId.slice(3);

  // 1. Delete flight from calcList
  state.calcList.deleteFlightItem(id);
  displayNotification('success', 'Flight successfully deleted.');

  // 2. Delete flight from budgetList
  state.budgetList.removeExpense(id);

  // 3. Prepare UI for changes
  calculationsView.cleanCalcBox(elementStrings.itemFlights);

  // 4. Delete calcBox if calcList is empty
  if (isEmpty(state.calcList)) {
    calculationsView.cleanCalcBox(elementStrings.calcContainer);
  } else {
    // 5. Render all selected flights
    calculationsView.renderFlightsDetails(state.calcList.flights);
  }

  // 6. Update budget
  budgetCtrl.updateBudget();
};

//////////////////////////
// ACCOMODATION ///
/////////////////////////

// DISPLAY HOTEL RESULTS
export const addHotelDetails = (id, hotels) => {
  // 1. Find selected hotel

  const numId = parseInt(id);

  let selectedHotel = state.hotelsArr[state.hotelsArr.findIndex((el) => el.id === numId)];

  if (!state.calcList) {
    // 2. Create Calculations object
    state.calcList = new Calculations();
  }

  // 3. Check if calcList is empty
  if (isEmpty(state.calcList)) {
    // 4. Render calcBox
    calculationsView.renderCalcBox();
  }

  // 5. Check if that hotel is already selected
  if (state.calcList.hotels.findIndex((el) => el.id === id) >= 0) {
    displayNotification('error', 'This hotel is already selected!');
  } else {
    // 6. Add hotel to calcList

    const queryDetails = {
      checkin: hotels.checkin,
      checkout: hotels.checkout,
      nights: hotels.nights,
      adults: hotels.adults,
      children: hotels.children,
    };

    const hotelStayInfo = { ...selectedHotel, ...queryDetails };
    state.calcList.addHotelItem(hotelStayInfo);
    displayNotification('success', 'Hotel successfully added.');

    // 7. Add flight to BudgetList
    state.budgetList.addExpense(selectedHotel.id, selectedHotel.name, selectedHotel.price);

    // 8. Prepare UI for changes
    calculationsView.cleanCalcBox(elementStrings.itemHotels);

    // 9. Render flight on UI
    calculationsView.renderHotelsDetails(state.calcList.hotels);

    // 10. Update budget
    budgetCtrl.updateBudget();
  }
};

// DELETE HOTEL

export const deleteHotelItem = (nrId) => {
  const id = nrId.slice(3);

  // 1. Delete hotel from calcList
  state.calcList.deleteHotelItem(id);
  displayNotification('success', 'Hotel successfully deleted.');

  // 2. Delete hotel from budgetList
  state.budgetList.removeExpense(id);

  // 3. Prepare UI for changes
  calculationsView.cleanCalcBox(elementStrings.itemHotels);

  // 4. Delete calcBox if calcList is empty
  if (isEmpty(state.calcList)) {
    calculationsView.cleanCalcBox(elementStrings.calcContainer);
  } else {
    // 5. Render all selected hotels
    calculationsView.renderHotelsDetails(state.calcList.hotels);
  }

  // 6. Update budget
  budgetCtrl.updateBudget();
};

//////////////////////////
// OTHER EXPENSE ///
/////////////////////////

// ADD OTHER EXPENSE
export const addOtherExpense = (other) => {
  if (!state.calcList) {
    // 2. Create Calculations object
    state.calcList = new Calculations();
  }

  // 3. Check if calcList is empty
  if (isEmpty(state.calcList)) {
    // 4. Render calcBox
    calculationsView.renderCalcBox();
  }

  // 6. Add other expense to calcList
  state.calcList.addOtherItem(other);
  displayNotification('success', 'Expense successfully added.');

  // 7. Add expense to BudgetList
  state.budgetList.addExpense(other.id, other.expense, other.price);

  // 8. Prepare UI for changes
  calculationsView.cleanCalcBox(elementStrings.itemOthers);

  // 9. Render expense on UI
  calculationsView.renderOtherExpensesDetails(state.calcList.others);

  // 10. Update budget
  budgetCtrl.updateBudget();
};

// DELETE EXPENSE

export const deleteOtherItem = (nrId) => {
  const id = nrId.slice(3);

  // 1. Delete expense from calcList
  state.calcList.deleteOtherItem(id);
  displayNotification('success', 'Expense successfully deleted.');

  // 2. Delete expense from budgetList
  state.budgetList.removeExpense(Number(id));

  // 3. Prepare UI for changes
  calculationsView.cleanCalcBox(elementStrings.itemOthers);

  // 4. Delete calcBox if calcList is empty
  if (isEmpty(state.calcList)) {
    calculationsView.cleanCalcBox(elementStrings.calcContainer);
  } else {
    // 5. Render all other expenses
    calculationsView.renderOtherExpensesDetails(state.calcList.others);
  }

  // 6. Update budget
  budgetCtrl.updateBudget();
};

//////////////////////////
// FOOD SPENDING ///
/////////////////////////

// ADD FOOD SPENDING
export const addFoodSpending = (food) => {
  if (!state.calcList) {
    // 2. Create Calculations object
    state.calcList = new Calculations();
  }

  // 3. Check if calcList is empty
  if (isEmpty(state.calcList)) {
    // 4. Render calcBox
    calculationsView.renderCalcBox();
  }

  // 6. Add food spending to calcList
  state.calcList.addFoodItem(food);
  displayNotification('success', 'Food spending successfully added.');

  // 7. Add food spending to BudgetList
  state.budgetList.addExpense(food.id, 'Food spending', food.price);

  // 8. Prepare UI for changes
  calculationsView.cleanCalcBox(elementStrings.itemFood);

  // 9. Render food spending on UI

  calculationsView.renderFoodSpendingDetails(state.calcList.food);

  // 10. Update budget
  budgetCtrl.updateBudget();
};

// DELETE FOOD SPENDING

export const deleteFoodItem = (nrId) => {
  const id = nrId.slice(3);

  // 1. Delete expense from calcList
  state.calcList.deleteFoodItem(id);
  displayNotification('success', 'Food spending successfully deleted.');

  // 2. Delete expense from budgetList
  state.budgetList.removeExpense(Number(id));

  // 3. Prepare UI for changes
  calculationsView.cleanCalcBox(elementStrings.itemFood);

  // 4. Delete calcBox if calcList is empty
  if (isEmpty(state.calcList)) {
    calculationsView.cleanCalcBox(elementStrings.calcContainer);
  } else {
    // 5. Render all other expenses
    calculationsView.renderFoodSpendingDetails(state.calcList.food);
  }

  // 6. Update budget
  budgetCtrl.updateBudget();
};

//////////////////////////
// CAR RENTAL ///
/////////////////////////

// ADD CAR RENTAL COST
export const addCarRentalCost = (car) => {
  if (!state.calcList) {
    // 2. Create Calculations object
    state.calcList = new Calculations();
  }

  // 3. Check if calcList is empty
  if (isEmpty(state.calcList)) {
    // 4. Render calcBox
    calculationsView.renderCalcBox();
  }

  // 6. Add car rental cost to calcList
  state.calcList.addCarItem(car);
  displayNotification('success', 'Car rental successfully added.');

  // 7. Add car rental cost to BudgetList
  const name = `${car.company} car rental`;
  state.budgetList.addExpense(car.id, name, car.price);

  // 8. Prepare UI for changes
  calculationsView.cleanCalcBox(elementStrings.itemCars);

  // 9. Render car spending on UI

  calculationsView.renderCarRentalCostDetails(state.calcList.cars);

  // 10. Update budget
  budgetCtrl.updateBudget();
};

// DELETE CAR RENTAL COST

export const deleteCarItem = (nrId) => {
  const id = nrId.slice(3);

  // 1. Delete rental cost from calcList
  state.calcList.deleteCarItem(id);
  displayNotification('success', 'Car rental successfully deleted.');

  // 2. Delete rental cost from budgetList
  state.budgetList.removeExpense(Number(id));

  // 3. Prepare UI for changes
  calculationsView.cleanCalcBox(elementStrings.itemCars);

  // 4. Delete calcBox if calcList is empty
  if (isEmpty(state.calcList)) {
    calculationsView.cleanCalcBox(elementStrings.calcContainer);
  } else {
    // 5. Render all other expenses
    calculationsView.renderCarRentalCostDetails(state.calcList.cars);
  }

  // 6. Update budget
  budgetCtrl.updateBudget();
};

///////////////////////
// COMMON ////////////
//////////////////////

// TOGGLE ITEM DETAILS ON TITLE CLICK

export const toggleDetails = (title) => {
  document.querySelector(`.${title}`).parentNode.nextElementSibling.classList.toggle('calculations__hidden');
  document.querySelector(`.${title}`).parentNode.nextElementSibling.classList.toggle('calculations__active');
};

// SUBMIT NOTE
export const submitNote = (nrId) => {
  // 1. Get input from textarea
  const note = calculationsView.getNote(nrId);

  if (note) {
    const noteElement = document.querySelector(`#${nrId} .note-txt`);

    // 2. Add note to the selected item in calcList
    const id = nrId.slice(3);
    const itemCls = noteElement.parentNode.parentNode.parentNode.classList;

    switch (true) {
      case itemCls.contains('flights-list'):
        const flight = state.calcList.flights[state.calcList.flights.findIndex((el) => el.id === id)];
        flight.note = note;
        state.calcList.persistData();
        break;
      case itemCls.contains('hotels-list'):
        const hotel = state.calcList.hotels[state.calcList.hotels.findIndex((el) => el.id === id)];
        hotel.note = note;
        state.calcList.persistData();
        break;
      case itemCls.contains('cars-list'):
        const car = state.calcList.cars[state.calcList.cars.findIndex((el) => el.id === id)];
        car.note = note;
        state.calcList.persistData();
        break;
      case itemCls.contains('food-list'):
        const food = state.calcList.food[state.calcList.food.findIndex((el) => el.id === id)];
        food.note = note;
        state.calcList.persistData();
        break;
      case itemCls.contains('others-list'):
        const other = state.calcList.others[state.calcList.others.findIndex((el) => el.id === id)];
        other.note = note;
        state.calcList.persistData();
        break;
    }

    // 3. Display note on UI
    calculationsView.submitNote(nrId, note);
  }
};

// DELETE NOTE
export const removeNote = (nrId) => {
  const noteElement = document.querySelector(`#${nrId} .calculations__note`);
  const itemCls = noteElement.parentNode.parentNode.parentNode.classList;
  const id = nrId.slice(3);

  // 1. Remove note from the selected flight in calcList

  switch (true) {
    case itemCls.contains('flights-list'):
      const flight = state.calcList.flights[state.calcList.flights.findIndex((el) => el.id === id)];
      flight.note = '';
      state.calcList.persistData();
      break;
    case itemCls.contains('hotels-list'):
      const hotel = state.calcList.hotels[state.calcList.hotels.findIndex((el) => el.id === id)];
      hotel.note = '';
      state.calcList.persistData();
      break;
    case itemCls.contains('cars-list'):
      const car = state.calcList.cars[state.calcList.cars.findIndex((el) => el.id === id)];
      car.note = '';
      state.calcList.persistData();
      break;
    case itemCls.contains('food-list'):
      const food = state.calcList.food[state.calcList.food.findIndex((el) => el.id === id)];
      food.note = '';
      state.calcList.persistData();
      break;
    case itemCls.contains('others-list'):
      const other = state.calcList.others[state.calcList.others.findIndex((el) => el.id === id)];
      other.note = '';
      state.calcList.persistData();
      break;
  }
  // 2. Display button to add note
  calculationsView.renderNoteBtn(nrId);
};
