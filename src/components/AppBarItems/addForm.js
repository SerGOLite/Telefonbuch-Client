import { useState } from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function AddDataForm({ addPerson }) {
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //TODO: Nachlesen, wofür hier? Um das leeres Eintrag zu verhindern Analog zu false in HTML????
    addPerson(name, adresse, telefonnummer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={1}
        direction="row"
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
            margin="normal"
            id="nameField"
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
            margin="normal"
            id="adresseField"
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
            label="Telefonnummer"
            variant="outlined"
            placeholder="Eingabe..."
            margin="normal"
            id="telefonnummerField"
            // value=""
          />
        </Grid>
        <Divider />
        {/* ---------- Grid mit dem "Speicher" Button */}

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          // spacing={0}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"

            // spacing={0}
          >
            <Button
              // style={{padding}}
              startIcon={<SaveIcon />}
              size="large"
              style={{
                fontSize: 14,
                height: 50,
                padding: "0 90px",
                margin: "25px",

                // alignSelf: "stretch",
                // borderRadius: 25,
              }}
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
