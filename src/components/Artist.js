import React, {Component} from 'react'
var numeral = require('numeral');

import PlayButton from  '../resources/icons/play-icon'
import PauseButton from  '../resources/icons/pause-icon'

class Artist extends Component
{
    state={
        audioIsPlaying: false,
        trackBeingPlayed: undefined,

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
    if( this.trackAudios[track].error == undefined )
    {
        this.trackAudios[track].play();
        
        this.AIP = true;
        this.TBP = track;
        this.setState({audioIsPlaying: true, trackBeingPlayed: this.TBP});
        
    }
}

pauseTrack = (track) =>
{
    console.log('pause ', track)
    if( this.trackAudios[track].error == undefined )
    {
        this.trackAudios[track].pause();
        this.AIP = false;
     
        this.setState({audioIsPlaying: false, trackBeingPlayed: undefined});
    }
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
            }else if(this.trackAudios[i].error == undefined)
            {
                this.pauseTrack(this.TBP);
                this.playTrack(i);
            }
        }
    }
}

componentWillUnmount()
{
    this.pauseTrack(this.TBP);
}






//--------------------COMPONENT--------------------//

Image = ({image}) => image !== undefined ? <div className='artist-img' style={{backgroundImage: `url('${image.url}')` }}></div> : null;

    
Genres = ({genres}) => genres.length !== 0 ? <nav> {genres.map((genre, i) => <span key={i}> / {genre}</span> )} / </nav> : null;


Track = ({track, index}) =>
{
    // var trackAudio = new Audio(track.preview_url);
    return(
        <span className='track transition'>
    <div 
    className='track-img'
    style={{backgroundImage: `url('${track.album.images[0].url}')` }}
    onClick={()=>this.handleMedia(index)}
    >
    { this.state.trackBeingPlayed === index ? <PauseButton mode='track' />  : <PlayButton mode='track' />  }
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
                {this.state.audioIsPlaying ? <PauseButton mode='button'/> : <PlayButton mode='button' />}
            </button>

        </div>
    </div>
)
}

}
export default Artist;