import GalleryItem from "./GalleryItems"
import React from 'react'
import Spinner from "./Spinner";

const Gallery = (props) => {
     if (!props.data || !props.data.result) {
          return <Spinner />;     
     }
     
     const data = props.data.result.read();

     const display = data.map((item, index) => {
          return (
               <GalleryItem item={item} key={index} />
          )
     })

     return (
          <div>
               {display}
          </div>
     )
}

export default Gallery

//      const galleryItems = data.map((item, index) => {
//          return <GalleryItem item={item} key={index} />
//      });

//      return <div>
//           { galleryItems }
//      </div>
// }