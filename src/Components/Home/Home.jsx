import { Link } from 'react-router-dom';
import './Home.css';
import tezbritLogo from '/tezbrit.svg';
import tezbritTypo from '/tezbrit-typo.svg';
import spotifyIcon from '/spotifyIcon.svg';
import youtubeIcon from '/youtubeIcon.svg';
import instagramIcon from '/instagramIcon.svg';
import soundcloudIcon from '/soundcloudIcon.svg';
import playIcon from '/playIcon.svg';

function Home() {

    return (
        <div className="main">
            <div className='home-container'>

                <div className="tezbrit-home">
                    <h1>&gt;This is </h1>
                    <img loading='lazy' className='tez-logo' src={tezbritLogo} alt="Tezbrit" />
                    <h1> music.</h1>
                </div>

                <div className='socials'>
                    <a className='spotify' href="https://open.spotify.com/intl-es/artist/0WF3j6gX844vpTbHbSyFxT?si=LRj5NRLySfmMus5xwN_mYg" target='_blank'>
                        <img loading='lazy' src={spotifyIcon} alt="Tezbrit Spotify" />
                    </a>
                    <a className='youtube' href="https://www.youtube.com/@Tezbrit" target='_blank'>
                        <img loading='lazy' src={youtubeIcon} alt="Tezbrit Youtube" />
                    </a>
                    <a className='instagram' href="https://www.instagram.com/tezbrit/" target='_blank'>
                        <img loading='lazy' src={instagramIcon} alt="Tezbrit Instagram" />
                    </a>
                    <a className='soundcloud' href="https://soundcloud.com/user-198682741" target='_blank'>
                        <img loading='lazy' src={soundcloudIcon} alt="Tezbrit Soundcloud" />
                    </a>
                </div>
            </div>

            <div className="album-card">

                <Link to='/discografia'>
                    <div className="cover-container">

                        <img className='ton-album' src="/ton-cover.jpg" alt="TON Alum Cover" loading='lazy' />
                        <img className='play-icon' src={playIcon} alt="Play Icon" loading='lazy' />

                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Home;