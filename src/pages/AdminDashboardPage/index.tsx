import React, {useContext} from "react";
import {AuthContext} from "../../contexts/Auth/AuthContext.tsx";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {Box, Card, CardContent, IconButton, Tooltip, Typography} from "@mui/material";
import AdminSidenavComponent from "../../shared/AdminSidenavComponent";
import {LineChart} from "@mui/x-charts";
import {InfoRounded, MonetizationOnOutlined, Person, ShoppingBagRounded} from "@mui/icons-material";

interface AdminDashboardPageProps{

}
const AdminDashboardPage: React.FC<AdminDashboardPageProps> = () => {
    const auth = useContext(AuthContext);

    return (
        <Grid2 container xs={12}>
            <Grid2 xs={12} sx={{ pl: 32,  mt: 5}}>
                <Typography fontFamily={'Public Sans'} fontSize={40} sx={{mb: 5, ml: 4}}>
                    Bem vindo, {auth.user?.fullName.split(" ")[0]}!
                </Typography>
            </Grid2>
            <AdminSidenavComponent/>
            <Grid2 xs={10} sx={{display:"flex", gap:5, p:3, flexWrap:"wrap", maxWidth:2000}}>
                <Card sx={{display:"flex", flexDirection:"column", width:300, p:2, borderRadius:4}}>
                    <Box sx={{width:"100%", justifyContent: 'space-between'}}>
                        <MonetizationOnOutlined sx={{fontSize:50}}/>
                    </Box>
                    <CardContent>
                        <Typography fontFamily={'Public Sans'} fontSize={30}>
                            R$ 1.298.998,00
                        </Typography>
                        <Typography fontFamily={'Public Sans'} fontSize={17}>
                            Valor total de vendas neste mês
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{display:"flex", flexDirection:"column", width:300, p:2, borderRadius:4}}>
                    <Box sx={{width:"100%", justifyContent: 'space-between'}}>
                        <Person sx={{fontSize:50}}/>
                    </Box>
                    <CardContent>
                        <Typography fontFamily={'Public Sans'} fontSize={30}>
                            12.523
                        </Typography>
                        <Typography fontFamily={'Public Sans'} fontSize={17}>
                            Usuários registrados neste mês
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{display:"flex", flexDirection:"column", width:300, p:2, borderRadius:4}}>
                    <Box sx={{width:"100%", justifyContent: 'space-between'}}>
                        <ShoppingBagRounded sx={{fontSize:50}}/>
                    </Box>
                    <CardContent>
                        <Typography fontFamily={'Public Sans'} fontSize={30}>
                            100
                        </Typography>
                        <Typography fontFamily={'Public Sans'} fontSize={17}>
                            Vendas realizadas hoje
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{display:"flex", flexDirection:"column", gap:"3px",  borderRadius:4}}>
                    <Typography fontFamily={'Public Sans'} fontSize={25} sx={{width:"100%", pl:4, mt:2}}>
                        Frequência de vendas
                        <Tooltip title="Este gráfico é atualizado a cada semana">
                            <IconButton>
                                <InfoRounded/>
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Typography fontFamily={'Public Sans'} fontSize={15} sx={{width:"100%", pl:4,}}>
                        O gráfico de linhas abaixo apresenta
                        uma análise da frequência de vendas ao
                        longo de um período de tempo considerável
                    </Typography>
                    <CardContent>
                        <LineChart
                            xAxis={[
                                {
                                    id: 'Years',
                                    data: [
                                        new Date(2019, 0, 1),
                                        new Date(2020, 0, 1),
                                        new Date(2021, 0, 1),
                                        new Date(2022, 0, 1),
                                        new Date(2023, 0, 1),
                                        new Date(2024, 0, 1)
                                    ],
                                    scaleType: 'band',
                                    valueFormatter: (date) => date.getFullYear().toString()
                                },
                            ]}
                            series={[
                                {
                                    data: [10, 10000, 15000, 32000, 99000, 150000],
                                },
                            ]}
                            width={1050}
                            height={300}
                            sx={{p:0.5}}
                        />
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
};

export default AdminDashboardPage;