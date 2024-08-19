import React, { Fragment, useEffect, useState } from 'react'
import token from '../../../token/token';
import { useParams } from 'react-router-dom';

const URL = 'https://api.spotify.com';

const Track = () => {
    const trackBanner = {
        backgroundImage : "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        height:'200px'
    };

    const [tracks, setTracks] = useState([]);

    const params = useParams();

    const getTrack = async () => {
        await fetch(`${URL}/v1/artists/${params.artistId}/top-tracks?market=IN`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        })
        .then(res=> res.json())
        .then(out => {
            console.log("Track",out.tracks);
            setTracks(out.tracks);
        })
        .catch(error=>console.log(error.message));
    }

    useEffect(()=>{getTrack()}, []);

  return (
    <Fragment>
        <div style={trackBanner}>
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <h1 className="text-white text-center  mt-5">TRACK</h1>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Track