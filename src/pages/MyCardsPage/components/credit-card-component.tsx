import {Card, CardContent, CardHeader, Chip, Typography} from "@mui/material";
import React from "react";

interface CreditCardComponentProps{
    creditCard: {
        id: number,
        cardName: string,
        cardNumber: string,
        cardCode: string,
        cardFlag: string,
        mainCard: string
    }
}

const CreditCardComponent: React.FC<CreditCardComponentProps> = ({creditCard}) => {

    return (
        <Card variant="outlined" key={creditCard.id} sx={{width:320, borderRadius:3}}>
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