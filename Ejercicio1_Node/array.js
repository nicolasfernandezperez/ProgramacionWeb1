let products = [
    {nombre: "PC-Gaming" ,marca: "Asus",precio: 1200},
    {nombre: "Tablet",marca: "Samsung" ,precio: 300},
    {nombre: "Cámara-Reflex" ,marca: "Canon",precio: 650}
]

function getProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(products);
        }, 3000);
    });
}

getProducts().then((products) => {
    console.log("Productos obtenidos con .then():", products);
});

async function fetchProducts() {
    const products = await getProducts();
    console.log("Productos obtenidos con await:", products);
}
  
fetchProducts(); // Llamamos a la función para ejecutarla
  
  

  