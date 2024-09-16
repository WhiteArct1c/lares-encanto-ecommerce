import { Card, CardContent, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

interface Address {
   id: string;
   title: string;
   cep: string;
   residenceType: string;
   addressType: string;
   categories: string[];
   streetName: string;
   addressNumber: string;
   neighborhoods: string;
   state: string;
   city: string;
   country: string;
   observations: string;
}

interface CheckoutCustomerAddressesProps {
   index: number;
   address: Address;
}

const CheckoutAddressCard: React.FC<CheckoutCustomerAddressesProps> = ({ index, address }) => {
   return (
      <Grid2 xs={4} key={index}>
         <Card key={address.id} sx={{
            cursor: 'pointer',
            '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
            }
         }}>
            <CardContent>
               <Typography fontFamily={'Public Sans'} fontWeight={700} variant='h6'>
                  {address.title}
               </Typography>
               <Typography fontFamily={'Public Sans'}>
                  {address.addressType}&nbsp;{address.streetName}
               </Typography>
               <Typography fontFamily={'Public Sans'}>
                  {address.addressNumber}
               </Typography>
               <Typography fontFamily={'Public Sans'}>
                  {address.neighborhoods}
               </Typography>
               <Typography fontFamily={'Public Sans'}>
                  {address.city} - {address.state}
               </Typography>
               <Typography fontFamily={'Public Sans'}>
                  {address.cep}
               </Typography>
            </CardContent>
         </Card>
      </Grid2>
      );
};

export default CheckoutAddressCard;