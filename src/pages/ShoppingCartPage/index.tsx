import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import Grid2 from '@mui/material/Unstable_Grid2';
import {Box, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import './styles.css';
import ProductItemCardComponent from '../../shared/ProductItemCardComponent';
import OrderResumeComponent from '../../shared/OrderResumeComponent';
import {ShoppingCart} from "@mui/icons-material";

interface ShoppingCartPageProps {
   
}

const ShoppingCartPage: React.FC<ShoppingCartPageProps> = () => {

   const cart = useContext(ShoppingCartContext);

   return (
      <Grid2 
         container
         sx={{
            width: '100%',
            mt:15,
            pl: 10,
            mb: 20,
            display:'flex'
         }}
      >
         <Grid2 xs={12} sx={{height:100}}>
            <Typography
               fontFamily={'Public Sans'}
               fontSize={'2.5rem'}
               fontWeight={600}
               color={'#000'}
            >
               Seu Carrinho
            </Typography>
            <Typography
               fontFamily={'Public Sans'}
               fontSize={'1rem'}
               fontWeight={400}
               color={'#000'}
               sx={{
                  mb: 5
               }}
            >
               Ainda não quer finalizar sua compra?
                <Link data-cy="btn-return-to-products" to='/products' className='link-redirect'>
                    Continue comprando!
                </Link>
            </Typography>
         </Grid2>
         <Grid2 xs={6}>
            {
               cart!.cartProducts.length > 0 ?
                  cart!.cartProducts.map((cartProduct, index) => {
                     return(
                        <ProductItemCardComponent key={index} productItem={cartProduct} context='cart'/>
                     )
                  })
               :
                   <Box data-cy='empty-cart-component' sx={{textAlign: 'center', mt:10}}>
                       <ShoppingCart fontSize="large" color="disabled"/>
                       <Typography variant="h6" color="textSecondary">
                           Parece que seu carrinho está vazio...
                           Que tal fazer algumas comprinhas?
                       </Typography>
                   </Box>
            }
         </Grid2>
          <OrderResumeComponent
              redirectUrl={'/checkout'}
              buttonLabel='Continuar para o checkout'
          />
      </Grid2>
   );
};

export default ShoppingCartPage;