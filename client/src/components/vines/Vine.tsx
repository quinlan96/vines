import React, { useState, useRef } from 'react';
import IVine from '../../entities/Vine';

interface VineProps {
    data: IVine;
}

const Vine: React.FC<VineProps> = ({ data }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [clicked, setClicked] = useState<boolean>(false);

    const loadVideo = () => {
        setClicked(true);

        if (videoRef && videoRef.current) {
            videoRef.current.addEventListener('loadeddata', (e) => {
                videoRef?.current?.play();
            });

            videoRef.current.load();
        }
    };

    const toggleVideo = () => {
        if (videoRef && videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    return (
        <div className="overflow-hidden rounded-md cursor-pointer">
            <video className={clicked ? '' : 'hidden'} ref={videoRef} loop preload="none" onClick={toggleVideo}>
                <source src={data.vineUrl} type="video/mp4" />
            </video>
            <img className={`w-full${clicked ? ' hidden' : ''}`} src={data.thumbnailUrl} alt={data.title} onClick={loadVideo} onKeyPress={loadVideo} role="presentation" />
        </div>
    );
};

export default Vine;
