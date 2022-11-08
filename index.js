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
		mensagemErro.innerHTML = `${error}`;
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
	}
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
function mostraDadosDoProduto() {}
function editaProduto() {}
function escondeBotaoComId(botaoId) {}
function mostraBotaoComId(botaoId) {}

function apagaProduto() {}
