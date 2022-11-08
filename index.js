/*
Creio que na verdade, a gente vai precisar de uma variavel que tem o endereco
do container da tabela, a gente adiciona um event listener no container,
quando o usuario clicar em um elemento dessa tabela
a gente verifica se o elemento em questao é a imagem de editar ou a imagem
de apagar, essa imagem tem que ter um id, de preferencia associado ao indice
do elemento em questão, então sabendo o id dessa imagem
chamar uma fucnao que apague o elemento ou edite o elemento,
reenumere o indice dos elementos restantes, e mostre na tela a tabela atualziada

*/
/*
document.querySelector("container").addEventListener("click", (event) => {
	console.log(event.target.parentNode.childNodes[1].textContent);
});
*/

console.log("Start!");

//VARIAVEIS e CONSTANTES GLOBAIS - DESCRICAO:
let listaDeProdutos = [];
// cada elemento de produto será um objeto no formato:
//{id:"",nome:"",descricao:"",valor:"","incluidoEm"}

let indiceElement = -1;
let countId = 0;
//contador que corresponde ao id
//sempre incrementa de 1 em 1, garantindo a unicidade
//de cada identificador
const botaoIncluirProduto = document.querySelector("#incluirBotao");
const botaoListarProdutos = document.querySelector("#listarBotao");

const inputNome = document.querySelector("#inputNomeProduto");
const inputDescricao = document.querySelector("#inputDescricaoProduto");
const inputValor = document.querySelector("#inputValorProduto");

const botaoConfirmaEdicao = document.querySelector("#atualizarBotao"); //
//esse botao comeca invisivel e so fica visivel se o usuario clicou na imagem da tabela que
//faz referencia a edicao
const botaoCancelaEdicao = document.querySelector("#cancelarBotao");
//esse botao comeca invisivel e so fica visivel se o usuario clicou na imagem da tabela que
//faz referencia a edicao

const containerTabela = document.querySelector(".lista-produtos");
// se dentro do elemento de tabela o usuario clicar na imagem de editar ou na imagem de apagar
// deve mostrar
const dadosDoProdutoClicado = document.querySelector("#produto-clicado");
const mensagemErro = document.querySelector("#mensagem-erro");
let produtoApagado = {};
//armazena as informações do produto que será/foi apagado
let produtoEditado = {};
//armazena as informações do produto que será/foi editado

//FUNCÕES
//colocar try catch
botaoIncluirProduto.addEventListener("click", () => {
	try {
		produtoEhValido();
		adicionaProdutoNoArray();
	} catch (error) {
		console.log("Mensagem de erro");
		mensagemErro.innerHTML = `Falha no cadastro do produto! ${error}`;
		mensagemErro.style.visibility = "visible";
		mensagemErro.style.color = "red";
		//mensagemErro.setAttribute("display", "visible");
	}
});
//verificar produto e emitir mensagem de falha se não for válido
function produtoEhValido() {
	mensagemErro.innerHTML = "";
	if (inputNome.value === "") {
		throw "[Erro] Nome está vazio!";
	}
	if (inputDescricao.value === "") {
		throw "[Erro] Descrição está vazia!";
	}
	if (inputValor.value === "") {
		throw "[Erro] Valor está vazio!";
	}
}

//adicionar produto no array
//pode ter dentro dela varias funcoes que adiciona cada elemento
function adicionaProdutoNoArray() {
	let produto = {};
	countId = countId + 1;
	//{id:"",nome:"",descricao:"",valor:"","incluidoEm"}
	produto.id = countId;
	produto.nome = inputNome.value;
	produto.descricao = inputDescricao.value;
	produto.valor = inputValor.value;
	const currentDate = new Date();
	produto.incluidoEm = currentDate.toISOString();
	listaDeProdutos.push(produto);
	mensagemErro.innerHTML = `Produto ${produto.nome} incluído com sucesso!`;
	mensagemErro.style.visibility = "visible";
	mensagemErro.style.color = "green";
	//mensagemErro.setAttribute("visibility", "visible");
}

botaoListarProdutos.addEventListener("click", () => {
	mostraProdutos();
});

// se o usuario clicou no botao que e´o mesmo para adicionar produto e editar
// verifica se esta na situação de editar, faz a alteracao e mostra a tabela atualizada
botaoConfirmaEdicao.addEventListener("click", () => {
	editaProduto();
	escondeBotaoComId(botaoConfirmaEdicao);
	escondeBotaoComId(botaoCancelaEdicao);
	mostraBotaoComId(botaoIncluirProduto);
	mostraBotaoComId(botaoListarProdutos);
	mostraProdutos();
});

botaoCancelaEdicao.addEventListener("click", () => {
	escondeBotaoComId(botaoConfirmaEdicao);
	escondeBotaoComId(botaoCancelaEdicao);
	mostraBotaoComId(botaoIncluirProduto);
	mostraBotaoComId(botaoListarProdutos);
	//mostraProdutos();
});

/*NOVA ABORDAGEM CONTAINER TABELA!!!!!!!!!!!!*/

containerTabela.addEventListener("click", (event) => {
	const element = event.target.parentNode;

	if (element.classList.contains("editar-produto")) {
		console.log("clicou no botao editar!!!");
		//console.log(element.parentNode);
		const idElement = parseInt(element.parentNode.childNodes[1].textContent);
		indiceElement = achaIndiceDoProduto(idElement);
		produtoEditado = listaDeProdutos[indiceElement];
		mostraDadosDoProduto(produtoEditado);
		//console.log(element.parentNode.childNodes[1].textContent);
		//escondeBotaoComId(botaoIncluirProduto);
		//escondeBotaoComId(botaoListarProdutos);
		//mostraBotaoComId(botaoConfirmaEdicao);
		//mostraBotaoComId(botaoCancelaEdicao);
	} else if (element.classList.contains("apagar-produto")) {
		console.log("clicou no botao apagar!!!");
		//console.log(element.parentNode);
		//console.log(element.parentNode.childNodes[1].textContent);
		const idElement = parseInt(element.parentNode.childNodes[1].textContent);
		apagaProduto(idElement);
		mostraProdutos();
	} else if (element.childNodes[3].classList.contains("nome-produto")) {
		console.log("Mostra produto!!");
		const idElement = parseInt(element.childNodes[1].textContent);
		console.log("O ID DESSE ELEMENTO EH:", idElement);
		indiceElement = achaIndiceDoProduto(idElement);
		mostraProdutoSelecionado(indiceElement);
	}
	/*
	if (event.target == "ImagemDeEditar") {
		//pegue ID ou class desse target
		// edite o elemento
		//armazena na variavel global produtoEditado;
		armazenaTargetNaVariavel(event.target, produtoEditado);
		escondeBotaoComId(botaoIncluirProduto);
		escondeBotaoComId(botaoListarProdutos);
		mostraBotaoComId(botaoConfirmaEdicao);
		mostraBotaoComId(botaoCancelaEdicao);
	} else if (event.target == "ImagemDeApagar") {
		//pegue ID ou class desse target
		// apague o elemento
		//armazena na variavel global produtoApagado;
		armazenaTargetNaVariavel(event.target, produtoApagado);
		apagaProduto();
	}*/
});

const tabelaDeProdutos = document.querySelector(".tabela-produtos");

function mostraProdutos() {
	tabelaDeProdutos.innerHTML = `
	<tr class="linha-tabela table-heading">
						<td class="id-produto">ID</td>
						<td class="nome-produto">Produto</td>
						<td class="valor-produto">Valor</td>
						<td class="editar-produto">Editar</td>
						<td class="apagar-produto">Apagar</td>
					</tr>
					`;

	let indice = 0;
	while (indice < listaDeProdutos.length) {
		const tr = document.createElement("tr");
		tr.innerHTML = `
						<td class="id-produto">${listaDeProdutos[indice].id}</td>
						<td class="nome-produto">${listaDeProdutos[indice].nome}</td>
						<td class="valor-produto">${listaDeProdutos[indice].valor}</td>
						<td class="editar-produto">
							<img src="./assets/edit.png" alt="Ícone de editar produto" />
						</td>
						<td class="apagar-produto">
							<img src="./assets/delete.png" alt="Ícone de apagar produto" />
						</td>
		`;
		tr.classList.add("linha-tabela");
		tabelaDeProdutos.appendChild(tr);

		indice++;
	}

	console.log("ULTIMA LINHA DA TABELA:", tabelaDeProdutos);
	//create a line for each product
}
function armazenaTargetNaVariavel(target, produto) {}
function mostraDadosDoProduto(produto) {
	console.log("O produto que precisa aparecer na tela é:", produto);
	inputNome.value = `${produto.nome}`;
	inputDescricao.value = `${produto.descricao}`;
	inputValor.value = `${produto.valor}`;
}
//{id:"",nome:"",descricao:"",valor:"","incluidoEm"}
function editaProduto() {
	listaDeProdutos[indiceElement].nome = inputNome.value;
	listaDeProdutos[indiceElement].descricao = inputDescricao.value;
	listaDeProdutos[indiceElement].valor = inputValor.value;
	const currentDate = new Date();
	listaDeProdutos[indiceElement].incluidoEm = currentDate.toISOString();
}
function escondeBotaoComId(botaoId) {}
function mostraBotaoComId(botaoId) {}

function achaIndiceDoProduto(idElement) {
	let indice = 0;
	while (indice < listaDeProdutos.length) {
		if (idElement === listaDeProdutos[indice].id) {
			console.log("Precisa mexer no elemento", listaDeProdutos[indice]);

			return indice; //depois que eliminar o elemento, para o laço
		}
		indice++;
	}
}

function apagaProduto(idElement) {
	let indice = 0;
	while (indice < listaDeProdutos.length) {
		console.log(
			"idElement = ",
			idElement,
			"id do objeto=",
			listaDeProdutos[indice].id
		);
		if (idElement === listaDeProdutos[indice].id) {
			console.log("Precisa apagar o elemento", listaDeProdutos[indice]);
			produtoApagado = listaDeProdutos[indice];
			listaDeProdutos.splice(indice, 1);
			console.log("Elementos que restaram", listaDeProdutos);
			return; //depois que eliminar o elemento, para o laço
		}
		indice++;
	}
}

function mostraProdutoSelecionado(indiceElement) {
	const stringData = passaDataParaFormatoPadrao(
		listaDeProdutos[indiceElement].incluidoEm
	);
	dadosDoProdutoClicado.innerHTML = `
	<p>Id: ${listaDeProdutos[indiceElement].id}</p>
	<h3>Nome: ${listaDeProdutos[indiceElement].nome}</h3>
	<p>Descrição: ${listaDeProdutos[indiceElement].descricao}</p>
	<h4>Valor: R$ ${listaDeProdutos[indiceElement].valor}</h4>
	<p>Incluído em: ${stringData}</p>
	`;
}
function passaDataParaFormatoPadrao(data) {
	console.log("data:", data);
	console.log("dia:", data.substr(8, 2));
	console.log("mes:", data.substr(5, 2));
	console.log("ano:", data.substr(0, 4));
	console.log("horario:", data.substr(11, 8));

	const stringD =
		data.substr(8, 2) +
		"/" +
		data.substr(5, 2) +
		"/" +
		data.substr(0, 4) +
		" – " +
		data.substr(11, 8);
	return stringD;
}
//dd/mm/aaaa – HH:MM:SS
