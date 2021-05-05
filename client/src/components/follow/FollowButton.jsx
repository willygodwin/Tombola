import React, {useEffect, useRef, useState} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useParams} from "react-router-dom";
import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center", 

  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
 
}));



function CircularIntegration(props) {
  const classes = useStyles();

  const [isFollowing, setIsFollowing] = useState(false);
  const {id} = useParams()
  console.log(id);

  const CssButton = withStyles({
    root: {
        '&.MuiButton-contained': {
            backgroundColor:  isFollowing ? 'white' : '#ff6701',
            boxShadow: 'none',
            color: isFollowing ? '#ff6701' : 'white',
            border:'1px solid rgb(255, 103, 1)',
            '&.MuiButton-containedPrimary:hover': {
                backgroundColor: isFollowing ? '#fcecdd': '#ff6701',
                boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
            }
    
        }
    
    }

    })(Button);
  
 

  useEffect(() => {
    setIsFollowing(false)
    getfollow()
    .then((response) => {
        console.log(response.data);
        if (response.data.length === 1){
            setIsFollowing(true)
        }   
    });


  }, [id, props]);

  //Get the info whether the people are following eachother
  const getfollow = () => {
    console.log(props.id);

    return fetch(`http://localhost:3001/api/follow/${props.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            
          },
    } )
    .then((res) => res.json())
    
}
    
  const follow = () => {
    console.log(props.id);

    const payload =  {
        followee_id: props.id,
    }

    fetch(`http://localhost:3001/api/follow`, {
        method: 'POST',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            
          },
    } )
    .then((res) => res.json())
    .then((response) => {
        console.log(response);
        setIsFollowing(true)

  
    });
}

const unfollow = (event) => {

    const payload =  {
        followee_id: props.id,
    }

    fetch(`http://localhost:3001/api/unfollow`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            
          },
    })
    .then((res) => res.json())
    .then((response) => {
        console.log(response);
        setIsFollowing(false)

  
    });
}

  const handleButtonClick = () => {
    if(isFollowing){
        unfollow()
    }
    else {
        follow()
    }

  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <CssButton
         id="custom-css-outlined-input"
        // className={  !isFollowing ? classes.root: classes.active }
          variant="contained"
          color="primary"
        //   style={{backgroundColor: !isFollowing ? 'white' : '#ff6701', color:!isFollowing ? '#ff6701':'white', border:'1px solid rgb(255, 103, 1)', boxShadow: 'none'}}
          onClick={handleButtonClick}
        >
          {!isFollowing ? "Follow" : "Unfollow"}
        </CssButton>

      </div>
    </div>
  );
}

export default CircularIntegration