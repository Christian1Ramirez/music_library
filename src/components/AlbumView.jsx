import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AlbumView() {
     const navigate = useNavigate();
     const { id } = useParams();
     const [albumData, setAlbumData] = useState([]);

     useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
          const resData = await response.json();
          setAlbumData(resData.results);
      }
      fetchData();
  }, [id]);

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