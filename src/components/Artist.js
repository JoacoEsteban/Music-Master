import React, {Component} from 'react'
import { Animate } from "react-animate-mount";
var numeral = require('numeral');
import playbutton from  '../resources/play-button.png'

const Image = ({image}) =>
{
    return(

        <img src={image.url} className='artist-img' />
        )
}
 
// const Followers = ({total}) =>
// {
//     var followers = total.toString().split('');
//     followers = followers.reverse().map((num, i) => 
//     {
//         return(
//             null
//         )
//     });

//     followers = followers.reverse();

//     //tostring
//     <code>{followers} followers</code>
// }

const Genres = ({genres}) =>
{
    return( <nav>
                {genres.map((genre, i) => <span key={i}> / {genre}</span> )} /
            </nav>
        )
}


const Track = ({track}) =>
{
    return(
    <span className='track transition'>
        <div className='track-img' style={{backgroundImage: `url('${track.album.images[0].url}')` }}>
            <img className='skere' src={playbutton}/>
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
            {tracks.map((track, i) => <Track track={track} key={i} /> )}
        </div>
    )
}

const Artist = ({artist, tracks}) =>
{
    return(
        <div className='artist no-size'>
               <Image image={artist.images[0]} />
               <h2>{artist.name}</h2>
               <code>{numeral(artist.followers.total).format('0,0')} followers</code>

                {/* <Followers total={artist.followers.total} /> */}
                <Genres genres={artist.genres}/>
                <Tracks tracks={tracks}/>
            </div>
        )
}



export default Artist;