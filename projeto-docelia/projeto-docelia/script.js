
/* MENU MOBILE */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  }
});


/* FILTROS E BUSCA DOS PRODUTOS */

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("product-search");
const noResults = document.getElementById("no-results");

let selectedCategory = "todos";

function filterProducts() {
  const searchTerm = searchInput.value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let visibleProducts = 0;

  productCards.forEach((card) => {
    const category = card.dataset.category;

    const productName = card.querySelector("h3").textContent
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const productDescription = card.querySelector("p").textContent
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const matchesCategory =
      selectedCategory === "todos" ||
      category === selectedCategory;

    const matchesSearch =
      productName.includes(searchTerm) ||
      productDescription.includes(searchTerm);

    if (matchesCategory && matchesSearch) {
      card.style.display = "";
      visibleProducts++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = visibleProducts === 0 ? "block" : "none";
}


/* CLIQUE NOS FILTROS */

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedCategory = button.dataset.category;

    filterProducts();
  });
});


/* CAMPO DE PESQUISA */

searchInput.addEventListener("input", filterProducts);


/* ANO AUTOMÁTICO NO RODAPÉ */

document.getElementById("year").textContent =
  new Date().getFullYear();
