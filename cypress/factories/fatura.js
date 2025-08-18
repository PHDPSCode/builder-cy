import faker from './faker';
import Base from './base';
import { datasVencimento, formasEnvioFatura, formasPagamento, bancos } from './definitions';

export default class Fatura extends Base {
  constructor ({ provider } = {}) {
    super();
    this.provider = provider;
  }

  get id () {
    return this.obterOuDefinir('id', faker.helpers.id());
  }

  get dataVencimento () {
    const dataVencimentoProvider = this.provider
      ? faker.helpers.arrayElement(datasVencimento[this.provider])
      : faker.helpers.arrayElement(datasVencimento.alares);
    return this.obterOuDefinir('dataVencimento',
      () => dataVencimentoProvider
    );
  }

  get formaEnvio () {
    const formaEnvioProvider = this.provider
      ? faker.helpers.arrayElement(formasEnvioFatura[this.provider])
      : faker.helpers.arrayElement(formasEnvioFatura.alares);
    return this.obterOuDefinir('formaEnvio',
      () => formaEnvioProvider
    );
  }

  get formaPagamento () {
    const formaPagamentoProvider = this.provider
      ? faker.helpers.arrayElement(formasPagamento[this.provider])
      : faker.helpers.arrayElement(formasPagamento.alares);
    return this.obterOuDefinir('formaPagamento',
      () => formaPagamentoProvider
    );
  }

  get banco () {
    const bancoDebitoProvider = this.provider
      ? {
          nome: faker.helpers.arrayElement(bancos[this.provider]),
          agencia: this.agenciaBanco,
          conta: this.contaBanco
        }
      : {
          nome: faker.helpers.arrayElement(bancos.alares),
          agencia: this.agenciaBanco,
          conta: this.contaBanco
        };
    return this.obterOuDefinir('banco',
      () => bancoDebitoProvider
    );
  }

  get agenciaBanco () {
    return this.obterOuDefinir('agenciaBanco',
      () => faker.phone.number('####')
    );
  }

  get contaBanco () {
    return this.obterOuDefinir('contaBanco',
      () => faker.phone.number('#######')
    );
  }
}
