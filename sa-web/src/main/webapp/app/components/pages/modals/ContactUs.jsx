import React from "react";
import { TextField, Button, IconButton } from "@material-ui/core";
import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";

function ContactUs() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <IconButton color="inherit" onClick={handleClickOpen}>
        <EmailIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <EmailIcon /> Contact Us
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth />
          <TextField margin="dense" id="email" label="Email (Don't worry, we won't spam you)" type="email" fullWidth />
          <TextField margin="dense" id="subject" label="What is this about?" type="text" fullWidth />
          <TextField
            margin="dense"
            id="message"
            label="Go ahead, we're listening..."
            type="text"
            fullWidth
            multiline="true"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            SUbmit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactUs;
