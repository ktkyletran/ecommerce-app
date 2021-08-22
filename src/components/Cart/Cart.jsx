import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart }) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      Your cart is currently empty.
      <Link to="/" className={classes.link}>Return to store</Link>
    </Typography>
  );

  const ActiveCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: { cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button className={classes.emptyBtn} size="large" type="button" variant="contained" color="secondary">
              Empty Cart
            </Button>
            <Button className={classes.checkoutBtn} size="large" type="button" variant="contained" color="primary">
              Checkout
            </Button>
          </div>
      </div>
    </>
  );

  if (!cart.line_items) return 'Loading...';

  return (
    <Container>
      <div className={classes.toolBar}/>
      <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
      { !cart.line_items ? <EmptyCart /> : <ActiveCart />}
    </Container>
  )
}

export default Cart
