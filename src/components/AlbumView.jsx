import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function AlbumView() {
     const { id } = useParams();
     const [albumData, setAlbumData] = useState([]);

     return <div>
         <h2>The id passed was: {id}</h2>
         <p>Album data goes here</p>
     </div>

}