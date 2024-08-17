import { createTheme } from '@mui/material';
// import { ptBR } from '@mui/material/locale';
import { ptBR } from '@mui/x-data-grid/locales';
import { MAIN_COLOR } from '../../constants';

export const theme = createTheme(
    {
        palette: {
            mode: 'light',
            primary: {
                main: MAIN_COLOR,
            },
        },
    },
    ptBR,
);
