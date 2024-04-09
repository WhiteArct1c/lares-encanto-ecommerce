import React from 'react';
import {
    Accordion, AccordionActions,
    AccordionDetails,
    AccordionSummary, Button,
    Divider,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import {OrderStatusEnum} from "../../../utils/enum/OrderStatusEnum.ts";

const PendingOrdersComponent:React.FC = () => {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore/>}
                >
                    Pedido #123123313
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontWeight={"bold"} sx={{display:'flex', alignItems:'center', gap:0.5}}>
                        Cliente:
                        <Typography fontSize={15}>
                            MATHEUS RODRIGUES BISPO
                        </Typography>
                    </Typography>
                    <Typography fontWeight={"bold"} sx={{display:'flex', alignItems:'center', gap:0.5}}>
                        Status do pedido:
                        <Typography fontSize={15}>
                            {OrderStatusEnum.EM_PROCESSAMENTO}
                        </Typography>
                    </Typography>
                    <Typography fontWeight={"bold"} sx={{display:'flex', alignItems:'center', gap:0.5}}>
                        Método de pagamento:
                        <Typography fontSize={15}>
                            Cartão de crédito
                        </Typography>
                    </Typography>
                    <Typography fontSize={19} fontWeight={"bold"} sx={{display:'flex', alignItems:'center', gap:0.5, mt:2}}>
                        Valor total:
                        <Typography fontSize={19} fontWeight={"bold"}>
                            R$4.500,00
                        </Typography>
                    </Typography>
                    <Divider/>
                    <List sx={{display:'flex'}}>
                        <ListItem>
                            <ListItemText primary="Nome do produto" secondary="Quantidade x "/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Nome do produto" secondary="Quantidade x "/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Nome do produto" secondary="Quantidade x "/>
                        </ListItem>
                    </List>
                </AccordionDetails>
                <AccordionActions>
                    <Button variant="contained"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                bgcolor: '#000',
                                fontWeight: 800,
                                '&:hover': {
                                    bgcolor: '#fff',
                                    color: '#000'
                                }
                            }}
                    >
                        Mudar status
                    </Button>
                    <Button variant="outlined"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                fontWeight: 800,
                                color: '#000',
                                borderColor: '#000',
                                '&:hover': {
                                    color: '#000',
                                    bgcolor:'#e1e1e1',
                                    borderColor: '#000'
                                }
                            }}
                    >
                        Cancelar
                    </Button>
                </AccordionActions>
            </Accordion>
        </>
    );
};

export default PendingOrdersComponent;