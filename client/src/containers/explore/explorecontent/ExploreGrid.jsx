import React, { useState, useEffect, useRef, createRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './styles.css'
import ImgWrapper from './ImgWrapper';
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
    backgroundColor: theme.palette.background.paper,
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

const columnsLayout = [
  1,1,1,2,1,1,2,3,2,1,1,2,3,2,1,1,1,1,2,1
]

const randomArrayShuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ImageGridList(props) {
  const classes = useStyles();
  const arrLength = props.posts.length;
  const elRefs = useRef([]);
  const shuffledPosts = randomArrayShuffle(props.posts)

  

  //Set references 
  if (elRefs.current.length !== arrLength) {
    elRefs.current = Array(arrLength).fill().map((_, i) => elRefs.current[i] || createRef());
  }

  const layoutColumns = (i) => {
    const index = i%10
    if(i<20){
      return columnsLayout[i]
    } else {
      return columnsLayout[index]
    }
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
        {shuffledPosts.map((post, i) => {
          return (<GridListTile ref={elRefs.current[i]} key={post.image_refs[0]} cols={layoutColumns(i)}
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
                  {post.no_tickets}
                </div>
              </div>}>
            <div ></div>
          </Hover>
          </a>
          <img src={post.image_refs[0]} alt={post.title}/>

          </GridListTile>
        )})}
        
      </GridList>
    </div>
  );
}

export default withWidth()(ImageGridList);