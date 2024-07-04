const baseUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false ';
const params = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 10,
  page: 1,
  sparkline: false
};

let data = [];

function fetchData() {
  fetch(`${baseUrl}?${new URLSearchParams(params)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(fetchedData => {
      data = fetchedData;
      renderData(data);
    })
    .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

function renderData(data) {
  const tbody = document.getElementById('coinTableBody');
  tbody.innerHTML = ''; // Clear existing data

  data.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${coin.name}</td>
      <td>${coin.symbol}</td>
      <td><img src="${coin.image}" alt="${coin.name}" width="20"></td>
      <td class="current_price">${coin.current_price}</td>
      <td class="market_cap">${coin.market_cap}</td>
      <td class="price_change">${coin.price_change_percentage_24h}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', fetchData);
