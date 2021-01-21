const createCity = (el) => `<option value="${el.destinationId}">${el.name}</option>`;

export const showCities = (data, list) => {
  let markup = '';
  data.forEach((el) => (markup += createCity(el)));
  // Clear previous list
  document.getElementById(`${list}`).innerHTML = '';
  document.getElementById(`${list}`).insertAdjacentHTML('afterbegin', markup);
};
