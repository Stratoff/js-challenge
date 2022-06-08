const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
const LIMIT = 10;

window.addEventListener("beforeunload", function(e){
  this.localStorage.clear()
}, false);

const handleOffset = () => {
  const pagination = localStorage.getItem("pagination") ? parseInt(localStorage.getItem("pagination")) + LIMIT : 5;
  if (pagination <= 195) {
    localStorage.setItem("pagination", pagination);
  }
  return pagination;
}

const getData = async api => {

  if (pagination <= 200) {
    try {
      const pagination = handleOffset();
      const resp = await fetch(api + `/?limit=${LIMIT}&offset=${pagination}`);
      const products = await resp.json();
      const output = await products.map(product => `
        <article class="Card">
          <img src="${product.images[0]}" alt="${product.title}" />
          <h2>
            ${product.title}
            <small>$ ${product.price}</small>
          </h2>
        </article>
      `);
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      output.forEach(product => {
        newItem.innerHTML += product;
      });
      $app.appendChild(newItem);
    } catch (err) {
      console.log(err)
    }
  } else {
    const msgNoMoreProducts = document.createElement('section');
    msgNoMoreProducts.innerHTML = "<h3 style='text-align:center;'>Todos los productos Obtenidos</h3>";
    document.getElementsByClassName("Main")[0].appendChild(msgNoMoreProducts);
    intersectionObserver.unobserve($observe);
    $observe.remove();
  }
  
}

const loadData = async () => {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) loadData();
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
