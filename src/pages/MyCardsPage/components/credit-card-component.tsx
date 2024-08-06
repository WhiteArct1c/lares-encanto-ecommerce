import {Card, CardContent, CardHeader, Chip, Typography} from "@mui/material";
import React from "react";
import {CreditCardRequest} from "../../../utils/types/request/customer-credit-card/CreditCardRequest.ts";

interface CreditCardComponentProps{
    creditCard: CreditCardRequest,
}

const CreditCardComponent: React.FC<CreditCardComponentProps> = ({creditCard}) => {

    const mainCardBorderStyle = creditCard.mainCard ? '1px solid #2d2d2d' : ''

    return (
        <Card variant="outlined" key={creditCard.id} sx={{width:320, borderRadius:2, border:`${mainCardBorderStyle}`}}>
            <CardHeader
                title={creditCard.cardName}
                subheader={creditCard.cardFlag}
           />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    {creditCard.cardNumber}
                    {creditCard.mainCard &&
                        <Chip
                            label="Principal"
                            sx={{bgcolor:'#484646', color:'#fff'}}
                        />
                    }
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CreditCardComponent;