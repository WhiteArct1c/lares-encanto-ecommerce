import React, {ChangeEvent, useContext, useState} from 'react';
import {
    Button,
    DialogActions,
    FormControlLabel, FormGroup,
    InputAdornment,
    styled,
    Switch,
    SwitchProps,
    TextField
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {getCardFlag} from "../../../utils/getCardFlag.ts";
import {AuthContext} from "../../../contexts/Auth/AuthContext.tsx";
import {toast} from "react-toastify";
import {CreateCardRequest} from "../../../utils/types/request/customer-credit-card/CreateCardRequest.ts";
import {ResponseAPI} from "../../../utils/types/response/ResponseAPI.ts";
import {CREATED} from "../../../utils/types/apiCodes.ts";

const createCardSchema = z.object({
    cardNumber: z.coerce.number({
        invalid_type_error: 'Este campo deve conter apenas números!'
    })
        .min(1, 'O número do cartão deve conter 16 dígitos!'),
    cardName: z.string()
        .min(1, 'Este campo é obrigatório'),
    cardCode: z.coerce.number({
        invalid_type_error: 'Este campo deve conter apenas números!'
    })
        .min(1, 'O código de segurança do cartão é obrigatório!')
});

type CreateCardFormData = z.infer<typeof createCardSchema>;

interface CreateCardFormProps{
    handleClose: () => void;
    handleCardAdded: () => void;
}

const CreateCardForm: React.FC<CreateCardFormProps> = ({ handleClose, handleCardAdded }) => {
    const [flag, setFlag] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const auth = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<CreateCardFormData>({
        resolver: zodResolver(createCardSchema),
    });

    const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsDefault(event.target.checked);
    };

    const handleCardNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const cardFlag = getCardFlag(value);
        setFlag(cardFlag);
    };

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

    const createCard = (data: CreateCardFormData) => {
        if(flag === 'Bandeira inválida'){
            toast.error('A bandeira do cartão é inválida!');
            return;
        }

        if(auth.user){
            const request: CreateCardRequest = {
                token: localStorage.getItem('authToken'),
                cardNumber: data.cardNumber,
                cardName: data.cardName,
                cardCode: data.cardCode,
                mainCard: isDefault,
                cardFlag: flag
            }

            auth.createCreditCard(request).then((response: ResponseAPI) => {
                if(response.code === CREATED){
                    toast.success(response.message);
                    handleClose();
                    handleCardAdded();
                }else{
                    toast.error(response.message);
                }
            })
        }
    };

    return (
        <Grid2 xs
               component={'form'}
               sx={{display: 'flex', flexDirection:'column', gap:2, mt:1, width:'500px'}}
               onSubmit={handleSubmit(createCard)}
        >
            <TextField
                fullWidth
                variant='outlined'
                label='Número do cartão'
                data-cy="txt-card-number"
                required
                {...register('cardNumber')}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>{flag}</InputAdornment>
                }}
                InputLabelProps={{
                    shrink: true
                }}
                error={!!errors.cardNumber}
                helperText={errors?.cardNumber?.message}
                onChange={handleCardNumberChange}
            />
            <TextField
                fullWidth
                variant='outlined'
                label='Nome impresso no cartão'
                data-cy="txt-card-name"
                required
                {...register('cardName')}
                InputLabelProps={{
                    shrink: true,
                }}
                error={!!errors.cardName}
                helperText={errors?.cardName?.message}
            />
            <TextField
                fullWidth
                variant='outlined'
                data-cy="txt-card-code"
                label='CVC'
                required
                {...register('cardCode')}
                InputLabelProps={{
                    shrink: true,
                }}
                error={!!errors.cardCode}
                helperText={errors?.cardCode?.message}
            />
            <FormGroup sx={{display:'flex', flexDirection:'row', alignItems:'center', ml:1}}>
                <FormControlLabel
                    control={<IOSSwitch data-cy="switcher-main-card" checked={isDefault} onChange={handleSwitchChange} sx={{ m: 1 }}/>}
                    label="Definir como principal"
                />
            </FormGroup>
            <DialogActions>
                <Button data-cy="btn-cancel-add-card" onClick={handleClose}>Cancelar</Button>
                <Button data-cy="btn-confirm-add-card" type='submit'>Adicionar</Button>
            </DialogActions>
        </Grid2>
    );
}

export default CreateCardForm;