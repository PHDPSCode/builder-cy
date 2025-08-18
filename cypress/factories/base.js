export default class Base {
  constructor () {
    this.dados = new Map();
  }

  obterOuDefinir (chave, funcao) {
    if (this.dados.has(chave) === false) {
      this.dados.set(chave, funcao());
    }

    return this.dados.get(chave);
  }
}
