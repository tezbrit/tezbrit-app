import { useState, useEffect, useRef } from 'react';
import './Discografia.css';
import albumData from '/albumData.json';
import playIcon from '/playIcon.svg';
import pauseIcon from '/pauseIcon.svg';
import hideIcon from '/hideIcon.svg'; 
import showIcon from '/showIcon.svg';
import muteIcon from '/muteIcon.svg';
import volumeIcon from '/volumeIcon.svg';

function Discografia() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [start, setStart] = useState(false);
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSongName, setCurrentSongName] = useState('');
    const [currentSongArtist, setCurrentSongArtist] = useState('');
    const [handlePlayer, setHandlePlayer] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef();
    const prevVolume = useRef(0.5);
    const [duration, setDuration] = useState(0);

    const viewportWidth = window.innerWidth >= 768;

    useEffect(() => {
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.addEventListener('durationchange', handleDurationChange);
        audioRef.current.addEventListener('ended', handleSongEnded);

        return () => {
            audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
            audioRef.current?.removeEventListener('durationchange', handleDurationChange);
            audioRef.current?.removeEventListener('ended', handleSongEnded);
        };
    }, []);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleDurationChange = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSongEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0); // Reiniciar el tiempo de reproducción al final de la canción
    };    

    useEffect(() => {
        const song = albumData.find(album => album.id === currentlyPlayingId);
        if (song) {
            const src = `/src/music/${song.songSrc}`;
            audioRef.current.src = src;

            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }

            setCurrentSongName(song.name);
            setCurrentSongArtist(song.artist);
        }
    }, [currentlyPlayingId, isPlaying]);

    const handleClick = (id) => {
        const isCurrentSong = currentlyPlayingId === id;

        if (isPlaying && isCurrentSong) {
            setIsPlaying(false);
        } else {
            setCurrentlyPlayingId(id);
            setIsPlaying(true);
        }

        setStart(true);
    }

    const handlePlay = () => {

        if (isPlaying) {

            audioRef.current?.pause();

        } else {
            audioRef.current?.play();
        }

        setIsPlaying(!isPlaying);
    }

    const setCurrentTimeByPercentage = (percentage) => {
        audioRef.current.currentTime = duration * percentage;
    };

    const handleMediaPlayer = () => {

        setHandlePlayer(!handlePlayer);

    }

    useEffect(() => {

        if (!handlePlayer) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

    }, [handlePlayer])

    const handleVolume = () => {

        if (!isMuted) {
            prevVolume.current = audioRef.current.volume;
            audioRef.current.volume = 0;
            setIsMuted(!isMuted);
        } else {
            audioRef.current.volume = prevVolume.current;
            setIsMuted(!isMuted);
        }
    }

    const formatTime = time => {
        if (time == null) return `0:00`
    
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60)
    
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const finalDuration = audioRef.current?.duration ?? 0;
    const formattedFinalDuration = isNaN(finalDuration) ? '00:00' : formatTime(finalDuration);


    return (
        <div className='ton'>
            <h1>TON ALBUM</h1>
            <div className="carousel-container">
                {albumData.map((album) => (
                <div key={album.id} className="card-album">
                    <div className="img-song">
                        <img src="/ton-cover.jpg" alt="TON Album Cover" loading='lazy' />
                    </div>
                    <div className="data-song">
                        <div className="name-song">
                            {album.name}
                        </div>
                        <div className="artist-song">
                            {album.artist}
                        </div>
                    </div>
                    <div className={(isPlaying && currentlyPlayingId === album.id ? 'playing' : 'play-icon')} onClick={() => handleClick(album.id)} >
                        <img className={(isPlaying && currentlyPlayingId === album.id ? 'playing' : 'play-icon')} src={isPlaying && currentlyPlayingId === album.id ? pauseIcon : playIcon} alt="Play" loading='lazy' />
                    </div>
                </div>
                ))}
            </div>

            <audio ref={audioRef} />

            {start && (

                <div className={(!handlePlayer || viewportWidth ? 'media-player' : 'media-player-small')}>
                    <div className="media-nav" onClick={handleMediaPlayer}>
                        <img src={!handlePlayer ? hideIcon : showIcon} alt="Hide Media Player" />
                    </div>
                    <div className="current">
                        <picture>
                            <img src="/ton-cover.jpg" alt="Cover Current Song" />
                        </picture>
                        <div className="song-info">
                            <h4>{currentSongName}</h4>
                            <p>{currentSongArtist}</p>
                        </div>
                        
                    </div>


                    <div className="media-controls">
                        <div onClick={handlePlay} className="play-icon">
                            <img src={!isPlaying ? playIcon : pauseIcon} alt={!isPlaying ? playIcon : pauseIcon} />
                        </div>
                        <div className="duration">
                            <div className="duration-container">

                                <span>{formatTime(currentTime)}</span>

                                <input type="range"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    value={(currentTime / duration) * 100 || 0}
                                    onChange={(e) => setCurrentTimeByPercentage(e.target.value / 100)}
                                />

                                <span>{formattedFinalDuration}</span>
                            </div>
                            
                        </div>
                    </div>


                    <div className='volume'>
                        <img onClick={handleVolume} src={isMuted ? muteIcon : volumeIcon} alt="Volume" />
                        <input 
                            type="range"
                            defaultValue={[100]}
                            max={100}
                            min={0}
                            onChange={(event) => {
                                const newVolume = event.target.value;
                                audioRef.current.volume = newVolume / 100;
                            }}
                        />
                    </div>
                </div>

            )}
        </div>

    )

}


export default Discografia;