import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';


function ImgWrapper(props) {

    return(
        
            props.posts.map((post) => (
                <GridListTile key={post.image_refs[0]} cols={Math.ceil(Math.random()*3 )}>
                  <img src={post.image_refs[0]} alt={post.title} />
                </GridListTile>
              ))
    
    )


}

export default ImgWrapper;