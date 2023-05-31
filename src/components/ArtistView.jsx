import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ArtistView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [artistData, setArtistData] = useState([]);

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL);
            const resData = await response.json();
            setArtistData(resData.results)
        }
        fetchData();
    }, [id]);

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album');

    const renderAlbums = justAlbums.map((album, i) =>{
        return <div key={i}>
            <Link to={`/album/${album.collectionId}`}>
                <p>{ album.collectionName }</p>
            </Link>
        </div>
    })

    const navButtons = () => {
        return <div>
            <button type="button" onClick={() => navigate(-1)}>Back</button>
            <button type="button" onClick={() => navigate('/')}>Home</button>
        </div>
    }

    const showArtistName = () => {
        return artistData.length ?
            <h3>{ artistData[0].artistName }</h3>
            :
            <h3>Loading...</h3>
    }

    return <div>
        { showArtistName() }
        { navButtons() }
        { renderAlbums }
    </div>
}