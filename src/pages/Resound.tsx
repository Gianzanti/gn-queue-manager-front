import { ThemeProvider } from '@mui/material';
import { useState } from 'react';
import video from '../assets/Resound.mp4';
import VideoPlayer from '../components/VideoPlayer';
import VisitorForm from '../components/VisitorForm';
import { resound_theme } from '../services/providers/themes';

function Resound() {
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);

    const handleVideoEnd = () => setIsVideoCompleted(true);

    return (
        <ThemeProvider theme={resound_theme}>
            <div>
                {!isVideoCompleted && <VideoPlayer onVideoEnd={handleVideoEnd} videoPath={video} />}
                {isVideoCompleted && <VisitorForm customer='Resound' />}
            </div>
        </ThemeProvider>
    );
}

export default Resound;
