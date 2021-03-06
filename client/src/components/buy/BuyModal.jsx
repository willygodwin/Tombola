import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles, } from "@material-ui/core/styles";
import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  dialogTitle: {
    marginBottom: "0px",
    marginTop: theme.spacing(1)
  },

}));

const CssTextField = withStyles({
  root: {

    // Changing text of the input
    '&.MuiFormControl-root ': {
      color: '#FF6701' ,
      '&.MuiFormLabel-root.Mui-focused':
          { color: '#FF6701' }
      },
   
      //changing border of the input
    '& .MuiInput-root': {
      color: '#fea82f',
      '&.MuiInput-underline:after': {
        borderColor: '#fea82f',
        borderBottom: '2px solid #fea82f',
        color: '#fea82f'
      },

      '&.MuiInput-underline.Mui-focused:after': {
        borderColor: '#FF6701',
        borderBottom: '2px solid #fea82f',
        color: '#FF6701'
      },
      '&.MuiInput-underline:hover:not(.Mui-disabled):before':{
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      }
    },
  },
})(TextField);

export default function FormDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tickets, setTickets] = useState('');

  const handleClickOpen = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setOpen(true);
  };

  const handleClose = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const no_tickets_remaining = (parseInt(props.post.no_tickets_remaining) - parseInt(tickets))
    let isClosed = false

    //Make sure people don't buy negative tickets
    if (tickets < 0) {
      return
    }
    //make sure people don't buy more than set ticket amount
    if (no_tickets_remaining < 0) {
      return
    } else if (no_tickets_remaining === 0) {
      isClosed = true
    }
    postTickets()
      .then((response) => {
        patchPosts(no_tickets_remaining, isClosed)
          .then((response) => {
            console.log(response);
            setOpen(false)
            props.handleTicketsBought()

          });
      });
  };

  const handleTicketInput = (event) => {
    setTickets(event.target.value);
    setTotalPrice(event.target.value * props.post.price_per_ticket);
  };

  const postTickets = () => {


    const payload = {
      no_tickets_bought: tickets,
      post_id: props.post._id,
    }

    return fetch(`/api/tickets`, {
      method: 'POST',
      body: JSON.stringify(payload),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'

      },
    })
      .then((res) => res.json())

  }


  const patchPosts = (no_tickets_remaining, isClosed = false) => {

    console.log(no_tickets_remaining);
    const payload = {
      no_tickets_bought: parseInt(tickets),

    }

    return fetch(`/api/posts/${props.post._id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'

      },
    })
      .then((res) => res.json())

  }

  return (
    <div onClick={(e) =>{e.preventDefault(); e.stopPropagation()}}>
      <Button variant="outlined" style={{ color: '#FF6701', borderColor: '#FF6701' }} onClick={handleClickOpen}>
        Buy Tickets
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <DialogTitle style={{ paddingBottom: "0px" }} id="form-dialog-title">
            Buy Tickets
          </DialogTitle>

          <p style={{ fontSize: "8px", margin: "0px" }}>
            Tickets Remaining: {props.post.no_tickets_remaining} Total Price: {props.post.total_price}
          </p>
        </div>



        <DialogContent></DialogContent>
        <DialogContent>
          <DialogContentText className={classes.dialogTitle}>
            Ticket Price ($)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="number"
            value={props.post.price_per_ticket}
            disabled={true}
            fullWidth
          />
          <DialogContentText className={classes.dialogTitle}>
            Number of Tickets
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tickets"
            type="number"
            className={classes.root}
            fullWidth
            onChange={handleTicketInput}
            value={tickets}
            
            
          /> */}

          <CssTextField
            autoFocus
            className={classes.root}
            margin="dense"
            label="Tickets"
            type="number"
            id="custom-css-outlined-input"
            className={classes.root}
            fullWidth
            onChange={handleTicketInput}
            value={tickets}
            onClick={(e) =>{e.preventDefault();e.stopPropagation()}}
          />
          <DialogContentText className={classes.dialogTitle}>
            Total Price ($)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="number"
            value={totalPrice}
            disabled={true}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{ color: '#FF6701' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" style={{ color: '#FF6701' }}>
            Buy Tickets
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}