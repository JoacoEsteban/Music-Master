import React, {Component} from 'react'
import { Animate } from "react-animate-mount";
var numeral = require('numeral');
import playbutton from  '../resources/play-button.png'
// import { stat } from 'fs';

// var audioIsPlaying = false; //selfexplanatory
// var trackBeingPlayed = undefined; //this one too

class Artist extends Component
{
    state={
        audioIsPlaying: false,
        // var [ trackBeingPlayed, setTrackBeingPlayed ] = useState(undefined);

    }

  


    //--------------------GLOBAL VARIABLES--------------------//
    constructor(props)
    {
        super(props);
        this.artist = props.artist;
        this.tracks = props.tracks;
        this.trackAudios = this.tracks.map((track)=> new Audio(track.preview_url)); //tracklist
        this.TBP = undefined;
        this.AIP = false;
    }
    
    


//--------------------FUNCTIONS--------------------//

playTrack = (track) =>
{
    this.trackAudios[track].play();
    
    this.AIP = true;
    this.setState({audioIsPlaying: true});
    
    this.TBP = track;
}

pauseTrack = (track) =>
{
    console.log('pause ', track)
    this.trackAudios[track].pause();
    
    this.AIP = false;
    this.setState({audioIsPlaying: false});
}

handleMedia = (i) =>
{
    if(i !== undefined)
    {

        if(!this.AIP)
        {
            this.playTrack(i);
        }else
        {
            if(this.TBP === i)
            {
                this.pauseTrack(i);
            }else
            {
                this.pauseTrack(this.TBP);
                this.playTrack(i);
            }
        }
    }
}

componentWillUnmount()
{
    console.log('chausito')
}






//--------------------COMPONENT--------------------//

Image = ({image}) => image !== undefined ? <div className='artist-img' style={{backgroundImage: `url('${image.url}')` }}></div> : null;

    
Genres = ({genres}) => genres.length !== 0 ? <nav> {genres.map((genre, i) => <span key={i}> / {genre}</span> )} / </nav> : null;


Track = ({track, index}) =>
{
    // var trackAudio = new Audio(track.preview_url);
    return(
        <span className='track transition'>
    <div className='track-img' style={{backgroundImage: `url('${track.album.images[0].url}')` }}>
        <img
        className='skere' 
        src={playbutton}
        onClick={() =>
            {
                this.handleMedia(index);
            }
        }
        />

    </div>
    <div className='labels'>
        <h5 >{track.name}<br/> </h5>
        <h6 >{track.album.name}</h6>
    </div>
        </span>
)
}

Tracks = ({tracks}) =>
{
    return(
        <div className='track-container'>
            {tracks.map((track, i) => <this.Track track={track} key={i} index={i} /> )}
        </div>
    )
}




render(){
    var artist = this.artist;
    var tracks = this.tracks;
return(
    <div className='artist no-size'>
        <this.Image image={artist.images[0]} />
        <h2>{artist.name}</h2>
        <code>{numeral(artist.followers.total).format('0,0')} followers</code>

        {/* <Followers total={artist.followers.total} /> */}
        <this.Genres genres={artist.genres}/>
        <this.Tracks tracks={tracks}/>

        <div className='controls'>
            <button
                onClick={()=>
                    {
                        this.handleMedia(this.TBP);

                    }
                }
            >
                {this.state.audioIsPlaying ? 'Pause' : 'Play'}
            </button>

        </div>
    </div>
)
}

}
export default Artist;