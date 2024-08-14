import React, { Fragment, useEffect, useState } from 'react'
import "./assets/Music.css";

const URL = 'https://api.spotify.com';

const Music = () => {
    const [artist, setArtist] = useState([]);

    const getArtist = async (artistName) => {
        await fetch(`${URL}/v1/search?q=${artistName}&type=artist`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ${}'
            }
        })
        .then(res=> res.json())
        .then(out=>{
            console.log(out);
        })
        .catch(error => console.log(error.massage));
    }

    useEffect(()=>{
        // statements
        getArtist('Ilayaraj');
    }, []);

  return (
    <Fragment>
        <div className='banner'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className='text-center text-secondary mt-5'>WELCOME TO REACT MUSIC PLAYER APP</h1>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Music;