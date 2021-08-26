import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, Checkout } from './components';
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

  // CRUD Operations
  const addItem = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);

    setCart(cart);
  };

  const updateItem = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };
  
  const removeItem = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)

    setCart(cart);
  };

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={addItem} />
          </Route>
          <Route exact path="/cart">
            <Cart 
            cart={cart}
            updateItem={updateItem}
            removeItem={removeItem}
            emptyCart={emptyCart}
            />
          </Route>
          <Route exact path="/checkout">
             <Checkout cart={cart}/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
