import { Card, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';
import pkg from '../../package.json' assert { type: 'json' };

type PageHeaderProps = {
    title: string;
    Icon: ReactNode;
};
const PageHeader = ({ title, Icon }: PageHeaderProps) => {
    return (
        <Paper elevation={1} sx={{ display: 'flex', mb: 2 }}>
            <Card
                sx={{
                    padding: 2,
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: '#ffffff',
                    display: 'flex',

                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {Icon}
            </Card>
            <Card
                sx={{
                    padding: 1,
                    gap: 3,
                }}
                elevation={0}
            >
                <Typography variant='h6' alignSelf={'baseline'} component='span'>
                    {title ?? ''}
                </Typography>
                <Typography variant='caption' alignSelf={'baseline'} component='span' ml={2}>
                    {`v.${pkg.version}`}
                </Typography>
            </Card>
        </Paper>
    );
};

export default PageHeader;
