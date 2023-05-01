const salvas = localStorage.getItem('colorPalette');
// pega as cores salvas ao recarregar a pagina

const quadrados = [
  document.getElementById('p2'),
  document.getElementById('p3'),
  document.getElementById('p4'),
];

if (salvas) { // o localstorage só salva string, ent smp lembrar de converter
  const cores = JSON.parse(salvas); // converte string p obj
  for (let i = 0; i < quadrados.length; i += 1) {
    quadrados[i].style.backgroundColor = cores[i];
  }
}

// gera cores aleatória
function gerarCorAleatoria() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

document.getElementById('button-random-color').addEventListener('click', () => {
  const cores = [];

  for (let i = 0; i < quadrados.length; i += 1) {
    const cor = gerarCorAleatoria();
    quadrados[i].style.backgroundColor = cor;
    cores.push(cor);
  }

  localStorage.setItem('colorPalette', JSON.stringify(cores));
});

// //////////////////////////////////////////////////////////////////////////////////////////////////

const cores = document.querySelectorAll('.color'); // paleta

const selecionarCor = (event) => {
  cores.forEach((cor) => {
    cor.classList.remove('selected'); // remove a classe "selected" de todos
  });

  event.target.classList.add('selected');
};

cores.forEach((cor) => {
  cor.addEventListener('click', selecionarCor);
});

// pinta um pixel com a cor selecionada
// const pintarPixel = (event) => {
//   const corSelecionada = document.querySelector('.selected');
//   // eslint-disable-next-line no-param-reassign
//   event.target.style.backgroundColor = corSelecionada.style.backgroundColor;
//   saveDrawing();
// };

// //////////////////////////////////////////////////////////////////////////////////////////////////

// const board = document.querySelector('#pixel-board');

// const pixelado = (quantidade) => {
//   board.innerHTML = ''; // limpa o elemento

//   for (let i = 0; i < quantidade; i += 1) {
//     const ulElement = document.createElement('ul');
//     board.appendChild(ulElement);

//     for (let j = 0; j < quantidade; j += 1) {
//       const liElement = document.createElement('li');

//       liElement.classList.add('pixel'); // add clase pixel
//       ulElement.appendChild(liElement);

//       // add o evento de clique ao novo pixel
//       liElement.addEventListener('click', pintarPixel);
//     }
//   }
// };

// pixelado(5);

// ///////////////////////////////////////////////////

// const pintarPixel = (event) => {
//   const corSelecionada = document.querySelector('.selected');
//   event.target.style.backgroundColor = corSelecionada.style.backgroundColor;
// };

// const board = document.querySelector('#pixel-board');

// const criarQuadro = (tamanho) => {
//   // Limpa o quadro anterior
//   board.innerHTML = '';

//   for (let i = 0; i < tamanho; i += 1) {
//     const linha = document.createElement('div');
//     linha.classList.add('linha');
//     board.appendChild(linha);

//     for (let j = 0; j < tamanho; j += 1) {
//       const coluna = document.createElement('div');
//       coluna.classList.add('pixel');
//       linha.appendChild(coluna);
//       coluna.addEventListener('click', pintarPixel);
//     }
//   }
// };

// criarQuadro(5);

// ///////////////////////////////////////////////////////////

const clearButton = document.getElementById('clear-board');

clearButton.addEventListener('click', () => {
  const pixels = document.querySelectorAll('li');
  // eslint-disable-next-line no-restricted-syntax
  for (const pixel of pixels) {
    pixel.style.backgroundColor = 'rgb(255, 255, 255)'; // white
  }
});

// ///////////////////////////////////////////////////////////
// requisito infernal 12

const pixelBoard = () => {
  const pixels = document.querySelectorAll('.pixel');
  const colors = [];
  for (let i = 0; i < pixels.length; i += 1) {
    colors.push(pixels[i].style.backgroundColor);
  }

  const jsonColors = JSON.stringify(colors);
  localStorage.setItem('pixelBoard', jsonColors);
};

const loadDrawing = () => {
  const jsonColors = localStorage.getItem('pixelBoard');
  if (!jsonColors) return; // se nao tiver nada em jsonColors, retorna a função
  const colors = JSON.parse(jsonColors);
  const pixels = document.querySelectorAll('.pixel');

  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = colors[i];
  }
};

const pintarPixel = (event) => {
  const corSelecionada = document.querySelector('.selected');
  // eslint-disable-next-line no-param-reassign
  event.target.style.backgroundColor = corSelecionada.style.backgroundColor;
  pixelBoard();
};

const board = document.querySelector('#pixel-board');

const pixelado = (quantidade) => {
  board.innerHTML = ''; // limpa o elemento

  for (let i = 0; i < quantidade; i += 1) {
    const ulElement = document.createElement('ul');
    board.appendChild(ulElement);

    for (let j = 0; j < quantidade; j += 1) {
      const liElement = document.createElement('li');

      liElement.classList.add('pixel'); // dd clse pixel
      ulElement.appendChild(liElement);

      // add o evento de clique ao novo pixel
      liElement.addEventListener('click', pintarPixel);
    }
  } const teste = document.querySelectorAll('.pixel');
  console.log(teste.length);
};

pixelado(5);
window.addEventListener('load', loadDrawing);

// ///////////////////////////////////////////////////////////

// requisito 13
const generateBoardButton = document.querySelector('#generate-board');

// eslint-disable-next-line max-lines-per-function, complexity, sonarjs/cognitive-complexity
generateBoardButton.addEventListener('click', () => {
  const boardSize = document.querySelector('#board-size').value;
  localStorage.setItem('boardSize', boardSize);

  if (!boardSize || boardSize <= 0) {
    alert('Board inválido!');
    return;
  } if (boardSize > 50) {
    alert('Board inválido!');
  }

  // eslint-disable-next-line no-nested-ternary, max-len
  const size = boardSize > 50 ? 50 : boardSize < 5 ? 5 : boardSize;
  pixelado(size); // gera novo quadro

  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel) => {
    pixel.addEventListener('click', pintarPixel);
  });

  const quadradinhos = document.querySelectorAll('.color');
  for (let i = 0; i < quadradinhos.length; i += 1) {
    quadradinhos[i].addEventListener('click', selecionarCor);
  }
});

// função que será chamada após a página ser carregada
function onLoad() {
  const boardSize = localStorage.getItem('boardSize');

  document.querySelector('#board-size').value = boardSize;

  // chama a função de gerar quadro após a página dar reload
  generateBoardButton.click();
  loadDrawing();
}

// Registra o evento "load" da janela para chamar a função "onLoad" após a página ser carregada
window.addEventListener('load', onLoad);
