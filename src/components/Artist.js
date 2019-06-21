import React, {Component} from 'react'
var numeral = require('numeral');

import PlayButton from  '../resources/icons/play-icon'
import PauseButton from  '../resources/icons/pause-icon'
import VolumeIcon from  '../resources/icons/volume-icon'
import MuteIcon from  '../resources/icons/mute-icon'

class Artist extends Component
{
    state={
        audioIsPlaying: false,
        trackBeingPlayed: undefined,
        MUTED: false,
        muteColor: undefined,

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
        this.VOLUME = .5;
        this.muteColor = this.state.MUTED ? 'red' : '#252525';
        // this.MUTED = false;
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
        if(!this.state.MUTED){this.setVolume(track)}else{this.setVolume(this.TBP, 0); console.log('holi')}
        
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

handleMedia = (track) =>
{
    if(track !== undefined)
    {

        if(!this.AIP)
        {
            this.playTrack(track);
        }else
        {
            if(this.TBP === track)
            {
                this.pauseTrack(track);
            }else if(this.trackAudios[track].error == undefined)
            {
                this.pauseTrack(this.TBP);
                this.playTrack(track);
            }
        }
    }
}

mute = () =>
{
    // if(this.trackAudios[track] !== undefined)
    // {

        if( !this.state.MUTED )
        {
            this.trackAudios[this.TBP].volume = 0;
            this.setState({MUTED: true, muteColor: 'red'});
            console.log('muted: ', this.state.MUTED)
            console.log('color: ', this.muteColor)
        }else
        {this.unMuteTrack()}
    // }
}

unMuteTrack = () =>
{
    this.trackAudios[this.TBP].volume = this.VOLUME;
    this.setState({MUTED: false, muteColor: undefined});
    console.log('muted: ', this.state.MUTED)
    console.log('color: ', this.muteColor)
}


setVolume = (track, vol) =>
{
    if(vol === undefined){vol = this.VOLUME}
    this.trackAudios[track].volume = vol;
}

handleVolume = (event, mode) =>
{
    var element = document.getElementById('volume-button');
    var width = element.offsetWidth;
    var offset = Math.round(element.getBoundingClientRect().left);
    var percentage = Math.round(100 / width * event.clientX - offset)/100;
    percentage = percentage < 0 ? 0 : percentage;
    this.VOLUME = percentage;
    // console.log(this.VOLUME)
    if(!this.state.MUTED)
    {
        this.trackAudios[this.TBP].volume = this.VOLUME;
    }
}






componentWillUnmount()
{
    if(this.AIP){
    this.pauseTrack(this.TBP);
    }
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
            
            
            <button
                onClick={()=> this.mute()}
                onTouchStart={()=> this.mute(this.TBP)}
                style={{backgroundColor: this.state.muteColor}}
            >
            <MuteIcon muted={this.state.MUTED } />
            </button>
            
            <button
                id='volume-button'
                onMouseDown={(event)=> this.handleVolume(event, false) }
                // onMouseDownCapture={()=>this.setVolume(this.TBP) }
                onTouchStart={(event)=> this.handleVolume(event) }
            >
            <VolumeIcon/>
            </button>

            

            
        </div>
    </div>
)
}

}
export default Artist;