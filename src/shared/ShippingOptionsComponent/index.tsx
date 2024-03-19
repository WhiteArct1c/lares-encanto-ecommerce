import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useContext, useEffect, useState } from 'react';
import { IShippingTypes } from '../../utils/interfaces/IShippingTypes';
import { Box, Checkbox, CircularProgress, Typography } from '@mui/material';
import { OrderContext } from '../../contexts/OrderContext';
import { useApi } from '../../hooks/useApi';

interface ShippingOptionsComponentProps {
   
}

const ShippingOptionsComponent: React.FC<ShippingOptionsComponentProps> = () => {

   const [shippingTypes, setShippingTypes]= useState<IShippingTypes[]>([]);
   const [loading, setLoading] = useState(true);
   const api = useApi();

   const order = useContext(OrderContext);

   useEffect(()=>{

      async function loadShippingTypes(){
         const data = await api.getShippingTypes();

         setShippingTypes(data);
         setLoading(false);
      }

      loadShippingTypes();

   },[])

   const handleShipmentPrice = (shipmentPrice: string) => {
      order!.setOrderShipmentPrice(parseFloat(shipmentPrice));
   }

   return (
      <Box
         sx={{mb:5, mt:5, width:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}
      >
         {
            loading 
            ? 
               <Grid2 container xs={12} sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <CircularProgress/>
               </Grid2>
            :
               shippingTypes.map((shipment, index) => 
               <Box component='button' key={index} onClick={() => handleShipmentPrice(shipment.price)} sx={{display:'flex', mt:5, border:'1px solid black', borderRadius:1, p:1, width:400}}>
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