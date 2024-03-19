import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { useContext, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/Auth/AuthContext';

interface LoginPageProps {
   
}

const LoginPage: React.FC<LoginPageProps> = () => {

   const [showPassword, setShowPassword] = useState(false);
   const [checked, setChecked] = useState(false);
   const patternEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

   const auth = useContext(AuthContext);
   const navigate = useNavigate();

   const handleClickShowPassword = () => setShowPassword((show) => !show);

   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
   };

   const {
      register,
      handleSubmit,
      control,
      formState: { errors }
   }  = useForm();

   const onSubmit = async (user: FieldValues) => {
      if(user.email && user.password){
         const data = await auth.signin(user.email, user.password);
         const role = await auth.verifyRole();
         if(data.code === '200 OK'){
             if(role.data[0] === "USER"){
                 navigate('/products');
             }else{
                 navigate('/dashboard');
             }
             toast.success(data.message);
         }else{
            toast.error(data.message);
         }  
      }
   }

   return (
      <Grid2 container spacing={2} sx={{mt:13, mb:10}} xs={12}>
         <Grid2 xs={10} sx={{display:'flex', justifyContent:'center', mb:3, ml:6}}>
            <Typography fontSize={'3.5rem'} fontFamily={'Public Sans'} fontWeight={600}>
               Login
            </Typography>
         </Grid2>
         <Grid2 xs={12} sx={{display:'flex', justifyContent:'center'}}>
            <Box
               component='form'
               sx={{
                  width:400,
                  display:'flex',
                  flexDirection:'column',
                  gap:2
               }}
            >
               <TextField
                  fullWidth
                  variant='outlined'
                  label='E-mail'
                  type='email'
                  required
                  InputLabelProps={{
                     shrink: true,
                  }}
                  {...register("email", {required: true, pattern: patternEmail})}
                  error={errors?.email?.type === 'required' || errors?.email?.type === 'pattern'}
                  helperText={
                     errors?.email?.type === 'required' ? "O email é obrigatório" :
                     errors?.email?.type === 'pattern' ? "Insira um email válido" : ""
                  }
               />
               <TextField
                  fullWidth
                  label='Senha'
                  type={showPassword ? 'text' : 'password'}
                  InputLabelProps={{
                     shrink: true,
                  }}
                  required
                  {...register("password", {required: true})}
                  error={errors?.password?.type === 'required'}
                  helperText={errors?.password?.type === 'required' ? "A senha é obrigatória" : ""}
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
               <Controller
                  control={control}
                  name='remember_password'
                  defaultValue={checked}
                  render={({field}) => (
                     <FormGroup
                        {...field}
                     >
                        <FormControlLabel control={<Checkbox checked={checked} onChange={handleChangeChecked}  />} label='Lembrar minha senha'/>
                     </FormGroup>
                  )}
               />
               <Button
                  variant='contained'
                  sx={{
                     width:"100%",
                     height: "54px",
                     bgcolor: "#000",
                     '&:hover':{
                        bgcolor:"#555"
                     }   
                  }}
                  onClick={() => handleSubmit(onSubmit)()}
               >
                  Entrar
               </Button>
               <Divider sx={{mt:5}}/>
            </Box>
         </Grid2>
         <Grid2 xs={12} sx={{display:'flex', flexDirection:'row', justifyContent:'center', gap:1, mb:4}}>
            <Typography fontFamily={'Public Sans'}>
               Novo por aqui?
            </Typography>
            <Link to='/register-user'>
               <Typography fontFamily={'Public Sans'} fontWeight={600} sx={{textDecoration:'underline'}}>Cadastre-se</Typography>
            </Link>
         </Grid2>
      </Grid2>
   );
};

export default LoginPage;