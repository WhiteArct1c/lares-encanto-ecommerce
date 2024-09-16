import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {Button, Divider} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

interface AdminSidenavComponentProps{
}
const AdminSidenavComponent: React.FC<AdminSidenavComponentProps> = () => {
    return(
        <Grid2
            container
            xs={2}
            spacing={2}
        >
            <Grid2 sx={{ pl: 5 }}>
                <Divider />
                <Button
                    variant='text'
                    sx={{ color: 'black', m: 1, width:"100%", display: "flex", justifyContent:"start" }}
                    component={Link}
                    to={'/dashboard'}
                >
                    Dashboard
                </Button>
                <Button
                    variant='text'
                    sx={{ color: 'black', m: 1, width:"100%", display: "flex", justifyContent:"start"  }}
                >
                    Informações da conta
                </Button>
                <Button
                    variant='text'
                    sx={{ color: 'black', m: 1, width:"100%", display: "flex", justifyContent:"start"  }}
                    component={Link}
                    to={'/orders'}
                >
                    Vendas
                </Button>
                <Button
                    variant='text'
                    sx={{ color: 'black', m: 1, width:"100%", display: "flex", justifyContent:"start"  }}
                    component={Link}
                    to={'/users'}
                >
                    Usuários
                </Button>
            </Grid2>
        </Grid2>
    );
};

export default AdminSidenavComponent;