document.addEventListener('DOMContentLoaded', function()
{
    const myMarket = {};

    function Item(product, price, categoria)
    {
        this.product = product;
        this.price = price;
        this.categoria = categoria;
        this.hash = gerarHash(product, price);
    }
    function gerarHash(price, categoria) {
        let hash = 0;
        for (let i = 0; i < price.length; i++) {
            hash = (hash << 5) - hash + price.charCodeAt(i);
            hash |= 0;
        }
        for (let i = 0; i < categoria.length; i++) {
            hash = (hash << 5) - hash + categoria.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    }

    function addItemToMarket(item)
    {
        let indice = item.hash % Object.keys(myMarket).length;
        let tentativa = 1;
        while (myMarket[indice])
        { // Enquanto houver colisão
            indice = (item.hash + tentativa * tentativa) % Object.keys(myMarket).length;
            tentativa++;
        }
        myMarket[indice] = item;
    }
    
    function removeItem(hash) {
        let indice = hash % Object.keys(myMarket).length; 
        let tentativa = 1;
        while (myMarket[indice] && myMarket[indice].hash !== hash)
        { 
            indice = (hash + tentativa * tentativa) % Object.keys(myMarket).length; //prox índice por sondagem quadrática
            tentativa++;
        }
        if (myMarket[indice] && myMarket[indice].hash === hash) {
            delete myMarket[indice];
        }
        displayItems();
    }

    function displayItems()
    {
        console.log("Mostrando os itens");
        const container = document.getElementById('allcards');
        container.innerHTML = '';

        for (let hash in myMarket) { 
            const item = myMarket[hash];
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${item.product}</h3>
                <p>${item.price}</p>
                <p>${item.categoria}</p>
                <p>${item.hash}</p>
                <button class="remover" data-hash="${item.hash}">Remover</button> 
            `;
            container.appendChild(card);
        }

        const removeButtons = document.querySelectorAll('.remover');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const hash = event.target.getAttribute('data-hash');
                removeItem(hash); 
            });
        });
    }

    function removeItem(hash)
    {
        delete myMarket[hash]; 
        displayItems(); 
    }

    document.getElementById('formulario').addEventListener('submit', function(event)
    {
        event.preventDefault(); 

        const product = document.getElementById('product').value;
        const price = document.getElementById('price').value;
        const categoria = document.getElementById('categoria').value;

        const newItem = new Item(product, price, categoria);

        addItemToMarket(newItem);
        displayItems();
        document.getElementById('formulario').reset();
    });

    function ordenarPorPrecoBubbleSort()
    {
        let trocado;
        do
        {
            trocado = false;
            for (let i = 0; i < Object.keys(myMarket).length - 1; i++)
            {
                const hash1 = Object.keys(myMarket)[i];
                const hash2 = Object.keys(myMarket)[i + 1];
                const item1 = myMarket[hash1];
                const item2 = myMarket[hash2];
                if (item1.price > item2.price)
                {
                    myMarket[hash1] = item2;
                    myMarket[hash2] = item1;
                    trocado = true;
                }
            }
        } while (trocado);
        displayItems();
    }
    
    function ordenarPorNomeInsertionSort()
    {
        const hashes = Object.keys(myMarket);
        for (let i = 1; i < hashes.length; i++)
        {
            const itemAtual = myMarket[hashes[i]];
            let j = i - 1;
            while (j >= 0 && myMarket[hashes[j]].product.localeCompare(itemAtual.product) > 0)
            {
                myMarket[hashes[j + 1]] = myMarket[hashes[j]];
                j--;
            }
            myMarket[hashes[j + 1]] = itemAtual;
        }
        displayItems();
    }
    
    const botaoPreco = document.getElementById('ordenar-preco');
    const botaoNome = document.getElementById('ordenar-nome');
    const botaoCategoria = document.getElementById('ordenar-categoria')
    
    botaoPreco.addEventListener('click', function () {
        ordenarPorPrecoBubbleSort();
    });
    botaoNome.addEventListener('click', function () {
        ordenarPorNomeInsertionSort();
    });
    botaoCategoria.addEventListener('click', function () {
        ordenarPorCategoria();
    });
    
    const alvejante = new Item('Alvejante', 10.99 , 'Limpezas');
    addItemToMarket(alvejante);

    const iogurte = new Item('Iogurte', 3.99, 'Alimentos');
    addItemToMarket(iogurte);

    const alface = new Item('Alface', 6.99, 'Alimentos');
    addItemToMarket(alface);

    const vassoura = new Item('Vassoura', 34.99, 'Limpezas');
    addItemToMarket(vassoura);

    const cabide = new Item('Cabide', 5.99, 'Utilidades');
    addItemToMarket(cabide);

    const shampoo = new Item('Shampoo', 15.99, 'Higiene');
    addItemToMarket(shampoo);

    const condicionador = new Item('Condicionador', 18.99, 'Higiene');
    addItemToMarket(condicionador);

    const pastaDeDente = new Item('Pasta de Dente', 8.99, 'Higiene');
    addItemToMarket(pastaDeDente);

    const escovaDeDente = new Item('Escova de Dente', 12.99, 'Higiene');
    addItemToMarket(escovaDeDente);

    const sabonete = new Item('Sabonete', 3.49, 'Higiene');
    addItemToMarket(sabonete);

    const arroz = new Item('Arroz', 25.99, 'Alimentos');
    addItemToMarket(arroz);

    const feijao = new Item('Feijão', 12.49, 'Alimentos');
    addItemToMarket(feijao);

    const macarrao = new Item('Macarrão', 5.99, 'Alimentos');
    addItemToMarket(macarrao);

    const molhoDeTomate = new Item('Molho de Tomate', 4.99, 'Alimentos');
    addItemToMarket(molhoDeTomate);

    const azeite = new Item('Azeite', 28.99, 'Alimentos');
    addItemToMarket(azeite);

    const sal = new Item('Sal', 3.99, 'Alimentos');
    addItemToMarket(sal);

    const acucar = new Item('Açúcar', 8.99, 'Alimentos');
    addItemToMarket(acucar);

    const cafe = new Item('Café', 15.99, 'Alimentos');
    addItemToMarket(cafe);

    const cha = new Item('Chá', 10.99, 'Alimentos');
    addItemToMarket(cha);

    const leite = new Item('Leite', 6.99, 'Alimentos');
    addItemToMarket(leite);

    const manteiga = new Item('Manteiga', 12.99, 'Alimentos');
    addItemToMarket(manteiga);

    const ovos = new Item('Ovos', 18.99, 'Alimentos');
    addItemToMarket(ovos);

    const frango = new Item('Frango', 25.99, 'Alimentos');
    addItemToMarket(frango);

    const carne = new Item('Carne', 45.99, 'Alimentos');
    addItemToMarket(carne);

    const peixe = new Item('Peixe', 32.99, 'Alimentos');
    addItemToMarket(peixe);

    const batata = new Item('Batata', 10.99, 'Alimentos');
    addItemToMarket(batata);

    const cebola = new Item('Cebola', 8.99, 'Alimentos');
    addItemToMarket(cebola);

    const tomate = new Item('Tomate', 12.99, 'Alimentos');
    addItemToMarket(tomate);

    const banana = new Item('Banana', 7.99, 'Alimentos');
    addItemToMarket(banana);

    const maca = new Item('Maçã', 9.99, 'Alimentos');
    addItemToMarket(maca);

    displayItems();
});