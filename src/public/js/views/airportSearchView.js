const createAirport = (el) => `<option value="${el.code}">${el.name}</option>`;

export const showAirports = (data, list) => {
  let markup = '';
  data.forEach((el) => (markup += createAirport(el)));
  document.getElementById(`${list}`).insertAdjacentHTML('afterbegin', markup);
};
