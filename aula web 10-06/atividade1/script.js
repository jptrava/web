const formulario = document.getElementById("formulario");

async function buscar(event) {
  if (event && typeof event.preventDefault === 'function') {
    event.preventDefault();
  }

  const titulo = document.getElementById("textoUsuario").value;
  const tituloFormatado = titulo.replace(/ /g, "+");

  try {
    const resposta = await axios.get(`https://api.tvmaze.com/search/shows?q=${tituloFormatado}`);
    const dadosFilmes = resposta.data;

    const divFilme = document.getElementById("filme");
    divFilme.innerHTML = '';

    dadosFilmes.forEach(item => {
      const tituloFilme = document.createElement('h2');
      const scoreFilme = document.createElement('p');
      const capaFilme = document.createElement('img');

      tituloFilme.textContent = item.show.name;
      scoreFilme.textContent = `Score: ${item.score}`;

      if (item.show.image && item.show.image.medium) {
        capaFilme.src = item.show.image.medium;
        capaFilme.alt = `Capa do filme ${item.show.name}`;
      } else {
        capaFilme.src = 'imagens/joão.jpg';
        capaFilme.alt = 'Imagem não disponível';
      }

      divFilme.appendChild(tituloFilme);
      divFilme.appendChild(scoreFilme);
      divFilme.appendChild(capaFilme);
    });
  } catch (erro) {
    console.error("Erro ao buscar filmes:", erro);
    const divFilme = document.getElementById("filme");
    divFilme.innerHTML = '<p>Ocorreu um erro ao buscar os filmes. Tente novamente.</p>';
  }
}

formulario.addEventListener("submit", buscar);

document.body.addEventListener("keydown", function(event) {

    buscar();

});