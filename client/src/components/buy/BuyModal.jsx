import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  dialogTitle: {
    marginBottom: "0px",
    marginTop: theme.spacing(1)
  }
}));

export default function FormDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tickets, setTickets] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTicketInput = (event) => {
    setTickets(event.target.value);
    setTotalPrice(event.target.value * 10);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
            Tickets Remaining: 100 Total Price: 1000{" "}
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
            value={1}
            disabled={true}
            fullWidth
          />
          <DialogContentText className={classes.dialogTitle}>
            Number of Tickets
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tickets"
            type="number"
            fullWidth
            onChange={handleTicketInput}
            value={tickets}
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Buy Tickets
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}