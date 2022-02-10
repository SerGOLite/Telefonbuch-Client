import * as React from "react";
// import "./App.css";
import AddDataForm from "./addForm";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

// Slide Efect für PoupAllert. Muss außerhalb App Funktion sein
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddIconButton({ addPerson }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              color="GrayText"
              component="div"
              style={{ flexGrow: 1, padding: "20px", fontSize: 26 }}
              textAlign="center"
            >
              {"Neu Eintrag hinzufügen"}
            </Typography>
            <IconButton
              style={{ width: "50px", height: "50px" }}
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon color="error" />
            </IconButton>
          </div>
          <div style={{ display: "flex" }}>
            <Typography
              variant="h6"
              color="GrayText"
              component="div"
              style={{ flexGrow: 1, padding: "20px", fontSize: 14 }}
              textAlign="center"
            >
              {
                "Bitte Name, Nachnahme sowie Adresse und Telefonnummer hinzufügen."
              }
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* Bitte Name, Nachnahme sowie Adresse und Telefonnummer
                  hinzufügen. */}
            <Grid>
              <AddDataForm addPerson={addPerson} />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Ja</Button>
                <Button onClick={handleClose} autoFocus>
                  Nein
                </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
