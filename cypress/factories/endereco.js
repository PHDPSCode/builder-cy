import faker from './faker';
import Base from './base';
import { enderecos, tiposComplemento } from './definitions';

export default class Endereco extends Base {
  constructor ({ provider } = {}) {
    super();
    this.provider = provider;
  }

  get id () {
    return this.obterOuDefinir('id', faker.random.id);
  }

  get endereco () {
    return this.obterOuDefinir('endereco', () => {
      return faker.helpers.arrayElement(enderecos[this.provider]);
    });
  }

  get logradouro () {
    return this.endereco.logradouro;
  }

  get cep () {
    return this.endereco.cep;
  }

  get bairro () {
    return this.endereco.bairro;
  }

  get uf () {
    return this.endereco.uf;
  }

  get cidade () {
    return this.endereco.cidade;
  }

  get idCidade () {
    return this.endereco.idCidade;
  }

  get idUF () {
    return this.endereco.idUF;
  }

  get estado () {
    return this.endereco.estado;
  }

  get numero () {
    return this.obterOuDefinir('numero',
      () => faker.datatype.number({ min: 1, max: 1000 })
    );
  }

  get semNumero () {
    return this.numero === '';
  }

  get complemento () {
    return this.obterOuDefinir('complemento',
      () => faker.address.secondaryAddress().replace('.', '')
    );
  }

  get tipoComplemento () {
    return this.obterOuDefinir('tipoComplemento',
      () => faker.helpers.arrayElement(tiposComplemento[this.provider])
    );
  }
}
