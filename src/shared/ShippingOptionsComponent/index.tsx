import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useContext, useEffect, useState } from 'react';
import { IShippingTypes } from '../../utils/interfaces/IShippingTypes';
import { Box, Checkbox, Typography } from '@mui/material';
import { OrderContext } from '../../contexts/OrderContext';

interface ShippingOptionsComponentProps {
   
}

const ShippingOptionsComponent: React.FC<ShippingOptionsComponentProps> = () => {

   const [shippingTypes, setShippingTypes]= useState<IShippingTypes[]>([]);

   const order = useContext(OrderContext);

   const apiURL = 'http://localhost:3000/shippings'

   useEffect(()=>{
      fetch(apiURL)
      .then(res => res.json())
      .then(data => setShippingTypes([...data]))
   },[])

   const handleShipmentPrice = (shipmentPrice: string) => {
      order!.setOrderShipmentPrice(parseFloat(shipmentPrice));
   }

   return (
      <Box
         sx={{mb:5, width:400}}
      >
         {shippingTypes.map(shipment => 
            <Box component='button' onClick={() => handleShipmentPrice(shipment.price)} sx={{display:'flex', mt:5, border:'1px solid black', p:1, width:'100%'}}>
               <Grid2 xs={2}>
                  <Checkbox onChange={() => handleShipmentPrice(shipment.price)}/>
               </Grid2>
               <Grid2 xs={10}>
                  <Typography fontFamily={'Public Sans'} fontSize={'1.2rem'} textAlign={'start'}>
                     {shipment?.name}
                  </Typography>
                  <Typography fontFamily={'Public Sans'} fontSize={'1rem'} textAlign={'start'}>
                     {shipment?.delivery_time}
                  </Typography>
                  <Typography fontFamily={'Public Sans'} fontSize={'1rem'} fontWeight={600} textAlign={'end'}>
                     R$ {shipment?.price}
                  </Typography>
               </Grid2>
            </Box>
         )}
      </Box>
   );
};

export default ShippingOptionsComponent;