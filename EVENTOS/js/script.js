let form = document.getElementById("formCEP");
let divDados = document.getElementById("dados");

form.addEventListener('submit', async (e) => {
e.preventDefault();
let cep = document.getElementById("CEP").value;

if (cep) {
const resultado = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

divDados.style.display = "block";
let dado1 = document.createElement('p');
dado1.textContent = `CEP: ${resultado.data.cep}`;
let dado2 = document.createElement('p');
dado2.textContent = `Logradouro: ${resultado.data.logradouro}`;
let dado3 = document.createElement('p');
dado3.textContent = `Complemento: ${resultado.data.complemento}`;
let dado4 = document.createElement('p');
dado4.textContent = `Bairro: ${resultado.data.bairro}`;

divDados.appendChild(dado1);
divDados.appendChild(dado2);
divDados.appendChild(dado3);
divDados.appendChild(dado4);
} else {
alert("Por favor, insira um CEP.");
}
});