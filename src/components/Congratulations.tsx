import { Box, Typography } from '@mui/material';
import { FC } from 'react';

type FSMessageProps = {
    message: string;
};

const FSMessage: FC<FSMessageProps> = ({ message }) => {
    // const [showButton, setShowButton] = useState(false);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowButton(true);
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 1,
                }}
            />
            <Box
                sx={{
                    zIndex: 2,
                    position: 'relative',
                    textAlign: 'center',
                }}
            >
                {/* {showButton ? (
                    <Button variant='contained' color='primary' size='large'>
                        {btnCaption}
                    </Button>
                ) : ( */}
                <Typography variant='h2' color='black'>
                    {message}
                </Typography>
                {/* )} */}
            </Box>
        </Box>
    );
};

export default FSMessage;
