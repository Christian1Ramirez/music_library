import GalleryItem from "./GalleryItems"
import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export default function Gallery(props) {
     const data = props.data.result.read();
     const galleryItems = data.map((item, index) => {
         return <GalleryItem item={item} key={index} />
     });

     return <div>
          { galleryItems }
     </div>
}