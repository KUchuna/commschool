const tableBody = document.querySelector('table tbody');
const personForm = document.getElementById('personForm');

let sortOrder = 1;

const removeElement = (id) => {
  const foundIndex = persons.findIndex((item) => item.id === id);
  if (foundIndex !== -1) {
    persons.splice(foundIndex, 1);
    drawTable(persons);
  }
};

const drawTable = (data) => {
  tableBody.innerHTML = '';
  data.forEach((person, index) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>${index + 1}</td>
      <td>${person.first_name}</td>
      <td>${person.last_name}</td>
      <td>${person.email}</td>
      <td>${person.gender}</td>
    `;
    const removeTd = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', () => removeElement(person.id));
    removeButton.innerHTML = 'remove';
    removeTd.appendChild(removeButton);
    tableRow.appendChild(removeTd);
    tableBody.appendChild(tableRow);
  });
};

personForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const gender = document.getElementById('gender').value;

  const newPerson = {
    id: persons.length ? persons[persons.length - 1].id + 1 : 1,
    first_name: firstName,
    last_name: lastName,
    email: email,
    gender: gender
  };

  persons.push(newPerson);
  drawTable(persons);
  personForm.reset();
});

const sortTable = (key) => {
  persons.sort((a, b) => {
    if (a[key] < b[key]) return -1 * sortOrder;
    if (a[key] > b[key]) return 1 * sortOrder;
    return 0;
  });
  sortOrder *= -1;
  drawTable(persons);
};


document.querySelectorAll('th[data-sort]').forEach(header => {
  header.addEventListener('click', () => {
    const key = header.getAttribute('data-sort');
    sortTable(key);
  });
});

drawTable(persons);
