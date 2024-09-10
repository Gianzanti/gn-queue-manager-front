import { useState } from 'react';
import video from '../assets/Beltone.mp4';
import VideoPlayer from '../components/VideoPlayer';
import VisitorForm from '../components/VisitorForm';

function Beltone() {
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);

    const handleVideoEnd = () => setIsVideoCompleted(true);

    return (
        <div>
            {!isVideoCompleted && <VideoPlayer onVideoEnd={handleVideoEnd} videoPath={video} />}
            {isVideoCompleted && <VisitorForm customer='Beltone' />}
        </div>
    );
}

export default Beltone;
