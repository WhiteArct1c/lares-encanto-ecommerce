import React, {useState} from 'react';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {Box, Tab, Typography} from "@mui/material";
import AdminSidenavComponent from "../../shared/AdminSidenavComponent";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import PendingOrdersComponent from "./components/pending-orders-component.tsx";
import CanceledOrdersComponent from "./components/canceled-orders-component.tsx";
import FinishedOrdersComponent from "./components/finished-orders-component.tsx";

const AdminOrdersPage: React.FC = () => {

    const [tab, setTab] = useState("pending-orders");
    const handleChange = (_event: React.SyntheticEvent, newTab: string) => {
        setTab(newTab);
    };

    return (
        <Grid2 container xs={12} sx={{mb:30}}>
            <Grid2 xs={12} sx={{ pl: 32,  mt: 5}}>
                <Typography fontFamily={'Public Sans'} fontSize={40} sx={{mb: 5, ml: 4}}>
                    Vendas
                </Typography>
            </Grid2>
            <AdminSidenavComponent/>
            <Grid2 xs sx={{mr:10}}>
                <TabContext value={tab}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange}>
                            <Tab label="Pendentes" value="pending-orders"/>
                            <Tab label="Canceladas" value="canceled-orders"/>
                            <Tab label="Concluídas" value="finished-orders"/>
                        </TabList>
                    </Box>
                    <TabPanel value="pending-orders">
                        <PendingOrdersComponent/>
                    </TabPanel>
                    <TabPanel value="canceled-orders">
                        <CanceledOrdersComponent/>
                    </TabPanel>
                    <TabPanel value="finished-orders">
                        <FinishedOrdersComponent/>
                    </TabPanel>
                </TabContext>
            </Grid2>
        </Grid2>
    );
};
export default AdminOrdersPage;