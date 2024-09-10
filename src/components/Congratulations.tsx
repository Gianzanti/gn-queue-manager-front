import { Box } from '@mui/material';
import { FC } from 'react';
import final_beltone from '../assets/final_beltone.png';
import final_resound from '../assets/final_resound.png';

type FSMessageProps = {
    customer: string;
};

const FSMessage: FC<FSMessageProps> = ({ customer }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundImage:
                    customer === 'Resound' ? `url(${final_resound})` : `url(${final_beltone})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}
        />
    );
};

export default FSMessage;
