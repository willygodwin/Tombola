import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import { useHistory, useParams} from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));



function CircularIntegration(props) {
  const classes = useStyles();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const {id} = useParams()
  console.log(id);
  

  const timer = useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  useEffect(() => {
    setIsFollowing(false)
    getfollow()
    .then((response) => {
        console.log(response.data);
        if (response.data.length === 1){
            setIsFollowing(true)
        }   
    });

    // return () => {
    //   clearTimeout(timer.current);
    // };
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

    // if (!loading) {
    //   setSuccess(false);
    //   setLoading(true);
    //   timer.current = window.setTimeout(() => {
    //     setSuccess(!success);
    //     setLoading(false);
    //   }, 2000);
    // }
    // else {
    //   setSuccess(true)
    // }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          style={{backgroundColor: !isFollowing ? '#ff6701' : "#ffc288"}}
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          {!isFollowing ? "Follow" : "Unfollow"}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}

export default CircularIntegration