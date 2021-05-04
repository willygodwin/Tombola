import React, {useEffect, useRef, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";



function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function ModalNotification(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = () => {

    console.log('ticket', props.ticket);


      if(!props.ticket || props.ticket.length === 0){
          return (
              <div></div>
          )
      }
      if(props.ticket[0].post.winner_id === props.ticket[0].user_id) {
        return (
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">Congratulations! You have won the following item...</h2>
              <Link to={`/posts/${props.ticket[0].post._id}`} style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                <Avatar src={props.ticket[0].post.image_refs[0]}></Avatar>
                <p style={{color:'black', marginBottom: '0px', marginLeft: '0.25rem'}} id="simple-modal-description">
                {props.ticket[0].post.title}
                </p>
              </Link>
        
            </div>
        )
      }
      return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Sorry, you were not successful for the following item. Please see tombolas similar to this one below</h2>
          <Link to={`/posts/${props.ticket[0].post._id}`} style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                <Avatar src={props.ticket[0].post.image_refs[0]}></Avatar>
                <p style={{color:'black', marginBottom: '0px', marginLeft: '0.25rem'}} id="simple-modal-description">
                {props.ticket[0].post.title}
                </p>
          </Link>
    
        </div>
     
        );
  } 

  return (
    <div>
    
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body()}
      </Modal>
    </div>
  );
}

export default ModalNotification