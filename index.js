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
let produtos = [];
// cada elemento de produto será um objeto no formato:
//{id:"",nome:"",descricao:"",valor:"","incluidoEm"}

let countId = 0;
//contador que corresponde ao id
//sempre incrementa de 1 em 1, garantindo a unicidade
//de cada identificador
const botaoIncluirProduto = document.querySelector("#");
const botaoListarProdutos = document.querySelector("#");

const inputNome = document.querySelector("#");
const inputDescricao = document.querySelector("#");
const inputValor = document.querySelector("#");

const botaoConfirmaEdicao = document.querySelector("#"); //
//esse botao comeca invisivel e so fica visivel se o usuario clicou na imagem da tabela que
//faz referencia a edicao
const botaoCancelaEdicao = document.querySelector("#");
//esse botao comeca invisivel e so fica visivel se o usuario clicou na imagem da tabela que
//faz referencia a edicao

const containerTabela = document.querySelector("#");
// se dentro do elemento de tabela o usuario clicar na imagem de editar ou na imagem de apagar
// deve mostrar

let produtoApagado = {};
//armazena as informações do produto que será/foi apagado
let produtoEditado = {};
//armazena as informações do produto que será/foi editado

//FUNCÕES
//colocar try catch
botaoIncluirProduto.addEventListener("click", () => {
	if (produtoEhValido()) {
		adicionaProdutoNoArray();
	}
});
//verificar produto e emitir mensagem de falha se não for válido
function produtoEhValido() {}

//adicionar produto no array
//pode ter dentro dela varias funcoes que adiciona cada elemento
function adicionaProdutoNoArray() {}

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

function mostraProdutos() {}
function armazenaTargetNaVariavel(target, produto) {}
function mostraDadosDoProduto() {}
function editaProduto() {}
function escondeBotaoComId(botaoId) {}
function mostraBotaoComId(botaoId) {}

function apagaProduto() {}
