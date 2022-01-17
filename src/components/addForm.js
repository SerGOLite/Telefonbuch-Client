import { useState } from "react";
import TextField from "@mui/material/TextField";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

export default function AddDataForm({ addPerson }) {
  const [userInput, setUserInput] = useState("");
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telefon, setTelefon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); //Frage: Wofür hier? Um das leeres Eintrag zu verhindern Analog zu false in HTML????
    console.log("handleSubmit", userInput, name, adresse, telefon);

    addPerson(name, adresse, telefon);
  };

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box sx={{ "& > :not(style)": { m: 2 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PersonAddAlt1Icon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
            />
            <TextField
              onChange={(e) => setName(e.target.value)}
              label="Name, Vorname"
              variant="standard"
              placeholder="Eingabe..."
              // value={userInput}
              // type="text"
              // onChange={handleChange}
              // onKeyDown={handleKeyPress}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AddBusinessIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={(e) => setAdresse(e.target.value)}
              label="Adresse"
              variant="standard"
              placeholder="Eingabe..."
              // value={userInput}
              // type="text"
              // onChange={handleChange}
              // onKeyDown={handleKeyPress}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AddIcCallIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={(e) => setTelefon(e.target.value)}
              label="Tel.Nr."
              variant="standard"
              placeholder="Eingabe..."
              // value={userInput}
              // type="text"
              // onChange={handleChange}
              // onKeyDown={handleKeyPress}
            />
          </Box>

          <Button
            startIcon={<SaveIcon />}
            size="large"
            style={{ fontSize: 14 }}
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            color="primary"
            border-radius="25px"
          >
            Speichern
          </Button>
        </Box>
      </form>
    </div>
  );
}
