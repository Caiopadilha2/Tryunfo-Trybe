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

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          { ...this.state }
          onInputChange={ this.handleChange }
          onSaveButtonClick={ this.validacaoBotaoSalvar }
        />
        <Card
          { ...this.state }
        />
      </div>
    );
  }
}

export default App;
