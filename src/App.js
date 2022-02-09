import { useState } from "react";
import "./App.css";
import Table from "./components/table";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";

import "./components/table";
// import AddDataForm from "./components/addForm";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

import InfoDisplay from "./components/infoDisplay";
import Lettering from "./components/AppBarItems/Lettering";
import Badges from "./components/AppBarItems/Badges";
import SearchField from "./components/AppBarItems/SearchField";
import AddIconButton from "./components/AppBarItems/AddIconButton";
import MyMenuIcon from "./components/AppBarItems/MenuIcon";

// // Slide Efect für PoupAllert. Muss außerhalb App Funktion sein
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
// // -------------ENDE Slide Efect--------

// Funtion um die neu Daten zu Kreieren (nicht mehr zu gebrauchen bei verb. mit Server)
// function createData(name, adresse, telefonnummer) {
//   return {
//     name,
//     adresse,
//     telefonnummer,
//   };
// }
// Das Hauptteil...
function App() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  //-- Hier werden die Daten von Server (MongoDB) geholt
  React.useEffect(() => {
    async function getData() {
      fetch("http://localhost:8082/api/person/", {
        //     // mode: "no-cors",
        method: "GET",
        //     // credentials: "include",
      }).then((res) => {
        console.log("1", res);
        // setRows(res.json());
        res.json().then((data) => {
          console.log("data", data, null, 2);
          setRows(data);
          setFilteredRows(data);
        });
      });
      //   // const ris = result.json();
      //   // console.log(result, ris);
    }
    getData();
  }, []);

  React.useEffect(() => {
    console.log("2", rows);
  }, [rows]);

  // // ---- Neu Datesatz in DB hinzufügen
  // const addPerson = async (name, adresse, telefonnummer) => {
  //   if (rows.some((v) => v.name.toLowerCase() === name.toLowerCase())) {
  //     //TODO: Fehler ausgeben
  //     return;
  //   }

  //   const newPerson = {
  //     name: name,
  //     adresse: adresse,
  //     telefonnummer: telefonnummer,
  //   };

  //   await fetch("http://localhost:8082/api/person/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify(newPerson),
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       res.json().then((data) => {
  //         console.log(data);
  //         setRows(rows.concat([data]));
  //         setFilteredRows(rows.concat([data]));
  //       });
  //     })

  //     .catch((error) => {
  //       console.error("Fehler: ", error);
  //     });
  // };
  // // ---ENDE- Neu Datesatz hinzufügen

  // Datesätze löschen (Einfache Vers.)
  // const deleteItems = (items) => {
  //   const updateData = rows.filter((row) => !items.includes(row.name));
  //   setRows(updateData);
  // };

  // Datesätze löschen (Erweiterte Version) Löscht derzeit nur bei Client
  const deleteItems = (items) => {
    let updatedData = rows.filter((row) => !items.includes(row.name));
    setRows(updatedData);
    updatedData = filteredRows.filter((row) => !items.includes(row.name));
    setFilteredRows(updatedData);
  };

  // ---- Suchleiste in Appbar. Mit rücksetzung der Anzeige von Tabelle nach dem leeren des Suchfelds
  const sucheNachBegriff = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      setFilteredRows(rows);
      setFilterApplied(false);
      return;
    }

    // Gefilterte Felder
    const filteredRows = rows.filter((entry) =>
      entry.name.toLowerCase().includes(value)
    );
    setFilteredRows(filteredRows);
    setFilterApplied(true);
    console.log(rows, filteredRows);
  };

  return (
    <>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <MyMenuIcon />
            <PhoneIcon sx={{ mr: 4 }} />
            <Lettering />
            <AddIconButton />

            {/* ------------- POPUP/ DIALOG Fenster "NEU EINTRAG HINZUFÜGEN" -------------*/}
            {/* <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              // onClose={handleClose} (Close durch cklick außerhalb Fenster AUS)
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
            {/* </DialogActions>
            </Dialog>  */}
            {/* ------ENDE POPUP ALLERT "NEU EINTRAG HINZUFÜGEN" in DialogFenster */}

            <Badges
              rows={rows}
              filteredRows={filteredRows}
              filterApplied={filterApplied}
            />
            <SearchField sucheNachBegriff={sucheNachBegriff} />
          </Toolbar>
        </AppBar>
      </div>
      <InfoDisplay
        rows={rows}
        filteredRows={filteredRows}
        filterApplied={filterApplied}
      />
      <div>
        <Table rows={filteredRows} deleteItems={deleteItems} />
      </div>
    </>
  );
}

export default App;
