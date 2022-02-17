import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      arrayCartasSalvas: [],
      hasTrunfo: false,
      inputFiltro: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validacaoBotaoSalvar);
  }

  validacaoBotaoSalvar = () => {
    const { cardAttr1,
      cardAttr2,
      cardAttr3,
      cardName,
      cardDescription,
      cardImage,
      cardRare,
    } = this.state;

    const arrayDeFalsos = [];
    const maxAttr = 90;
    const maxSomaAttr = 210;
    const attr1 = Number(cardAttr1);
    const attr2 = Number(cardAttr2);
    const attr3 = Number(cardAttr3);

    if (cardName === ''
    || cardDescription === ''
    || cardImage === ''
    || cardRare === '') {
      arrayDeFalsos.push(false);
    }

    if ((attr1 + attr2 + attr3) > maxSomaAttr) {
      arrayDeFalsos.push(false);
    }

    if (attr1 > maxAttr || attr1 < 0) {
      arrayDeFalsos.push(false);
    }

    if (attr2 < 0 || attr2 > maxAttr) {
      arrayDeFalsos.push(false);
    }

    if (attr3 < 0 || attr3 > maxAttr) {
      arrayDeFalsos.push(false);
    }

    if (arrayDeFalsos.length > 0) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: false,
      });
    }
  }

  // Aula do instrutor Fernando, que criou um forms com informações dele. Está nos meus salvos no slack.
  // Ele deu a ideia de criar um novo objeto.
  botaoSalvar = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const objetoCartas = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };
    // Com esse novo objeto criado, nós podemos pegar todas as cartas salvas (com o ...spread)
    // E adicionar o onjetoCartas, que será a cartal ''atual''. Após isso, vamos retornar os valores ao default, conforme solicitado.
    this.setState((prev) => ({
      arrayCartasSalvas: [...prev.arrayCartasSalvas, objetoCartas],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'Normal',
      cardTrunfo: false,
    }));

    if (cardTrunfo === true) {
      this.setState({
        hasTrunfo: true,
      });
    }
  }

  handleClickDelete = (cartaClicada) => {
    const { arrayCartasSalvas } = this.state;
    const newList = arrayCartasSalvas.filter((card) => (card !== cartaClicada));
    // Guardar na nova lista só as cartas que não foram clicadas.
    this.setState({
      arrayCartasSalvas: newList,
    });
    // Como a carta que eu cliquei não vai estar mais na nova lista, coloco essa lista no estado. Logo, não será mais renderizado na tela.
    if (cartaClicada.cardTrunfo === true) {
      this.setState({
        hasTrunfo: false,
      });
      // Se a carta clicada for supertrunfo, setar o estado para false pois quer dizer que não tem mais nenhum supertrunfo, pois ele foi excluído.
    }
  }

  render() {
    const { arrayCartasSalvas, inputFiltro } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.botaoSalvar }
        />
        <Card
          { ...this.state }
        />
        <section>
          <hr />
          <h2>Minhas cartas</h2>
          <input
            name="inputFiltro"
            type="text"
            data-testid="name-filter"
            onChange={ this.handleChange }
          />
          { arrayCartasSalvas.filter((carta) => carta.cardName.includes(inputFiltro))
            .map((card) => (
              <div key={ card.cardName }>
                <Card { ...card } />
                <button
                  type="button"
                  data-testid="delete-button"
                  onClick={ () => this.handleClickDelete(card) }
                >
                  Excluir
                </button>
              </div>)) }
        </section>
      </div>
    );
  }
}

export default App;
