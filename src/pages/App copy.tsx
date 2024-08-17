// import RouterIcon from '@mui/icons-material/Router';
import { Modal } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import AllGroups from '../components/AllGroups';
import PageHeader from '../components/PageHeader';
import { Players } from '../components/Players';
import RouterIcon from '../components/icons/RouterIcon';
import usePlayers from '../hooks/usePlayers';

function App() {
    const dashData = usePlayers();
    const [open, setOpen] = useState(false);
    const [groupId, setGroupId] = useState<string>('');

    const handleOpen = (groupId: string) => {
        if (groupId !== undefined) {
            setGroupId(groupId);
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    const dataChecagem = dashData?.updateTime
        ? new Date(dashData?.updateTime).toLocaleString()
        : '';

    return (
        <Paper elevation={0} sx={{ padding: 1, margin: 0 }}>
            <PageHeader
                title='Players Status'
                Icon={<RouterIcon width={40} fill='white' />}
                checkTime={dataChecagem}
                offlineOffset={dashData?.offlineTime}
            />

            <AllGroups group={dashData.groupsTotals} openModal={handleOpen} />

            <Modal open={open} onClose={handleClose}>
                <Players dataSet={dashData} groupId={groupId} onClose={() => setOpen(false)} />
            </Modal>
        </Paper>
    );
}

export default App;
