import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { REFRESH_SECONDS } from './constants';
import Beltone from './pages/Beltone';
import Resound from './pages/Resound';
import VisitorTable from './pages/VisitorTable';
import { theme } from './services/providers/themes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: (REFRESH_SECONDS + 30) * 1000,
            gcTime: Infinity,
            refetchInterval: REFRESH_SECONDS * 1000,
            refetchOnWindowFocus: false,
        },
    },
});

const router = createBrowserRouter([
    { path: '/beltone', element: <Beltone /> },
    { path: '/resound', element: <Resound /> },
    { path: '/', element: <VisitorTable /> },
]);

const rootElement = document.getElementById('root');
if (rootElement && !rootElement?.innerHTML) {
    createRoot(rootElement).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline enableColorScheme={true} />
                    <RouterProvider router={router} />
                    <ReactQueryDevtools buttonPosition='bottom-right' />
                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>,
    );
}
