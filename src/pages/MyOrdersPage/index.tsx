import React from "react";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import MyProfileSidenavComponent from "../../shared/MyProfileSidenavComponent";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {ExpandMore} from "@mui/icons-material";

interface MyOrdersPageProps{

}

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName:'ID',
        width:90
    },
    {
        field: 'productName',
        headerName:'Nome do Produto',
        width:150
    },
    {
        field: 'productQtd',
        headerName:'Quantidade',
        width:90
    }
];

const rows = [
    {id: 1, productName: 'Cadeira Flex', productQtd: 1},
    {id: 2, productName: 'Sofá Urban Black', productQtd: 1},
    {id: 3, productName: 'Mesa Ego White', productQtd: 1}
];

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
                        <Box sx={{width: '100%'}}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
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