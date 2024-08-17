import { useState } from 'react';
import video from '../assets/resound.mp4';
import VideoPlayer from '../components/VideoPlayer';
import VisitorForm from '../components/VisitorForm';

function Resound() {
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);

    const handleVideoEnd = () => setIsVideoCompleted(true);

    return (
        <div>
            {!isVideoCompleted && <VideoPlayer onVideoEnd={handleVideoEnd} videoPath={video} />}
            {isVideoCompleted && <VisitorForm customer='Resound' title='Bem vindo à Resound' />}
        </div>
    );
}

export default Resound;
