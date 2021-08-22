import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart } from './components';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const addItem = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart)
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart)

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={addItem} />
          </Route>
          <Route exact path="/cart">
            <Cart cart={cart}/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
