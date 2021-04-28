import React, {useEffect, useState} from 'react';
import { Carousel } from 'antd';

function ImageCarousel(props) {
    const contentStyle = {
        height: '400px',
        width: '100%'
    
      };
    
    const images = () => {

        if(props.post.length === 0){
            return (<div>Loading.....</div>)
        }
        
        return props.post.image_refs.map((image) => {
            return (<div>
                    {/* <h3 style={contentStyle}>{image}</h3> */}
                    <img style={contentStyle} src={`${image}`}></img>
                    </div>)
        })
    } 

    return (
        <Carousel >
        {images()}

        </Carousel>

    )
    

}

export default ImageCarousel