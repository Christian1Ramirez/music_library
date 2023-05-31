import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AlbumView() {
     const navigate = useNavigate();
     const { id } = useParams();
     const [albumData, setAlbumData] = useState([]);

     useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`;
        const fetchData = async() => {
            const response = await fetch(API_URL);
            const resData = await response.json() 
            setAlbumData(resData.results);
        }
        fetchData();

     }, [id])

     const justSongs = albumData.filter(entry => entry.wrapperType === 'track');
     
     const navButtons = () => {
        return <div>
            <button type='button' onClick={() => navigate(-1)}>Back</button>
            <button type='button' onClick={() => navigate('/')}>Home</button>
        </div>
     }

     const renderSongs = justSongs.map((song, i) => {
        return <div key={i}>
            <p>{ song.trackName }</p>
        </div>
     });

     const showAlbumName = () => {
        return albumData.length ?
            <h3>{ albumData[0].collectionName }</h3>
            :
            <h3>Loading...</h3>
    }

     return <div>
        { showAlbumName() }
        { navButtons() }
        { renderSongs }
     </div>

}