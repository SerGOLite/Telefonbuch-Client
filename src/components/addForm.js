import { useState } from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

export default function AddDataForm({ addPerson }) {
  const [userInput, setUserInput] = useState("");
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //Frage: Wofür hier? Um das leeres Eintrag zu verhindern Analog zu false in HTML????
    console.log("handleSubmit", userInput, name, adresse, telefonnummer);
    document.getElementById("nameField").value = "";
    document.getElementById("adresseField").value = "";
    document.getElementById("telefonnummerField").value = "";

    addPerson(name, adresse, telefonnummer);
  };

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <PersonAddAlt1Icon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            onChange={(e) => setName(e.target.value)}
            label="Name, Vorname"
            variant="outlined"
            placeholder="Eingabe..."
            margin="dense"
            id="nameField"
            // value=""
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <AddBusinessIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            onChange={(e) => setAdresse(e.target.value)}
            label="Adresse"
            variant="outlined"
            placeholder="Eingabe..."
            margin="dense"
            id="adresseField"
            // value=""
          />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <AddIcCallIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            onChange={(e) => setTelefonnummer(e.target.value)}
            label="telefonnummer"
            variant="outlined"
            placeholder="Eingabe..."
            margin="dense"
            id="telefonnummerField"
            // value=""
          />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid container spacing={2}>
            <Button
              startIcon={<SaveIcon />}
              size="large"
              style={{ fontSize: 14 }}
              onClick={(e) => handleSubmit(e)}
              // onClick={(e) => {handleSubmit(e); setOpen(false);}} Um nach dem Speichern zu schließen
              variant="contained"
              color="primary"
              border-radius="25px"
            >
              Speichern
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
