import { elements, elementStrings } from './base';

export const renderLoader = (parent) => {
  const loader = ` <div class=${elementStrings.loader}>
                        <i class="fas fa-umbrella-beach loader__icon"></i>
                        <p class="loader__txt">We're searching best offers..</p>   
                    </div>`;

  parent.insertAdjacentHTML('beforeend', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};

export const minLogo = () => {
  elements.logo.classList.add(`${elementStrings.smallLogo}`);
};

export const maxLogo = () => {
  elements.logo.classList.remove(`${elementStrings.smallLogo}`);
};

export const clearResult = () => {
  elements.reqBox.innerHTML = '';
};

export const clearPagination = () => {
  elements.paginationBox.innerHTML = '';
};

export const changeSearchTitle = (txt) => {
  elements.searchTitle.innerHTML = `${txt}`;
};

export const renderSearchBtns = () => {
  const markup = `<div class="search__button">
                    <button class="search-flight btn btn__big">Your flights </button>
                    </div>
                    <div class="search__button">
                        <button class="search-hotel btn btn__big">Your hotel</button>
                    </div>
                    <div class="search__button">
                        <button class="search-car btn btn__big">Your car</button>
                    </div>`;
  elements.reqBox.insertAdjacentHTML('afterbegin', markup);
};

export const renderNewExpenseBtn = () => {
  const markup = `<div class="search__button">
                    <button class="add-other-expense btn btn__big btn--red">Add other expense </button>
                    </div>
                    <div class="search__button">
                        <button class="show-steps btn btn__big">Search steps</button>
                    </div>`;
  elements.reqBox.insertAdjacentHTML('afterbegin', markup);
};

// type 'previous' or 'next'
const createButton = (page, type, searchType) =>
  `<div class="btn btn__small btn--red-white ${searchType} btn--${type}" data-goto="${type === 'previous' ? page - 1 : page + 1}"> ${
    type === 'previous' ? '<i class="fas fa-angle-left search__icon"></i>' : ''
  } Page ${type === 'previous' ? page - 1 : page + 1} ${type === 'next' ? '<i class="fas fa-angle-right search__icon"></i>' : ''}</div>`;

export const renderButtons = (page, numResults, resPerPage, searchType) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && pages <= 1) {
    // no buttons
    button = '';
  } else if (page === 1 && pages > 1) {
    // only next page button
    button = createButton(page, 'next', searchType);
  } else if (page < pages) {
    // both buttons
    button = `
    ${createButton(page, 'previous', searchType)}
    ${createButton(page, 'next', searchType)}
    `;
  } else if (page === pages && pages > 1) {
    // only previous button
    button = createButton(page, 'previous', searchType);
  }

  let markup = `
  <div class="search__pagination">
  ${button}
  </div>
  <div class="search__button">
    <button class="search-flight btn btn__big btn--red">New search</button>
  </div>`;

  elements.paginationBox.insertAdjacentHTML('beforeend', markup);
};

export const validateOtherExpenseForm = () => {
  const expPerPerson = document.getElementById('expense-per-person');
  const expTotal = document.getElementById('total-expense-cost');

  // 1. Check if the cost is per person
  if (expPerPerson.checked) {
    // 2. Ask for number of people
    if (document.getElementById('nr-of-people').value == '0') {
      displayNotification('error', `Please select number of people`);
      return false;
    }
    return true;
  } else if (expTotal.checked) {
    return true;
  } else {
    displayNotification('error', `Please select type of expense`);
    return false;
  }
};
