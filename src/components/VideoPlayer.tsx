import { FC, useEffect, useRef, useState } from 'react';

type VideoPlayerProps = {
    videoPath: string;
    onVideoEnd: () => void;
};
const VideoPlayer: FC<VideoPlayerProps> = ({ videoPath, onVideoEnd }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isFullScreen, setIsFullScreen] = useState(true);

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(document.fullscreenElement === videoRef.current);
        };
        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    const handleVideoEnd = () => {
        onVideoEnd();
    };

    const handlePlayClick = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
            videoRef.current.play();
        }
    };

    return (
        <div>
            <video
                ref={videoRef}
                width='100%'
                // height='100%'
                // controls
                onEnded={handleVideoEnd}
                autoPlay
                muted
                playsInline
                style={{ display: isFullScreen ? 'block' : 'none' }}
            >
                <source src={videoPath} type='video/mp4' />
                Your browser does not support the video tag.
            </video>
            {!isFullScreen && <button onClick={handlePlayClick}>Play Video</button>}
        </div>
    );
};

export default VideoPlayer;
