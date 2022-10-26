const BTN = document.querySelector('#btn');
const search = document.querySelector('#search');
const form = document.querySelector('.form');
const dataList = document.querySelector('#pokemonsNames');
const URL = pokemon => `https://pokeapi.co/api/v2/pokemon/${pokemon}`

const CARD = document.querySelector('.card');
const PKS = document.querySelector('#pokemonSprite');
const PKN = document.querySelector('#pokemonName');
const PKT = document.querySelector('#pokemonType');
const PKI = document.querySelector('#pokemonId');
const pokemonNames = []

fetchPokemon(randomNumber());
loadDataList();


for (let i = 1; i <= 150; i++) {
    fetch(URL(i)).then(response => response.json()).then(response => pokemonNames.push(response.name.charAt(0).toUpperCase() + response.name.slice(1).toLowerCase()))
}

Promise.all(pokemonNames);

function loadDataList() {
    setTimeout(() => dataList.innerHTML = pokemonNames
    .map(names => `<option>${names}</option>`).join(''), 2000)
}

async function fetchPokemon(pokemon){
    const response = await fetch(URL(pokemon))
    const APIdata = await response.json();
    pokemonData(APIdata);
    return APIdata;
}

function pokemonData(APIdata){
    const types = APIdata.types.map(typeInfo => typeInfo.type.name).join(' | ');

    PKS.src = APIdata['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    PKN.textContent = APIdata.name
    PKI.textContent = APIdata.id
    PKT.textContent = types
    CARD.setAttribute('class',`card ${types}`)
}

function randomNumber() {
    return Math.round(Math.random() * 148 + 1);
}

BTN.onclick = () => {
    fetchPokemon(randomNumber());
}

form.addEventListener('submit', (e) => {

    e.preventDefault();
    fetchPokemon(search.value.toLowerCase());
    search.value = null;
});