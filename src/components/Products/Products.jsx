import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product'

const products = [
  { id: 1, name: 'Rings', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolore fugit mollitia odit. Aliquam dolores neque quae, perferendis repellendus corporis?', price: "$35", image: 'https://cdn.pixabay.com/photo/2017/07/12/18/43/wedding-2497820_960_720.jpg' },
  { id: 2, name: 'Necklaces', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolore fugit mollitia odit. Aliquam dolores neque quae, perferendis repellendus corporis?', price: "$50", image: 'https://cdn.pixabay.com/photo/2016/11/11/17/34/diamond-1817292_960_720.png' },
]

const Products = () => {
  return (
    <main>
      <Grid container justify="center" spacing={4}>
        {products.map(product => {
          return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product}/>
            </Grid> 
          )
        })}
      </Grid>
    </main>
  );
}

export default Products