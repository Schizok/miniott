import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hls from 'hls.js';
import { ArrowLeft, Settings } from 'lucide-react';
import { movies } from '../data/movies';

const Player = () => {
    const { id } = useParams();
    const videoRef = useRef(null);
    const [qualityLevels, setQualityLevels] = useState([]);
    const [currentQuality, setCurrentQuality] = useState(-1); // -1 = Auto
    const hlsRef = useRef(null);

    const movie = movies.find(m => m.id === id) || movies[0];

    useEffect(() => {
        const video = videoRef.current;
        const src = `http://localhost:8000/content/${id}/master.m3u8`;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;
            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                setQualityLevels(data.levels);
                video.play().catch(e => console.log("Autoplay blocked", e));
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
        };
    }, [id]);

    const changeQuality = (index) => {
        if (hlsRef.current) {
            hlsRef.current.currentLevel = index;
            setCurrentQuality(index);
        }
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center relative group">
            {/* Back Button */}
            <Link to="/" className="absolute top-6 left-6 btn btn-circle btn-ghost text-white z-50 bg-black/20 hover:bg-black/40 backdrop-blur-sm">
                <ArrowLeft />
            </Link>

            <div className="w-full max-w-6xl aspect-video relative bg-black shadow-2xl">
                <video ref={videoRef} className="w-full h-full" controls autoPlay></video>

                {/* Quality Selector */}
                <div className="absolute top-4 right-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="dropdown dropdown-end">
                        <div tabindex="0" role="button" className="btn btn-sm btn-ghost text-white gap-2 bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/10">
                            <Settings className="w-4 h-4" />
                            {currentQuality === -1 ? 'Auto' : `${qualityLevels[currentQuality]?.height}p`}
                        </div>
                        <ul tabindex="0" className="dropdown-content z-[1] menu p-2 shadow bg-base-900/90 backdrop-blur-xl rounded-box w-32 border border-white/10 text-white mt-2">
                            <li><a className={currentQuality === -1 ? 'active' : ''} onClick={() => changeQuality(-1)}>Auto</a></li>
                            {qualityLevels.map((level, index) => (
                                <li key={index}>
                                    <a className={currentQuality === index ? 'active' : ''} onClick={() => changeQuality(index)}>
                                        {level.height}p <span className="text-xs opacity-50">{(level.bitrate / 1000).toFixed(0)}k</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
                <p className="text-gray-400">Now Playing • Adaptive Bitrate Streaming</p>
            </div>
        </div>
    );
};

export default Player;
