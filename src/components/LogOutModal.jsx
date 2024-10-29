import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { Link } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogOutModal = ({ showModal, handleCloseModal }) => {
  return (
    <Dialog
      open={showModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"LOGGING OFF"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to Log Off?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Link to={"/"}>
          <Button onClick={handleCloseModal}>Confirm</Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default LogOutModal;
