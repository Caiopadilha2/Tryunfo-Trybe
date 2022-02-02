import React from 'react';
import Form from './components/Form';
import Card from '.components./Card';

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

  handleChange = (event) => { // Essa função sempre é chamada quando tem alguma alteração no formulário.
    if (event.target.name === 'cardTrunfo') {
      this.setState({ cardTrunfo: event.target.checked }, this.validacaoBotaoSalvar);
    } else {
      this.setState({ [event.target.name]: event.target.value }, this.validacaoBotaoSalvar);
    }
  }

  validacaoBotaoSalvar = () => {
    const arrayDeFalsos = [];
    const maxAttr = 90;
    const maxSomaAttr = 210;
    const attr1 = Number(cardAttr1.value);
    const attr2 = Number(cardAttr1.value);
    const attr3 = Number(cardAttr1.value);

    if (cardName.value === ''
    || cardDescription.value === ''
    || cardImage.value === ''
    || cardRare.value === '') {
      arrayDeFalsos.push(false);
    }

    if (attr1 + attr2 + attr3 > maxSomaAttr) {
      arrayDeFalsos.push(false);
    }

    if (attr1 < 0 || attr1 > maxAttr) {
      arrayDeFalsos.push(false);
    }

    if (attr2 < 0 || attr2 > maxAttr) {
      arrayDeFalsos.push(false);
    }

    if (attr3 < 0 || attr3 > maxAttr) {
      arrayDeFalsos.push(false);
    }

    if (arrayDeFalsos.length > 0) {
      return false;
    }
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

export default App;
