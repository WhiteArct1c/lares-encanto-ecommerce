import {
   Box,
   Button,
   Chip,
   Dialog, DialogActions,
   DialogContent, DialogContentText,
   DialogTitle,
   Divider, FormControlLabel, FormGroup, FormHelperText, FormLabel,
   IconButton, InputAdornment, MenuItem, Radio, RadioGroup,
   styled,
   Switch,
   SwitchProps,
   TextField,
   Tooltip,
   Typography
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, {FocusEvent, useContext, useState} from 'react';
import {AuthContext} from "../../contexts/Auth/AuthContext.tsx";
import {Controller, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {Address} from "../../utils/types/Address.ts";
import {extractAddressType, extractLogradouroWithoutType, formatCEP} from "../../services/address/AddressService.ts";
import axios from "axios";
import {IAddressViaCEP} from "../../utils/interfaces/IAddressViaCEP.ts";
import {toast} from "react-toastify";
import {IUpdateCustomer} from "../../utils/interfaces/request/IUpdateCustomer.ts";
import {IUpdatePasswordRequest} from "../../utils/interfaces/request/IUpdatePasswordRequest.ts";
import {IAddCustomerAddressRequest} from "../../utils/interfaces/request/IAddCustomerAddressRequest.ts";
import {Add, Delete, Edit, Visibility, VisibilityOff} from "@mui/icons-material";
import {countries, tiposDeResidencia} from "../../utils/addressTypes.ts";
import MyProfileSidenavComponent from '../../shared/MyProfileSidenavComponent';
import {IUpdateAddressRequest} from "../../utils/interfaces/request/IUpdateAddressRequest.ts";
import { addressCategoryTranslate } from '../../utils/addressCategoryTranslate.ts';
import { CREATED, OK } from '../../utils/types/apiCodes.ts';

interface MyProfilePageProps {

}

const MyProfilePage: React.FC<MyProfilePageProps> = () => {

   const auth = useContext(AuthContext);
   const {
      register,
      handleSubmit,
      getValues,
      setValue,
      setFocus,
      formState:{
         errors
      },
      reset,
      control,
      watch
   } = useForm();

   const navigate = useNavigate();

   const [open, setOpen] = useState(false);
   const [titleDialog, setTitleDialog] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [selectedAddress, setSelectedAddress] = useState<Address>();
   const [radioValue, setRadioValue] = useState(auth.user!.gender.name);

   const [isDelivery, setIsDelivery] = useState(true);
   const [isBilling, setIsBilling] = useState(true);

   const cepField = register('cep', { required: true, maxLength: 8, minLength: 8 });
   const patternCPF = /^([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;

   const IOSSwitch = styled((props: SwitchProps) => (
      <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
   ))(({ theme }) => ({
      width: 42,
      height: 26,
      padding: 0,
      '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#000',
                  opacity: 1,
                  border: 0,
              },
              '&.Mui-disabled + .MuiSwitch-track': {
                  opacity: 0.5,
              },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
              color: '#000   ',
              border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
              color:
                  theme.palette.mode === 'light'
                      ? theme.palette.grey[600]
                      : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
              opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
      },
      '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
      },
      '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#C2C2C2' : '#C2C2C2',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
              duration: 500,
          }),
      },
  }));

   const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>, addressType: string) => {
      switch (addressType) {
         case 'DELIVERY':
            setIsDelivery(event.target.checked);
            break;
         case 'BILLING':
            setIsBilling(event.target.checked);
            break;
         default:
            break;
      }
   };

   const handleFillAddress = async (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value !== '') {
         const formattedCEP = formatCEP(event.target.value);
         await axios({
            method: "get",
            url: `${import.meta.env.VITE_API_VIA_CEP}${formattedCEP}/json/`
         })
             .then((res: IAddressViaCEP) => {
                setValue('addressType', extractAddressType(res.data.logradouro));
                setValue('streetName', extractLogradouroWithoutType(res.data.logradouro));
                setValue('city', res.data.localidade);
                setValue('state', res.data.uf);
                setValue('neighborhoods', res.data.bairro);
                setFocus('addressNumber');
             })
             .catch(e => {
                toast.error('CEP inválido ou inexistente!');
                console.log(e);
             });
      }
   }

   const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRadioValue((event.target as HTMLInputElement).value);
   };

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const handleClickOpenDialog = (value: string, address?: Address) => {
      if(value !== 'Excluir endereço'){
         reset();
      }
      setTitleDialog(value)
      setOpen(true);
      setSelectedAddress(address);

   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleUpdateCustomer = async () => {
      const updatedCustomer: IUpdateCustomer = {
         token: localStorage.getItem('authToken')!,
         fullName: getValues().fullName as string | undefined || '',
         cpf: getValues().cpf as string | undefined || '',
         birthDate: getValues().birthDate as string | undefined || '',
         phone: getValues().phone as string | undefined || '',
         gender: radioValue
      }

      const response = await auth.updateCustomer(updatedCustomer);

      if(response.code === '200 OK'){
         handleClose();
         window.location.reload();
         toast.success(response.message);
      }else{
         toast.error(response.message);
      }
   }

   const handleUpdatePassword = async () => {
      const updatedPassword: IUpdatePasswordRequest = {
         token: localStorage.getItem('authToken')!,
         password:  getValues().password as string | undefined || '',
         confirmedPassword:  getValues().confirmedPassword as string | undefined || ''
      }

      const response = await auth.updatePassword(updatedPassword);

      if(response.code === '200 OK'){
         toast.success(response.message);
         handleClose();
         reset();
      }else{
         toast.error(response.message);
      }

   }

   const handleInativateAccount = async () => {
      const response = await auth.deactivateAccount(localStorage.getItem('authToken')!);
      if(response.code === '200 OK'){
         handleClose();
         auth.signout();
         // eslint-disable-next-line no-self-assign
         window.location.href = window.location.href;
         navigate('/login');
         toast.success(response.message);
      }else{
         toast.error(response.message);
      }
   }

   const handleAddAddress = async () => {
      const categories: string[] = [];

      if(isDelivery)
         categories.push('ENTREGA');
      if(isBilling)
         categories.push('COBRANÇA');

      const addressSaveRequest: IAddCustomerAddressRequest = {
         token: localStorage.getItem('authToken')!,
         address:{
            title: getValues().addressTitle as string | undefined || '',
            cep: getValues().cep as string | undefined || '',
            residenceType: getValues().residenceType as string | undefined || '',
            addressType: getValues().addressType as string | undefined || '',
            addressCategories: categories,
            streetName: getValues().streetName as string | undefined || '',
            addressNumber: getValues().addressNumber as string | undefined || '',
            neighborhoods: getValues().neighborhoods as string | undefined || '',
            city: getValues().city as string | undefined || '',
            state: getValues().state as string | undefined || '',
            country: getValues().country as string | undefined || '',
            observations: getValues().observations as string | undefined || ''
         }
      }
      
      const response = await auth.registerCustomerAddress(addressSaveRequest);

      if(response.code === OK){
         handleClose();
         navigate(0);
         toast.success(response.message);
      }else{
         toast.error(response.message);
      }

   }

   const handleUpdateAddress = async() => {
      const categories: string[] = [];

      if(isDelivery)
         categories.push('ENTREGA');
      if(isBilling)
         categories.push('COBRANÇA');

      const addressUpdateRequest: IUpdateAddressRequest = {
         token: localStorage.getItem('authToken')!,
         address:{
            id: selectedAddress?.id as string | undefined || '',
            title: getValues().addressTitle as string | undefined || '',
            cep: getValues().cep as string | undefined || '',
            residenceType: getValues().residenceType as string | undefined || '',
            addressType: getValues().addressType as string | undefined || '',
            addressCategories: categories,
            streetName: getValues().streetName as string | undefined || '',
            addressNumber: getValues().addressNumber as string | undefined || '',
            neighborhoods: getValues().neighborhoods as string | undefined || '',
            city: getValues().city as string | undefined || '',
            state: getValues().state as string | undefined || '',
            country: getValues().country as string | undefined || '',
            observations: getValues().observations as string | undefined || ''
         }
      }

      const response = await auth.updateCustomerAddress(addressUpdateRequest);

      if(response.code === '200 OK'){
         navigate(0);
         handleClose();
         toast.success(response.message);
      }else{
         toast.error(response.message);
      }
   }

   const handleDeleteAddress = async () => {
      const response = await auth.deleteCustomerAddress(selectedAddress!);
      if(response.code === '200 OK'){
         navigate(0);
         handleClose();
         toast.success(response.message);
      }else{
         toast.error(response.message);
      }
   }

   return (
       <Grid2 container xs={12}>
          <Grid2 xs={12} sx={{ pl: 2,  mt: 17}}>
             <Typography fontFamily={'Public Sans'} fontSize={40} sx={{mb: 10, ml: 3}}>
                Minhas Informações
             </Typography>
          </Grid2>

          <MyProfileSidenavComponent/>

          <Grid2 xs={4} sx={{ display: 'flex', gap: 7, justifyContent: 'center', flexDirection: 'column' }}>
             <Grid2 sx={{ display: 'flex', gap: 7, justifyContent: 'center' }}>
                <Grid2 sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} >
                   <Typography fontFamily={'Public Sans'} fontWeight={600}>
                      Nome completo:
                   </Typography>
                   <Typography component={'span'}>{auth.user?.fullName}</Typography>
                   <Typography fontFamily={'Public Sans'} fontWeight={600}>
                      CPF:
                   </Typography>
                   <Typography>{auth.user?.cpf}</Typography>
                   <Typography fontFamily={'Public Sans'} fontWeight={600}>
                      Data de nascimento:
                   </Typography>
                   <Typography>{auth.user?.birthDate}</Typography>
                </Grid2>
                <Grid2 sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                   <Typography fontFamily={'Public Sans'} fontWeight={600}>
                      Telefone:
                   </Typography>
                   <Typography>{auth.user?.phone}</Typography>
                   <Typography fontFamily={'Public Sans'} fontWeight={600}>
                      Sexo:
                   </Typography>
                   <Typography>{auth.user?.gender.name}</Typography>
                </Grid2>
             </Grid2>
             <Grid2 sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }} xs={12}>
                <Button
                    variant='contained'
                    sx={{
                       bgcolor: '#000',
                       color: 'white',
                       fontSize: 15,
                       width: 300,
                       height: 50,
                       '&:hover': {
                          bgcolor: '#5a5a5a',
                          color: '#000',
                       }
                    }}
                    onClick={() => handleClickOpenDialog("Editar dados pessoais")}
                >
                   Editar dados pessoais
                </Button>
                <Button
                    variant='contained'
                    sx={{
                       bgcolor: '#fff',
                       color: '#000',
                       fontSize: 15,
                       width: 300,
                       height: 50,
                       '&:hover': {
                          bgcolor: '#5a5a5a',
                          color: '#fff',
                       }
                    }}
                    onClick={() => handleClickOpenDialog("Alterar senha")}
                >
                   Alterar senha
                </Button>
                <Button
                    variant='text'
                    sx={{
                       color: '#000',
                       fontSize: 15,
                       width: 300,
                       height: 50,
                       '&:hover': {
                          color: '#999'
                       }
                    }}
                    onClick={() => handleClickOpenDialog("Inativar conta")}
                >
                   Inativar conta
                </Button>
             </Grid2>
          </Grid2>

          <Divider orientation="vertical" variant='middle' flexItem />

          <Grid2 xs={5} sx={{ml:2}}>
             <Grid2 sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography fontFamily={'Public Sans'} fontSize={35}>Meus Endereços</Typography>
                <Tooltip title='Adicionar endereços'>
                   <IconButton sx={{width:50}} onClick={() => handleClickOpenDialog('Adicionar endereço')}>
                      <Add fontSize='large'/>
                   </IconButton>
                </Tooltip>
             </Grid2>
             <Divider sx={{mb:3}}/>
             <Grid2 sx={{overflowY:'scroll', p:1, height:450}}>
                {auth.user?.addresses.map((address, index) => {
                   return(
                       <Grid2 sx={{border:'1px solid #111', borderRadius:1, p:2, mb:2}} key={index}>
                          <Grid2 sx={{display:'flex', justifyContent:'space-between'}}>
                             <Typography fontFamily={'Public Sans'} fontSize={25} sx={{display:'flex', alignItems:'center'}}>
                                 {address.title}
                                 &nbsp;
                                 -
                                 {
                                       address.categories.map((category, index) => (
                                          <Chip
                                             key={index}
                                             data-cy="chip-address-category"
                                             component={'span'}
                                             label={addressCategoryTranslate(category).toLocaleLowerCase()}
                                             sx={{bgcolor:'#484646', color:'#fff', width: 80, ml: 1}}
                                          />
                                       ))
                                    }
                              </Typography>
                             <Box>
                                <Tooltip title='Excluir endereço'>
                                   <IconButton onClick={() => handleClickOpenDialog('Excluir endereço', address)}>
                                      <Delete/>
                                   </IconButton>
                                </Tooltip>
                                <Tooltip title='Editar endereço'>
                                   <IconButton onClick={() => handleClickOpenDialog('Editar endereço', address)}>
                                      <Edit/>
                                   </IconButton>
                                </Tooltip>
                             </Box>
                          </Grid2>
                          <Divider sx={{mb:2}}/>
                          <Grid2 xs={12} sx={{display:'flex'}}>
                             <Grid2 xs>
                                <Typography fontFamily={'Public Sans'} fontWeight={600}>Tipo de logradouro:</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={400}>{address.addressType}</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={600}>CEP:</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={400}>{address.cep}</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={600}>Logradouro:</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={400}>{address.streetName}</Typography>                             
                             </Grid2>
                             <Grid2 xs>
                                <Typography fontFamily={'Public Sans'} fontWeight={600}>Tipo de residência:</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={400}>{address.residenceType}</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={600}>Número:</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={400}>{address.addressNumber}</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={600}>Bairro:</Typography>
                                <Typography fontFamily={'Public Sans'} fontWeight={400}>{address.neighborhoods}</Typography>
                             </Grid2>
                          </Grid2>
                       </Grid2>
                   )
                })}
             </Grid2>
          </Grid2>

          <Dialog open={open} onClose={handleClose}>
             <DialogTitle>{titleDialog}</DialogTitle>
             <DialogContent>
                {
                   titleDialog === 'Editar dados pessoais' ?
                       <Grid2 component={'form'} sx={{display: 'flex', flexDirection:'column', gap:2, mt:1}}>
                          <Grid2 xs={6}>
                             <TextField
                                 fullWidth
                                 variant='outlined'
                                 label='Nome completo'
                                 defaultValue={auth.user?.fullName}
                                 required
                                 InputLabelProps={{
                                    shrink: true,
                                 }}
                                 {...register("fullName", { required: true })}
                                 error={errors?.fullName?.type === 'required'}
                                 helperText={errors?.fullName?.type === 'required' ? "O nome completo é obrigatório." : ""}
                             />
                          </Grid2>
                          <Grid2 xs={6}>
                             <TextField
                                 fullWidth
                                 variant='outlined'
                                 label='CPF'
                                 defaultValue={auth.user?.cpf}
                                 required
                                 InputLabelProps={{
                                    shrink: true,
                                 }}
                                 {...register("cpf", { required: true, maxLength: 11, minLength: 11, pattern: patternCPF })}
                                 error={
                                    errors?.cpf?.type === 'required' ||
                                     errors?.cpf?.type === 'maxLength' ||
                                     errors?.cpf?.type === 'minLength'
                                 }
                                 helperText={
                                    errors?.cpf?.type === 'required' ? "O CPF é obrigatório." :
                                        errors?.cpf?.type === 'maxLength' ? "O CPF deve ter apenas 11 dígitos." :
                                            errors?.cpf?.type === 'minLength' ? "O CPF deve ter apenas 11 dígitos." : ""
                                 }
                             />
                          </Grid2>
                          <Grid2 xs={6}>
                             <TextField
                                 fullWidth
                                 label='Data de nascimento'
                                 defaultValue={auth.user?.birthDate}
                                 InputLabelProps={{
                                    shrink: true,
                                 }}
                                 type='date'
                                 required
                                 {...register("birthDate", { required: true })}
                                 error={errors?.birthDate?.type === 'required'}
                                 helperText={errors?.birthDate?.type === 'required' ? "A data de nascimento é obrigatória" : ""}
                             />
                          </Grid2>
                          <Grid2 xs={6}>
                             <TextField
                                 fullWidth
                                 variant='outlined'
                                 label='Telefone Celular'
                                 required
                                 InputLabelProps={{
                                    shrink: true,
                                 }}
                                 defaultValue={auth.user?.phone}
                                 {...register("phone", { required: true })}
                                 error={errors?.phone?.type === 'required'}
                                 helperText={errors?.phone?.type === 'required' ? "O número de telefone celular é obrigatório" : ""}
                             />
                          </Grid2>
                          <Grid2
                              xs={12}
                              sx={{
                                 display: "flex",
                                 flexDirection: "row",
                                 alignItems: "center"
                              }}
                          >
                             <FormLabel
                                 id="demo-row-radio-buttons-group-label"
                                 sx={{
                                    mr: "10px",
                                    display: "flex",
                                    alignItems: "center"
                                 }}
                             >
                                Sexo:
                             </FormLabel>
                             <Controller
                                 control={control}
                                 name="gender"
                                 defaultValue={auth.user?.gender.name}
                                 render={({ field }) => (
                                     <RadioGroup
                                         {...field}
                                         row
                                         value={radioValue}
                                         onChange={handleRadioChange}
                                     >
                                        <FormControlLabel value="MASCULINO" control={<Radio />} label="Masculino" />
                                        <FormControlLabel value="FEMININO" control={<Radio />} label="Feminino" />
                                        <FormControlLabel value="OUTROS" control={<Radio />} label="Outros" />
                                     </RadioGroup>
                                 )}
                             />
                          </Grid2>
                       </Grid2>
                       : titleDialog === 'Alterar senha' ?
                           <Grid2 component={'form'} sx={{display: 'flex', flexDirection:'column', gap:2, mt:1}}>
                              <TextField
                                  fullWidth
                                  label='Senha'
                                  type={showPassword ? 'text' : 'password'}
                                  InputLabelProps={{
                                     shrink: true,
                                  }}
                                  required
                                  {...register("password", { required: true, minLength: 8 })}
                                  error={
                                     errors?.password?.type === 'required' ||
                                      errors?.password?.type === 'minLength'
                                  }
                                  helperText={
                                     errors?.cpf?.type === 'required' ? "A senha é obrigatória." :
                                         errors?.cpf?.type === 'minLength' ? "A senha deve ter no mínimo 8 dígitos." : ""
                                  }
                                  InputProps={{
                                     endAdornment:
                                         <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                               {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                         </InputAdornment>
                                  }}
                              />
                              <TextField
                                  fullWidth
                                  label='Repetir Senha'
                                  type={showPassword ? 'text' : 'password'}
                                  InputLabelProps={{
                                     shrink: true,
                                  }}
                                  required
                                  {...register("confirmedPassword",
                                      {
                                         required: true,
                                         validate: (val: string) => {
                                            if (val !== watch('password')) return "no-equal";
                                         }
                                      }
                                  )}
                                  error={
                                     errors?.confirmedPassword?.message === 'no-equal'
                                  }
                                  helperText={errors?.confirmedPassword?.message === 'no-equal' ? "As senhas devem ser iguais!" : ""}
                                  InputProps={{
                                     endAdornment:
                                         <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                               {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                         </InputAdornment>
                                  }}
                              />
                           </Grid2>
                           : titleDialog === 'Inativar conta' ?
                               <DialogContentText>
                                  Ao inativar sua conta, só será possível ativa-lá novamente por meio de solicitação ao administrador do sistema.
                                  Tem certeza que deseja inativar sua conta?
                               </DialogContentText>
                               : titleDialog === 'Adicionar endereço' ?
                                   <Grid2 container sx={{width: '100%', mt:1}} spacing={2} component={'form'}>
                                      <Grid2 xs={12}>
                                         <TextField
                                             fullWidth
                                             variant='outlined'
                                             label='Titulo do endereço'
                                             placeholder="Casa principal, Loja A, etc..."
                                             multiline
                                             required
                                             {...register("addressTitle", { required: true })}
                                             error={errors?.addressTitle?.type === 'required'}
                                             helperText={errors?.addressTitle?.type === 'required' ? "O título do endereço é obrigatório" : ""}
                                         />
                                      </Grid2>
                                      <Grid2 xs={4}
                                             onBlur={(e) => {
                                                cepField.onBlur(e);
                                                if (e.target instanceof HTMLInputElement) {
                                                   handleFillAddress(e as FocusEvent<HTMLInputElement>);
                                                }
                                             }}
                                      >
                                         <TextField
                                             fullWidth
                                             variant='outlined'
                                             label='CEP'
                                             required
                                             {...cepField}
                                             error={
                                                errors?.cep?.type === 'required'
                                                 || errors?.cep?.type === 'maxLength'
                                             }
                                             helperText={
                                                errors?.cep?.type === 'required' ? "O CEP é obrigatório" :
                                                    errors?.cep?.type === 'maxLength' ? "O CEP deve conter 8 dígitos" : ""
                                             }
                                         />
                                      </Grid2>
                                      <Grid2 xs={5}>
                                         <TextField
                                             fullWidth
                                             select
                                             label='Tipo de Residência'
                                             defaultValue={"Casa"}
                                             required
                                             {...register("residenceType", { required: true })}
                                         >
                                            {tiposDeResidencia.map((tipo, index) => (
                                                <MenuItem key={index} value={tipo}>{tipo}</MenuItem>
                                            ))}
                                         </TextField>
                                         {errors?.residenceType?.type === 'required' && <FormHelperText>O tipo de residência é obrigatório</FormHelperText>}
                                      </Grid2>
                                      <Grid2 xs={3}>
                                         <TextField
                                             fullWidth
                                             label='Tipo logradouro'
                                             required
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             {...register("addressType", { required: true })}
                                             error={errors?.addressType?.type === 'required'}
                                             helperText={errors?.addressTyp?.type === 'required' ? "O tipo de endereço é obrigatório" : ""}
                                         />
                                      </Grid2>
                                      <Grid2 xs={9}>
                                         <TextField
                                             fullWidth
                                             variant='outlined'
                                             label='Logradouro'
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             required
                                             {...register("streetName", { required: true })}
                                             error={errors?.streetName?.type === 'required'}
                                             helperText={errors?.streetName?.type === 'required' ? "O Logradouro é obrigatório" : ""}
                                         />
                                      </Grid2>
                                      <Grid2 xs={3}>
                                         <TextField
                                             fullWidth
                                             variant='outlined'
                                             label='Número'
                                             required
                                             {...register("addressNumber", { required: true })}
                                             error={errors?.addressNumber?.type === 'required'}
                                             helperText={errors?.addressNumber?.type === 'required' ? "O Número  é obrigatório" : ""}
                                         />
                                      </Grid2>
                                      <Grid2 xs={4}>
                                         <TextField
                                             fullWidth
                                             variant='outlined'
                                             label='Bairro'
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             required
                                             {...register("neighborhoods", { required: true })}
                                             error={errors?.neighborhoods?.type === 'required'}
                                             helperText={errors?.neighborhoods?.type === 'required' ? "O Bairro é obrigatório" : ""}
                                         />
                                      </Grid2>
                                      <Grid2 xs={3}>
                                         <TextField
                                             fullWidth
                                             variant='outlined'
                                             label='Cidade'
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             required
                                             {...register("city", { required: true })}
                                             error={errors?.city?.type === 'required'}
                                             helperText={errors?.city?.type === 'required' ? "A Cidade é obrigatória" : ""}
                                         />
                                      </Grid2>
                                      <Grid2 xs={3}>
                                         <TextField
                                             fullWidth
                                             variant='outlined'
                                             label='Estado'
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             required
                                             {...register("state", { required: true })}
                                             error={errors?.state?.type === 'required'}
                                             helperText={errors?.state?.type === 'required' ? "O Estado é obrigatório" : ""}
                                         />
                                      </Grid2>
                                      <Grid2 xs={2}>
                                         <TextField
                                             fullWidth
                                             select
                                             variant='outlined'
                                             label='País'
                                             required
                                             defaultValue={"Brasil"}
                                             {...register('country', { required: true })}
                                             InputLabelProps={{
                                                shrink: true,
                                             }}
                                             error={errors?.country?.type === 'required'}
                                             helperText={errors?.country?.type === 'required' ? "O País é obrigatório" : ""}
                                         >
                                            {countries.map((country, index) => (
                                                <MenuItem key={index} value={country}>{country}</MenuItem>
                                            ))}
                                         </TextField>
                                      </Grid2>
                                      <Grid2 xs={12}>
                                         <TextField
                                             fullWidth
                                             multiline
                                             rows={4}
                                             variant='outlined'
                                             label='Observações'
                                             required
                                             {...register("observations")}
                                         />
                                      </Grid2>
                                       <Grid2 container xs={12}>
                                          <FormGroup sx={{display:'flex', flexDirection:'row', alignItems:'center', ml:1}}>
                                             <FormControlLabel
                                                   control={<IOSSwitch data-cy="switcher-delivery-address" checked={isDelivery} onChange={(event) => handleSwitchChange(event, "DELIVERY")} sx={{ m: 1 }}/>}
                                                   label="Definir como endereço de entrega"
                                             />
                                          </FormGroup>
                                          <FormGroup sx={{display:'flex', flexDirection:'row', alignItems:'center', ml:1}}>
                                             <FormControlLabel
                                                   control={<IOSSwitch data-cy="switcher-billing-address" checked={isBilling} onChange={(event) => handleSwitchChange(event, "BILLING")} sx={{ m: 1 }}/>}
                                                   label="Definir como endereço de cobrança"
                                             />
                                          </FormGroup>
                                       </Grid2>
                                   </Grid2>
                                   : titleDialog === 'Excluir endereço' ?
                                       <DialogContentText>
                                          Deseja realmente excluir o endereço selecionado?
                                       </DialogContentText>
                                   : titleDialog === 'Editar endereço' ?
                                       <Grid2 container sx={{width: '100%', mt:1}} spacing={2} component={'form'}>
                                          <Grid2 xs={12}>
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.title}
                                                 variant='outlined'
                                                 label='Titulo do endereço'
                                                 placeholder="Casa principal, Loja A, etc..."
                                                 multiline
                                                 required
                                                 {...register("addressTitle", { required: true })}
                                                 error={errors?.addressTitle?.type === 'required'}
                                                 helperText={errors?.addressTitle?.type === 'required' ? "O título do endereço é obrigatório" : ""}
                                             />
                                          </Grid2>
                                          <Grid2 xs={4}
                                                 onBlur={(e) => {
                                                    cepField.onBlur(e);
                                                    if (e.target instanceof HTMLInputElement) {
                                                       handleFillAddress(e as FocusEvent<HTMLInputElement>);
                                                    }
                                                 }}
                                          >
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.cep}
                                                 variant='outlined'
                                                 label='CEP'
                                                 required
                                                 {...cepField}
                                                 error={
                                                     errors?.cep?.type === 'required'
                                                     || errors?.cep?.type === 'maxLength'
                                                 }
                                                 helperText={
                                                    errors?.cep?.type === 'required' ? "O CEP é obrigatório" :
                                                        errors?.cep?.type === 'maxLength' ? "O CEP deve conter 8 dígitos" : ""
                                                 }
                                             />
                                          </Grid2>
                                          <Grid2 xs={5}>
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.residenceType}
                                                 select
                                                 label='Tipo de Residência'
                                                 required
                                                 {...register("residenceType", { required: true })}
                                             >
                                                {tiposDeResidencia.map((tipo, index) => (
                                                    <MenuItem key={index} value={tipo}>{tipo}</MenuItem>
                                                ))}
                                             </TextField>
                                             {errors?.residenceType?.type === 'required' && <FormHelperText>O tipo de residência é obrigatório</FormHelperText>}
                                          </Grid2>
                                          <Grid2 xs={3}>
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.addressType}
                                                 label='Tipo logradouro'
                                                 required
                                                 InputLabelProps={{
                                                    shrink: true,
                                                 }}
                                                 {...register("addressType", { required: true })}
                                                 error={errors?.addressType?.type === 'required'}
                                                 helperText={errors?.addressTyp?.type === 'required' ? "O tipo de endereço é obrigatório" : ""}
                                             />
                                          </Grid2>
                                          <Grid2 xs={9}>
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.streetName}
                                                 variant='outlined'
                                                 label='Logradouro'
                                                 InputLabelProps={{
                                                    shrink: true,
                                                 }}
                                                 required
                                                 {...register("streetName", { required: true })}
                                                 error={errors?.streetName?.type === 'required'}
                                                 helperText={errors?.streetName?.type === 'required' ? "O Logradouro é obrigatório" : ""}
                                             />
                                          </Grid2>
                                          <Grid2 xs={3}>
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.addressNumber}
                                                 variant='outlined'
                                                 label='Número'
                                                 required
                                                 {...register("addressNumber", { required: true })}
                                                 error={errors?.addressNumber?.type === 'required'}
                                                 helperText={errors?.addressNumber?.type === 'required' ? "O Número  é obrigatório" : ""}
                                             />
                                          </Grid2>
                                          <Grid2 xs={4}>
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.neighborhoods}
                                                 variant='outlined'
                                                 label='Bairro'
                                                 InputLabelProps={{
                                                    shrink: true,
                                                 }}
                                                 required
                                                 {...register("neighborhoods", { required: true })}
                                                 error={errors?.neighborhoods?.type === 'required'}
                                                 helperText={errors?.neighborhoods?.type === 'required' ? "O Bairro é obrigatório" : ""}
                                             />
                                          </Grid2>
                                          <Grid2 xs={3}>
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.city}
                                                 variant='outlined'
                                                 label='Cidade'
                                                 InputLabelProps={{
                                                    shrink: true,
                                                 }}
                                                 required
                                                 {...register("city", { required: true })}
                                                 error={errors?.city?.type === 'required'}
                                                 helperText={errors?.city?.type === 'required' ? "A Cidade é obrigatória" : ""}
                                             />
                                          </Grid2>
                                          <Grid2 xs={3}>
                                             <TextField
                                                 fullWidth
                                                 variant='outlined'
                                                 defaultValue={selectedAddress?.state}
                                                 label='Estado'
                                                 InputLabelProps={{
                                                    shrink: true,
                                                 }}
                                                 required
                                                 {...register("state", { required: true })}
                                                 error={errors?.state?.type === 'required'}
                                                 helperText={errors?.state?.type === 'required' ? "O Estado é obrigatório" : ""}
                                             />
                                          </Grid2>
                                          <Grid2 xs={2}>
                                             <TextField
                                                 fullWidth
                                                 select
                                                 variant='outlined'
                                                 defaultValue={selectedAddress?.country}
                                                 label='País'
                                                 required
                                                 {...register('country', { required: true })}
                                                 InputLabelProps={{
                                                    shrink: true,
                                                 }}
                                                 error={errors?.country?.type === 'required'}
                                                 helperText={errors?.country?.type === 'required' ? "O País é obrigatório" : ""}
                                             >
                                                {countries.map((country, index) => (
                                                    <MenuItem key={index} value={country}>{country}</MenuItem>
                                                ))}
                                             </TextField>
                                          </Grid2>
                                          <Grid2 xs={12}>
                                             <TextField
                                                 fullWidth
                                                 defaultValue={selectedAddress?.observations}
                                                 multiline
                                                 rows={4}
                                                 variant='outlined'
                                                 label='Observações'
                                                 required
                                                 {...register("observations")}
                                             />
                                          </Grid2>
                                          <Grid2 container xs={12}>
                                             <FormGroup sx={{display:'flex', flexDirection:'row', alignItems:'center', ml:1}}>
                                                <FormControlLabel
                                                   control={<IOSSwitch data-cy="switcher-delivery-address" checked={isDelivery} onChange={(event) => handleSwitchChange(event, "DELIVERY")} sx={{ m: 1 }}/>}
                                                   label="Definir como endereço de entrega"
                                                />
                                             </FormGroup>
                                             <FormGroup sx={{display:'flex', flexDirection:'row', alignItems:'center', ml:1}}>
                                                <FormControlLabel
                                                   control={<IOSSwitch data-cy="switcher-billing-address" checked={isBilling} onChange={(event) => handleSwitchChange(event, "BILLING")} sx={{ m: 1 }}/>}
                                                   label="Definir como endereço de cobrança"
                                                />
                                             </FormGroup>
                                          </Grid2>
                                       </Grid2>
                                       : <></>
                }
             </DialogContent>
             <DialogActions>
                {
                   titleDialog === 'Editar dados pessoais' ?
                       <>
                          <Button onClick={handleClose}>Cancelar</Button>
                          <Button onClick={handleUpdateCustomer}>Editar dados</Button>
                       </>
                       : titleDialog === 'Alterar senha'?
                           <>
                              <Button onClick={handleClose}>Cancelar</Button>
                              <Button onClick={handleUpdatePassword}>Alterar Senha</Button>
                           </>
                           : titleDialog === 'Inativar conta'?
                               <>
                                  <Button onClick={handleClose}>Cancelar</Button>
                                  <Button onClick={handleInativateAccount}>Inativar conta</Button>
                               </>
                               : titleDialog === 'Adicionar endereço'?
                                   <>
                                      <Button onClick={handleClose}>Cancelar</Button>
                                      <Button onClick={() => handleSubmit(handleAddAddress)()}>Adicionar endereço</Button>
                                   </>
                                   :titleDialog === 'Excluir endereço'?
                                       <>
                                          <Button onClick={handleClose}>Cancelar</Button>
                                          <Button onClick={handleDeleteAddress}>Excluir</Button>
                                       </>
                                       :titleDialog === 'Editar endereço'?
                                           <>
                                              <Button onClick={handleClose}>Cancelar</Button>
                                              <Button onClick={() => handleSubmit(handleUpdateAddress)()}>Editar endereço</Button>
                                           </>
                                       :<></>
                }
             </DialogActions>
          </Dialog>
       </Grid2>
   );
};

export default MyProfilePage;