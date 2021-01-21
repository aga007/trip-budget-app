import { displayNotification } from './views/base';

// FORM VALIDATION
export const validateForm = (inputId, list, value) => {
  // 1. Get input element
  const input = document.getElementById(inputId);
  // 2. Get the datalist
  const datalist = document.getElementById(list);
  // 3. If we find the input inside our list, we submit the form
  for (let el of datalist.children) {
    if (el.value == input.value) {
      return true;
    }
  }
  // 4. Otherwise we send error message
  let message = `Please select ${value} from the list`;
  displayNotification('error', message);
  //  alert(`Please select ${value} from the list`);
  return false;
};

export const checkIfPricePerPerson = () => {
  document.getElementById(`expense-per-person`).addEventListener('click', (e) => {
    document.getElementById('nr-of-people-group').classList.remove('hidden');
  });

  document.getElementById(`total-expense-cost`).addEventListener('click', (e) => {
    document.getElementById('nr-of-people-group').classList.add('hidden');
  });
};

export const checkSecondDate = () => {
  const tripStart = new Date(document.getElementById('tripStart').value);
  const tripEnd = new Date(document.getElementById('tripEnd').value);
  if (tripEnd < tripStart) {
    displayNotification('error', "Your travel can't end before it starts!");
    return false;
  } else if (tripEnd.getTime() === tripStart.getTime()) {
    displayNotification('error', 'Your travel has to be at least 2-days long!');
    return false;
  }
  return true;
};

export const validateExpenseForm = () => {
  const expPerPerson = document.getElementById('expense-per-person');
  const expTotal = document.getElementById('total-expense-cost');

  // 1. Check if the cost is per person
  if (expPerPerson.checked) {
    // 2. Ask for number of people
    if (document.getElementById('nr-of-people').value == '0') {
      displayNotification('error', 'Please select number of people');
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

export const getTodaysDate = () => {
  const date = new Date();
  let month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`;
  let day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
  const formatedDate = `${date.getFullYear()}-${month}-${day}`;
  return formatedDate;
};
