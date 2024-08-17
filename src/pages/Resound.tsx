import { useState } from 'react';
import video from '../assets/video_resound.mp4';
import FormResound from '../components/FormResound';
import VideoPlayer from '../components/VideoPlayer';

function Resound() {
    const [isVideoCompleted, setIsVideoCompleted] = useState(false);

    const handleVideoEnd = () => setIsVideoCompleted(true);

    return (
        <div>
            {!isVideoCompleted && <VideoPlayer onVideoEnd={handleVideoEnd} videoPath={video} />}
            {isVideoCompleted && <FormResound />}
        </div>
    );
}

export default Resound;
