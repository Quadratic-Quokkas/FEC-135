import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const OuterContainer = styled.div`
  border-bottom: 2px solid #e2e2e2;
`;

const Container = styled.form`
  margin: 10px;
`;

const Button = styled.button`
  background-color: #27231F;
  color: #fff;
  margin: 2.5px;
  border: solid 1px #27231F;
  padding: 5px;
  width: 200px;
  line-height: 40px;

  :hover {
    cursor: pointer;
    background-color: #000;
    border: solid 1px #000;
  }
`;

function AddToCart({ sku, qty }) {
  const [items, setItems] = useState(0);
  const [isError, setIsError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault()
    addAllItems(qty)
  }

  function addToCart() {
    return axios.post('http://localhost:3000/api/cart', {sku_id: sku});
  }

  function addAllItems(qty) {
    let promises = [];

    for (let i = 0; i < qty; i++) {
      promises.push(addToCart())
    }

    Promise.all(promises)
      .then(responses => {
        return Promise.all(responses.map(response => response))
      })
      .then(data => {
        setItems(data.length);
        return;
      })
      .then(() => {
        // add items to shopping bag
      })
      .then(() => {
        // clear items
      })
      .catch(err => setIsError(true))
  }

  return (
    <OuterContainer>
      <Container onSubmit={handleSubmit}>
        <Button>ADD TO BAG</Button>
      </Container>
    </OuterContainer>
  )
}

export default AddToCart;