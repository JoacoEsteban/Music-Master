import React, {Component} from 'react'
import { Animate } from "react-animate-mount";

const Image = ({image}) =>
{
    return(

        <img src={image.url}  />
        )
}
const Genres = ({genres}) =>
{
    return( <genres>
                {genres.map(genre => <span> {genre} </span> )}
            </genres>
        )
}



const Artist = ({artist}) =>
{
        return(
            <div className='artist'>
               <Image image={artist.images[0]} />
               <h2>{artist.name}</h2>
                <h6>{artist.followers.total} followers</h6>
                <Genres genres={artist.genres}/>
            </div>
        )
}



export default Artist;