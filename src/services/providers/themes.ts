import { createTheme } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import { MAIN_COLOR_RESOUND } from '../../constants';

export const resound_theme = createTheme(
    {
        palette: {
            mode: 'light',
            primary: {
                main: MAIN_COLOR_RESOUND,
            },
        },
    },
    ptBR,
);

export const beltone_theme = createTheme(
    {
        palette: {
            mode: 'dark',
            // primary: {
            //     main: '#fff',
            // },
            // text: {
            //     primary: '#fff',
            // },
        },
    },
    ptBR,
);
