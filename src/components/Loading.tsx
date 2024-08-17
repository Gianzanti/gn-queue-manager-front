import { CircularProgress } from '@mui/material';

type LoadingProps = {
    size: number;
};
export const Loading = ({ size }: LoadingProps) => {
    return (
        <CircularProgress
            size={size}
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `${-size / 2}px`,
                marginLeft: `${-size / 2}px`,
            }}
        />
    );
};
