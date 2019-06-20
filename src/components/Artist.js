import React, {Component, useState} from 'react'
import { Animate } from "react-animate-mount";
var numeral = require('numeral');
import playbutton from  '../resources/play-button.png'

// var audioIsPlaying = false; //selfexplanatory
// var trackBeingPlayed = undefined; //this one too
var trackAudios; //defined inside the <Artist> component with its props
var TBP = undefined;
var AIP = false;
console.log('Up here: ',AIP);

const Artist = ({artist, tracks}) =>
{
    var [ audioIsPlaying, setAudioPlaying ] = useState(false);
    var [ trackBeingPlayed, setTrackBeingPlayed ] = useState(undefined);


    trackAudios = tracks.map((track)=> new Audio(track.preview_url)); //tracklist
    

const Image = ({image}) =>
{
    return(
        
        // <img src={image.url} className='artist-img' />
        <div className='artist-img' style={{backgroundImage: `url('${image.url}')` }}></div>
        )
    }
    
    const Genres = ({genres}) =>
    {
        return( <nav>
                {genres.map((genre, i) => <span key={i}> / {genre}</span> )} /
            </nav>
        )
    }
    
    
    const Track = ({track, index}) =>
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
                    handleMedia(index);
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

const Tracks = ({tracks}) =>
{
    return(
        <div className='track-container'>
            {tracks.map((track, i) => <Track track={track} key={i} index={i} /> )}
        </div>
    )
}



const setTBP = (i) =>
{
    TBP = i;
    setTrackBeingPlayed(i);
}
const setAIP = (mode) =>
{
    AIP = mode;
    setAudioPlaying(mode);
}



const pause = () =>
{
    //TODO Fix this shit
    trackAudios[TBP].pause();
    console.log(TBP);
    setAIP(false);
}

const play = (index) =>
{
    index = index === undefined ? TBP : index;
    trackAudios[index].play();
    AIP = true;
    setAIP(true);
}

const handleMedia = (i) =>
{
    if( i !== undefined )
    {
        if(AIP)
        {
            console.log('pause', AIP)
            pause();
        }else if(!AIP)
        {
            console.log('play', AIP)
            play(i);
        }
        
        
        if(i !== TBP)
        {
            // console.log(TBP);
            setTBP(i);
            // play();
        }
        
    }
}


return(
    <div className='artist no-size'>
        <Image image={artist.images[0]} />
        <h2>{artist.name}</h2>
        <code>{numeral(artist.followers.total).format('0,0')} followers</code>

        {/* <Followers total={artist.followers.total} /> */}
        <Genres genres={artist.genres}/>
        <Tracks tracks={tracks}/>

        <div className='controls'>
            <button
                onClick={()=>{handleMedia(TBP)}}
            >{audioIsPlaying ? 'Pause' : 'Play'}</button>
        </div>
    </div>
)

}
export default Artist;