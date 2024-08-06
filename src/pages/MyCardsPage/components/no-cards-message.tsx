import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const NoCardsMessage = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            mt="50px"
        >
            <CreditCardIcon style={{ fontSize: 64, color: '#757575' }} />
            <Typography variant="h5" color="textSecondary" mt={2}>
                Sem cartões cadastrados.
            </Typography>
        </Box>
    );
};

export default NoCardsMessage;
