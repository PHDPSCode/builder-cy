import faker from './faker';
import Base from './base';
import { ddds, profissoes } from './definitions';
import { formatAmericanToBrazilianDate, dePtBrParaEnUs } from './utils/dateUtils';
const cpfRandom = require('gerador-validador-cpf');
const cnpjRandom = require('cnpj');

export default class Cliente extends Base {

  get id () {
    return this.obterOuDefinir('id', faker.helpers.id());
  }

  get primeiroNome () {
    return this.obterOuDefinir('primeiroNome',
      () => faker.name.firstName(this.sexoSlug)
    );
  }

  get ultimoNome () {
    return this.obterOuDefinir('ultimoNome',
      () => faker.name.lastName(this.sexoSlug)
    );
  }

  get nomeCompleto () {
    return `${this.primeiroNome} ${this.ultimoNome}`;
  }

  // Adaptado para criar um nome de cliente diferente
  get nomeCliente () {
    return `${'Cliente'} ${this.primeiroNome} ${this.ultimoNome}`;
  }

  get sexoSlug () {
    if (this.sexoRandom) { return 'male'; }
    return 'female';
  }

  get sexoRandom () {
    return this.obterOuDefinir('sexoRandom',
      () => faker.helpers.arrayElement([0, 1])
    );
  }

  get sexo () {
    return this.sexoRandom
      ? 'Masculino'
      : 'Feminino';
  }

  get email () {
    return this.obterOuDefinir('email', faker.internet.email);
  }

  get cpf () {
    return this.obterOuDefinir('cpf',
      () => cpfRandom.generate({ format: true })
    );
  }

  get cnpj () {
    return this.obterOuDefinir('cpnj',
      () => cnpjRandom.generate()
    );
  }

  get nomeMae () {
    return this.obterOuDefinir('nomeMae',
      () => `${faker.name.firstName('female')} ${faker.name.lastName()}`
    );
  }

  get nomePai () {
    return this.obterOuDefinir('nomePai',
      () => `${faker.name.firstName('male')} ${faker.name.lastName()}`
    );
  }

  get dataNascimento () {
    return this.obterOuDefinir('dataNascimento',
      () => formatAmericanToBrazilianDate(faker.date.between(
        new Date(1990, 1, 1),
        new Date(2000, 12, 31)
      ).toISOString())
    );
  }

  get telefoneCelular () {
    return this.obterOuDefinir('telefoneCelular',
      () => {
        const ddd = this.dddId
          ? ddds.find(({ id }) => Number(this.dddId) === id)
          : faker.helpers.arrayElement(ddds);
        return faker.phone.number(`${ddd.text}9########`);
      }
    );
  }

  get telefoneCelularFormatado () {
    return this.obterOuDefinir('telefoneCelularFormatado',
      () => {
        const ddd = this.telefoneCelular.slice(0, 2);
        const primeiraMetade = this.telefoneCelular.slice(2, 7);
        const segundaMetade = this.telefoneCelular.slice(7, 11);
        return `(${ddd}) ${primeiraMetade}-${segundaMetade}`;
      }
    );
  }

  get telefoneFixo () {
    const ddd = faker.helpers.arrayElement(ddds);
    return this.obterOuDefinir('telefoneFixo',
      () => faker.phone.number(`${ddd.text}3#######`)
    );
  }

  get telefoneFixoFormatado () {
    return this.obterOuDefinir('telefoneFixoFormatado',
      () => {
        const ddd = this.telefoneFixo.slice(0, 2);
        const primeiraMetade = this.telefoneFixo.slice(2, 6);
        const segundaMetade = this.telefoneFixo.slice(6, 10);
        return `(${ddd}) ${primeiraMetade}-${segundaMetade}`;
      }
    );
  }

  get outroContato () {
    const ddd = faker.helpers.arrayElement(ddds);
    return this.obterOuDefinir('outroContato',
      () => faker.helpers.arrayElement([
        // '',
        faker.phone.number(`${ddd.text}3#######`)
      ])
    );
  }

  get receberSMS () {
    return this.obterOuDefinir('receberSMS', faker.datatype.boolean);
  }

  get rg () {
    return this.obterOuDefinir('rg',
      () => faker.helpers.arrayElement([faker.phone.number('#######')])
    );
  }

  get profissao () {
    return this.obterOuDefinir('profissao',
      () => faker.helpers.arrayElement(profissoes)
    );
  }

  get site () {
    return this.obterOuDefinir('site',
      () => faker.internet.url()
    );
  }
}
