import React from "react";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MyProfileSidenavComponent from "../../shared/MyProfileSidenavComponent";
import {ExpandMore} from "@mui/icons-material";

interface MyOrdersPageProps{

}

const MyOrdersPage: React.FC<MyOrdersPageProps> = () => {
    return(
        <Grid2 container xs={12} sx={{mb: 10}}>
            <Grid2 xs={12} sx={{ pl: 2,  mt: 15}}>
                <Typography fontFamily={'Public Sans'} fontSize={40} sx={{mb: 10, ml: 3}}>
                    Meus Pedidos
                </Typography>
            </Grid2>

            <MyProfileSidenavComponent/>

            <Grid2 xs sx={{mr: 5, ml: 5}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Pedido: #12978867846
                    </AccordionSummary>
                    <AccordionDetails>
                        Item #1
                    </AccordionDetails>
                    <AccordionActions>
                        <Button sx={{ color: 'black', m: 1 }}>Trocar</Button>
                        <Button sx={{ color: 'black', m: 1 }}>Devolver itens</Button>
                    </AccordionActions>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Pedido: #22398298743
                    </AccordionSummary>
                    <AccordionDetails>
                        Item #2
                    </AccordionDetails>
                    <AccordionActions>
                        <Button sx={{ color: 'black', m: 1 }}>Trocar</Button>
                        <Button sx={{ color: 'black', m: 1 }}>Devolver itens</Button>
                    </AccordionActions>
                </Accordion>
            </Grid2>
        </Grid2>
    );
}

export default MyOrdersPage;