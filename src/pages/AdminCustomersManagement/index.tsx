import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useEffect } from 'react';
import AdminSidenavComponent from '../../shared/AdminSidenavComponent';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useApi } from '../../hooks/useApi';
import { ResponseCustomer } from '../../utils/types/ResponseCustomer';
import { Pageable } from '../../utils/types/Pageable';

interface AdminCustomersManagementGridColDef{
   field: string;
   headerName: string;
   width: number;
}

interface AdminCustomersManagementRows{
   id: number;
   fullName: string;
   cpf: string;
   birthDate: string;
   ranking: string;
   role: string;
}

const AdminCustomersManagement: React.FC = () => {
   const [customersRows, setCustomersRows] = React.useState<AdminCustomersManagementRows[]>([]);
   const [paginationModel, setPaginationModel] = React.useState({
      pageSize: 10,
      page: 0,
   });
   const [pageableObj, setPageableObj] = React.useState({} as Pageable);
   const [isLoading, setIsLoading] = React.useState(false);

   const api = useApi();

   const usersTableColumns: GridColDef<AdminCustomersManagementGridColDef>[] = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'fullName', headerName: 'Nome completo', width: 200 },
      { field: 'cpf', headerName: 'CPF', width: 200 },
      {
        field: 'birthDate',
        headerName: 'Data de nascimento',
        width: 200,
      },
      {
        field: 'ranking',
        headerName: 'Ranking',
        width: 200,
      },
      {
        field: 'role',
        headerName: 'Tipo de usuário',
        width: 200,
      },
   ];

   const handlePageChange = (newPaginationModel: any) => {
      setPaginationModel(newPaginationModel);
      getCustomersInfo(newPaginationModel.page, newPaginationModel.pageSize);
   }

   const getCustomersInfo = async (page: number, pageSize: number) => {
      setIsLoading(true);

      const response = await api.listAllCustomers(page, pageSize);

      setCustomersRows(response.content.map((customer: ResponseCustomer) => {
         return {
            id: customer.id,
            fullName: customer.fullName,
            cpf: customer.cpf,
            birthDate: customer.birthDate,
            ranking: customer.ranking,
            role: customer.userRole
         }
      }));
      setPageableObj(response.pageable);
      setIsLoading(false);
   };

   useEffect(() => {
      getCustomersInfo(paginationModel.page, paginationModel.pageSize);
   }, []);

   return(
      <>
         <Grid2 container xs={12} sx={{mb:30}}>
            <Grid2 xs={12} sx={{ pl: 32,  mt: 5}}>
                <Typography fontFamily={'Public Sans'} fontSize={40} sx={{mb: 5, ml: 4}}>
                    Usuários
                </Typography>
            </Grid2>
            <AdminSidenavComponent/>
            <Grid2 xs sx={{
               mr:10,
               gap: '20px',
               marginTop: '20px'
            }}>
               <DataGrid
                  autoHeight
                  rows={customersRows}
                  columns={usersTableColumns}
                  paginationModel={paginationModel}
                  onPaginationModelChange={handlePageChange}
                  pageSizeOptions={[5, 10, 20]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  loading={isLoading}
               />
            </Grid2>
         </Grid2>
      </>
   )
};

export default AdminCustomersManagement;