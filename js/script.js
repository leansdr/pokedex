//Selecionando os elemento do HTML
const containerPokemon = document.querySelector("#container");
const listTypePokemon = document.createElement("ul");
const sectionGift = document.querySelector(".section-gift");
const quantidade_pokemons = 649;

console.log(sectionGift);

//Pegando os Pokemons
const pegarPokemon = () => {
  const arrayPokemon = [];
  const baseURL = `https://pokeapi.co/api/v2/pokemon/`;
  for (let i = 1; i <= quantidade_pokemons; i++) {
    const api = baseURL + i;
    arrayPokemon.push(fetch(api).then((resp) => resp.json()));
  }
  Promise.all(arrayPokemon).then((results) => {
    const pokemons = results.map((data) => ({
      number: data.id,
      img: data.sprites.other.dream_world.front_default,
      name: data.name,
      tipos: data.types,
      habilidades: data.abilities,
      altura: data.height,
      peso: data.weight,
    }));
    listarPokemon(pokemons);
  });
};

//Pegando os tipos de Pokemon
const pegarTiposPokemons = async () => {
  const baseURLTipos = `https://pokeapi.co/api/v2/type/`;
  const tipos = await fetch(baseURLTipos);
  const resp = await tipos.json();
  listarTiposPokemons(resp);
};

const listarTiposPokemons = (resp) => {
  resp.results.map((tipo) => {
    const itemTypePokemon = document.createElement("li");
    const linkTypePokemon = document.createElement("a");
    linkTypePokemon.setAttribute("href", "#");
    itemTypePokemon.classList.add("selected-tipo", `selected-${tipo.name}`);
    listTypePokemon.classList.add("list-type-container");
    const nameType = document.createTextNode(`${tipo.name}`);
    linkTypePokemon.appendChild(nameType);
    itemTypePokemon.appendChild(linkTypePokemon);
    listTypePokemon.appendChild(itemTypePokemon);
  });
  document.querySelector("nav").appendChild(listTypePokemon);
};

//Listando as informações no Front End
const listarPokemon = (pokemons) => {
  pokemons.forEach((pokemon) => {
    const card = `<li class="card bg-card-${
      pokemon.tipos[0].type.name === "normal" && pokemon.tipos.length > 1
        ? pokemon.tipos[1].type.name
        : pokemon.tipos[0].type.name
    }"onClick=mostrar()>
          <div id="info">
            <span class="numero">#${
              pokemon.number < 10 ? "00" + pokemon.number : "0" + pokemon.number
            }</span>
            <p class="nome text-shadow-${pokemon.tipos[0].type.name}">${
      pokemon.name
    }</p>
            <div class=container-tipo>
                   ${pokemon.tipos
                     .map(
                       (tipo) =>
                         `<span class="tipo btn-${tipo.type.name}">
                        <img class="icon-type" src="./img/types/${tipo.type.name}.svg"/>${tipo.type.name}</span>`
                     )
                     .toString()
                     .replace(",", "")}
              </div>
         </div>
            <img id="imagem" src=${pokemon.img} />
        </li>`;
    containerPokemon.innerHTML += card;
  });
};

const removeGift = () => {
  sectionGift.classList.add("hide");
};

setTimeout(removeGift, 8000);

function mostrar() {
  const overlay = document.querySelector("#overlay");
  overlay.classList.toggle("hide");
}

const btnCloseOverlay = document.querySelector("#btn-close");
btnCloseOverlay.addEventListener("click", () => {
  overlay.classList.toggle("hide");
});

const selectedTipo = document.querySelector(".selected-tipo");
console.log(selectedTipo);

document.addEventListener("load", pegarPokemon(), pegarTiposPokemons());
