import React, { useEffect, useState } from "react";
import {
    Button, Dialog, DialogContent, DialogTitle, Divider,
    Tooltip,
    Typography
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MyProfileSidenavComponent from "../../shared/MyProfileSidenavComponent";
import { Add } from "@mui/icons-material";
import CreateCardForm from "./components/create-card-form.tsx";
import NoCardsMessage from "./components/no-cards-message.tsx";
import { useApi } from "../../hooks/useApi.ts";
import CreditCardComponent from "./components/credit-card-component.tsx";
interface MyCardsPageProps{

}

const MyCardsPage: React.FC<MyCardsPageProps> = () => {
    const [open, setOpen] = useState(false);
    const [titleDialog, setTitleDialog] = useState('');
    const [creditCards, setCreditCards] = useState<[]>([]);
    const api = useApi();

    const handleClickOpenDialog = (value: string) => {
        setTitleDialog(value)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCardAdded = () => {
        loadCreditCards();
    }

    const loadCreditCards = async () => {
        const data = await api.listCreditCards(localStorage.getItem('authToken'));
        setCreditCards(data.data);
    }

    useEffect(() => {
        loadCreditCards();
    }, []);

    return(
        <Grid2 container xs={12} sx={{mb: 15,}}>
            <Grid2 xs={12} sx={{ pl: 2,  mt: 15}}>
                <Typography fontFamily={'Public Sans'} fontSize={40} sx={{mb: 10, ml: 3}}>
                    Meus Cartões
                </Typography>
            </Grid2>

            <MyProfileSidenavComponent/>

            <Grid2 xs sx={{display:'flex', justifyContent:'start', flexDirection:"column", ml: 10, mr:10, p:2}}>
                <Tooltip title='Adicionar cartões'>
                    <Button
                        data-cy="btn-add-new-card"
                        variant="contained"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width:200,
                            bgcolor: '#000',
                            fontWeight: 800,
                            '&:hover': {
                                bgcolor: '#fff',
                                color: '#000'
                            },
                            mb: 2
                        }}
                        onClick={() => handleClickOpenDialog('Adicionar cartão')}
                        endIcon={<Add/>}
                    >
                        Adicionar cartão
                    </Button>
                </Tooltip>
                <Divider sx={{mb:3}}/>
                {creditCards.length ?
                    <Grid2 container xs sx={{display:'flex', gap:3}}>
                        {
                            creditCards.map((card) =>{
                                return(
                                    <>
                                        <CreditCardComponent
                                            creditCard={card}
                                        />
                                    </>
                                );
                            })
                        }
                    </Grid2>
                    :
                    <NoCardsMessage/>
                }
            </Grid2>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{titleDialog}</DialogTitle>
                <DialogContent>
                    <CreateCardForm handleClose={handleClose} handleCardAdded={handleCardAdded}/>
                </DialogContent>
            </Dialog>
        </Grid2>
    );
}

export default MyCardsPage;