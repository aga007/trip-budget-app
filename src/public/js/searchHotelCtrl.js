import CityCode from './models/CityCodeSearch';
import Hotels from './models/HotelSearch';
import * as cityCodeSearchView from './views/cityCodeSearchView';
import * as hotelSearchView from './views/hotelSearchView';
import { renderLoader, clearLoader, maxLogo, renderSearchBtns, clearResult, changeSearchTitle } from './views/searchView';
import { elements, displayNotification } from './views/base';
import { state } from './index';

////////////////////
// HOTEL SEARCH //
////////////////////

export const controlHotelSearch = async () => {
  // 1) Get query from view
  const query = hotelSearchView.getHotelInput();

  if (query) {
    // 2) New search object and add it to state
    state.foundHotels = new Hotels(query);

    // 3) Prepare UI for results
    clearResult();
    renderLoader(elements.searchBox);

    try {
      // 4) Search hotels
      await state.foundHotels.searchHotels();

      // 5) Create an object with all the hotels details
      state.foundHotels.getDetails();
      state.hotelsArr = state.foundHotels.hotelsArr;

      // 6) Check if there are hotels
      if (state.hotelsArr.length > 0) {
        // 7) Render results on UI
        clearLoader();
        hotelSearchView.renderHotels(state.foundHotels);
      } else {
        displayNotification('error', 'There are no hotels matching your query :( Please try again.');
        clearLoader();
        maxLogo();
        changeSearchTitle('Search');
        renderSearchBtns();
      }
    } catch (err) {
      console.log(err);
      displayNotification('error', 'Something went wrong.. Please try again in few minutes.');
      clearLoader();
      maxLogo();
      changeSearchTitle('Search');
      renderSearchBtns();
    }
  }
};

export const getCityCodesList = (inputId) => {
  // 1. Get input
  let input = document.getElementById(`${inputId}`);

  let timeout = null;

  // 2. Listen for keystroke events
  input.addEventListener('keyup', (e) => {
    // 3. Prevent task from executing if less than 1000ms
    clearTimeout(timeout);

    // 4. Make a new timeout set to go off in 1000ms (1 second)
    timeout = setTimeout(async () => {
      try {
        // 5. Create CityCode object and find cities
        let city = new CityCode(input.value);
        await city.findCityCode();

        // 6. Display list of cities
        let suggestions = city.result.suggestions;
        let cityCodesList = suggestions[suggestions.findIndex((el) => el.group === 'CITY_GROUP')].entities;

        cityCodeSearchView.showCities(cityCodesList, 'destinationCity');
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  });
};
