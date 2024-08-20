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
    const [view, setView] = useState(false);

    // player states
    const [audio, setAudio]= useState(false);
    const [playing,setPlaying] = useState(false) // true = play , false = pause
    const [preUrl, setPreUrl] = useState(false)  // song url

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

    // To covert milliseconds to time (min:sec)
    const msToTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds}`;
    }

    // TrackIcon for audio URL
    const trackIcon = (url) => {
        if(!url){
            return <strong className='text-danger'>No Track</strong>
        }

        if(playing){
            return <button className="btn btn-sm btn-warning"> <i className="bi bi-pause-fill"></i></button>
        } else {
            return <button className="btn btn-sm btn-success"> <i className="bi bi-play-fill"></i> </button>
        }
    }

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
        <div className="container my-5">
            <div className="row">
                <div className="col text-center">
                    <i className="border border-primary btn rounded text-primary " onClick={()=>{setView(!view)}}>
                        {view ? <i className="bi bi-music-note-list h3"> List View</i> :  <i className="bi bi-card-heading h3"> Card View</i>}
                    </i>
                </div>
            </div>
        </div>
        <div className="container my-5">
            <div className="row">
                {
                    tracks.map((item, index) => {
                        const {id, name, album, preview_url, duration_ms} = item;
                        return(
                            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 my-2" key={index}>
                                {
                                    view ? (
                                        <div className="card shadow">
                                            <img src={album ? album.images[0].url : ""} alt="" className='img-fluid card-img-top shadow' style={{height:'300px'}} />
                                            <div className="card-body">
                                                <p className="text-success text-center"> { name } </p>
                                            </div>
                                            <div className="card-footer">
                                                <span className='text-danger'>Time: { msToTime(duration_ms)}</span>
                                                <span className='float-end'>{trackIcon(preview_url)}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <ul className="list-group shadow">
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                        <img src={album ? album.images[0].url : "No Image"} alt="" className='img-fluid rounded-circle'/>
                                                    </div>
                                                    <div className="col-sm-5 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
                                                        <span className="text-success text-uppercase"> { name } </span>
                                                    </div>
                                                    <div className="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                                                        <span className="text-danger float-end">
                                                            Time : {msToTime(duration_ms)}
                                                        </span>
                                                        <span className="float-end my-2">{trackIcon(preview_url)}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                }
                            </div>  
                        )
                    })
                }
            </div>
        </div>
    </Fragment>
  )
}

export default Track