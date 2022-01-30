import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <section>
        <form>

          <input type="text" data-testid="name-input" />

          <input type="textarea" data-testid="description-input" />

          <input type="number" data-testid="attr1-input" />

          <input type="number" data-testid="attr2-input" />

          <input type="number" data-testid="attr3-input" />

          <input type="text" data-testid="image-input" />

          <select data-testid="rare-input">
            <option value="normal" id="rare-input">Normal</option>
            <option value="raro" id="rare-input">Raro</option>
            <option value="muito raro" id="rare-input">Muito raro</option>
          </select>

          <input type="checkbox" data-testid="trunfo-input" />
          Super Trunfo
          <button type="submit" data-testid="save-button">Salvar</button>
        </form>
      </section>
    );
  }
}

export default Form;
