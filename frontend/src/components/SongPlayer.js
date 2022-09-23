import { useSelector } from "react-redux";
import AudioPlayer from 'react-h5-audio-player';

export default function SongPlayer() {
    const songUrl = useSelector(state => state.currentSong.currentUrl);

    return (
        <AudioPlayer
            className="SongPlayer"
            autoPlay='true'
            src={songUrl}
        //"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" dispatch to CURRENT_USER in song card, new component for audio player
        // onPlay={e => console.log('onPlay')}
        />

    )
}
