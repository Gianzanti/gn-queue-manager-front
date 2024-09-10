import { Box, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import video from '../assets/Beltone.mp4';
import VideoPlayer from '../components/VideoPlayer';
import VisitorForm from '../components/VisitorForm';
import { beltone_theme } from '../services/providers/themes';

function Beltone() {
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);

    const handleVideoEnd = () => setIsVideoCompleted(true);

    return (
        <ThemeProvider theme={beltone_theme}>
            <Box sx={{ backgroundColor: '#005C9F' }}>
                {!isVideoCompleted && <VideoPlayer onVideoEnd={handleVideoEnd} videoPath={video} />}
                {isVideoCompleted && <VisitorForm customer='Beltone' />}
            </Box>
        </ThemeProvider>
    );
}

export default Beltone;
