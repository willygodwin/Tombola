import React, { useState, useEffect, useRef, createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './styles.css'

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faDollarSign  } from '@fortawesome/free-solid-svg-icons'
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  gridList: {
    width: '100%',
    height: '100%',
    
  },
  hoverText: { 
    height: '200px', 
    width: '700px',  
    backgroundColor:'rgba(128, 128, 128, 0.616)', 
    color: 'white',
    position: "absolute", 
    left: "0px", 
    top: '0px', 
    zIndex: '1000',

  }
}));


function ProfileImageGrid(props) {
  const classes = useStyles();
  const arrLength = props.posts.length;
  const elRefs = useRef([]);  

  //Set references 
  if (elRefs.current.length !== arrLength) {
    elRefs.current = Array(arrLength).fill().map((_, i) => elRefs.current[i] || createRef());
  }

  const Hover = ({ height, width, onHover, children }) => (
    <div className="hover" style={{height, width}}>
        <div className="hover__no-hover" >{children}</div>
        <div className="hover__hover" style={{height, width}}>{onHover}</div>
    </div>
)

  //Changing columns depending on screen size
  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 4;
    }

    if (isWidthUp('lg', props.width)) {
      return 3;
    }

    if (isWidthUp('md', props.width)) {
      return 2;
    }
    
    return 1;
}

  return (
    <div className={classes.root}>
      <GridList spacing={15} cellHeight={200} className={classes.gridList} cols={getGridListCols()}>
        {props.posts.map((post, i) => {
          return (
          
            <GridListTile ref={elRefs.current[i]} key={post.image_refs[0]} cols={1}
              onMouseOver={e => (e)}  
              onMouseOut={e => (e)}  
            >
              <a href={`/posts/${(post._id).toString()}`}>
              <Hover height='200px'width='700px' onHover={
                <div className={classes.hoverText}  >
                  <div style={{ display:'flex', flexDirection:'row',alignItems:'center', marginLeft:'0.5rem'}}>
                    <FontAwesomeIcon icon={faDollarSign} style={{ marginRight:'0.25rem'}} />
                    {post.price_per_ticket}
                  </div>
                  <div  style={{ display:'flex', flexDirection:'row',alignItems:'center', marginLeft:'0.5rem'}}>
                    <FontAwesomeIcon icon={faTicketAlt} size="sm" style={{ marginRight:'0.25rem', transform: "rotate(135deg)"}} />
                    {post.no_tickets_remaining}
                  </div>
                </div>}>
              <div ></div>
            </Hover>
            </a>
            <img src={post.image_refs[0].location} alt={post.title}/>
            </GridListTile>
        )})}
        
      </GridList>
    </div>
  );
}

export default withWidth()(ProfileImageGrid);