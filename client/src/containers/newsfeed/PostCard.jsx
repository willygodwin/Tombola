import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';


function PostCard(props) {

    const images = () => {
        
        return props.post[0].image_refs.map((image) => {
            return (<div>
                    <h3 style={contentStyle}>{image}</h3>
                    </div>)
        })
    } 

    console.log(props.post);
    function onChange(a, b, c) {
        console.log(a, b, c);
      }

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
      
      return(
        <Carousel afterChange={onChange}>
            {images()}
     
        </Carousel>
      );
}

export default PostCard
