// import RouterIcon from '@mui/icons-material/Router';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import GNIcon from '../components/icons/GNIcon';
import Beltone from './Beltone';
import Resound from './Resound';

function App() {
    const [customer, setCustomer] = useState<string | null>(null);

    if (customer === 'Resound') {
        return <Resound />;
    } else if (customer === 'Beltone') {
        return <Beltone />;
    }
    return (
        <Paper elevation={0} sx={{ padding: 1, margin: 0 }}>
            <PageHeader title='Players Status' Icon={<GNIcon width={40} />} />
            <Button variant='contained' color='primary' onClick={() => setCustomer('Resound')}>
                Resound
            </Button>
            <Button variant='contained' color='primary' onClick={() => setCustomer('Beltone')}>
                Beltone
            </Button>
        </Paper>
    );
}

export default App;
