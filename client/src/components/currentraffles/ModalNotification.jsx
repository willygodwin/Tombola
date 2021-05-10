import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import WheelSpinner from "../wheelspinner/WheelSpinner";



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
    width: 600,
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
  const [open, setOpen] = React.useState(false);
  const [displayText, setDisplayText] = React.useState(false);



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateIsNotified()
      .then((response) => {
        console.log(response);
        setOpen(false)

      });


  };

  const onClick = () => {
    setTimeout(() => {
      setDisplayText(true)

    }, 12000)
  }

  const updateIsNotified = () => {

    const payload = {
      isNotified: true,

    }

    return fetch(`/api/tickets/${props.ticket._id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'

      },
    })
      .then((res) => res.json())



  }

  useEffect(() => {
    if (!props.ticket || props.ticket.length === 0) {
      return
    }
    if (props.ticket.post.isClosed) {
      if (!props.ticket.isNotified)
        handleOpen()
    }


  }, [props])

  const body = () => {

    console.log('ticket', props.ticket);


    if (!props.ticket || props.ticket.length === 0) {
      return (

        <div>

        </div>
      )
    }
    if (!props.ticket.post.isClosed) {
      return (
        <div>

        </div>
      )
    }
    if (props.ticket.post.winner_id === props.ticket.user_id) {

      return (
        <div style={modalStyle} className={classes.paper} >
          <WheelSpinner won={true} ticket={props.ticket} onClick={onClick}></WheelSpinner>
          {!displayText ? <div></div> :
            <div>

              <h2 id="simple-modal-title">Congratulations! You have won the following item...</h2>
              <Link to={`/posts/${props.ticket.post._id}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar alt={props.ticket.post.image_refs[0].key} src={props.ticket.post.image_refs[0].location}></Avatar>
                <p style={{ color: 'black', marginBottom: '0px', marginLeft: '0.25rem' }} id="simple-modal-description">
                  {props.ticket.post.title}
                </p>
              </Link>
            </div>

          }
        </div>
      )
    }
    return (
      <div style={modalStyle} className={classes.paper}>

        <WheelSpinner won={false} ticket={props.ticket} onClick={onClick}></WheelSpinner>
        {!displayText ? <div></div> :
          <div>
            <h2 id="simple-modal-title">Sorry, you were not successful for the following item. Please see tombolas similar to this one below</h2>
            <Link to={`/posts/${props.ticket.post._id}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Avatar src={props.ticket.post.image_refs[0]}></Avatar>
              <p style={{ color: 'black', marginBottom: '0px', marginLeft: '0.25rem' }} id="simple-modal-description">
                {props.ticket.post.title}
              </p>
            </Link>
          </div>

        }

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