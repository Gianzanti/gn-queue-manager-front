import { Card, Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';
import pkg from '../../package.json' assert { type: 'json' };
import { REFRESH_SECONDS } from '../constants';

type PageHeaderProps = {
    title: string;
    Icon: ReactNode;
    checkTime?: string;
    offlineOffset?: number;
};
const PageHeader = ({ title, Icon, checkTime, offlineOffset }: PageHeaderProps) => {
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

                {checkTime && (
                    <Typography variant='subtitle2' component='div'>
                        {`Checagem dos players realizada em: ${checkTime} (atualização automática a cada ${
                            REFRESH_SECONDS / 60
                        } minuto(s))`}
                    </Typography>
                )}
                {(offlineOffset ?? 0) > 0 && (
                    <Typography variant='subtitle2' component='div'>
                        {`Players são considerados offline após ${offlineOffset} horas sem troca de comunicação com o servidor`}
                    </Typography>
                )}
            </Card>
        </Paper>
    );
};

export default PageHeader;
