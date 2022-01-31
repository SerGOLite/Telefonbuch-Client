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
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./components/table";
import AddDataForm from "./components/addForm";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Popup from "./components/popup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import InfoDisplay from "./components/infoDisplay";
import Box from "@mui/material/Box";
import GroupIcon from "@mui/icons-material/Group";
import Badge from "@mui/material/Badge";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

//* ----- UNWICHTIG -----
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "30%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

// Slide Efect für PoupAllert. Muss außerhalb App Funktion sein
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
// -------------ENDE--------

// Info Display Bediengung (Badge) fuktioniert auch ohne, deswegen auskommentiert
// function notifikationslabel(count) {
//   if (count === 0) {
//     return "no notification";
//   }
//   if (count > 99) {
//     return "more than 99 notifications";
//   }
//   return;
// }
// ---------------ENDE---------------
//* ----- UNWICHTIG Ende -----

function createData(name, adresse, telefonnummer) {
  return {
    name,
    adresse,
    telefonnummer,
  };
}

function App() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  //-- Hier werden die Daten von Außen geholt
  React.useEffect(() => {
    async function getData() {
      // ---------Version mit Dummy

      //       const result = [
      //         {
      //           id: 0,
      //           name: "test user",
      //           adresse: "demo street",
      //           telefonnummer: "123456",
      //         },
      //       ];
      //       const people = result.map((x) =>
      //       createData(x.name, x.adresse, x.telefonnummer)
      //     );

      //     setRows(people);
      //     setFilteredRows(people);
      //   }
      //   getData();
      // }, [rows]);

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

  // --- Variante mit Dummy Datesätzen
  // React.useEffect(() => {
  //   const people = [
  //     createData("Saturn, Anna", "12346 Berlin | Anstr. 1", "123456789"),
  //     createData("Cobalt, Olaf", "12346 Berlin | Ruhestr. 2", "123456789"),
  //     createData(
  //       "Merkur, Frank",
  //       "12346 Berlin | Altenweg Straße 3",
  //       "123456789"
  //     ),
  //     createData("Venus, Alex", "12346 Aachen | Anstr. 1", "123456789"),
  //     createData("Erde, Clara", "12346 Norden | Anstr. 1", "123456789"),
  //     createData("Mars, Ilon", "12346 Köln | Anstr. 1", "123456789"),
  //     createData("Jupiter, Gloria", "12346 Berlin | Anstr. 1", "123456789"),
  //     createData("Uranus, Konny", "12346 Frankfurt | Anstr. 1", "123456789"),
  //     createData("Neptun, Miriam", "12346 München | Anstr. 1", "123456789"),
  //     createData("Graphen, Erik", "12346 Münster | Anstr. 1", "123456789"),
  //     createData("Nickel, Rebeca", "12346 Dortmund | Anstr. 1", "123456789"),
  //     createData("Chrom, Natalie", "12346 Kiel | Anstr. 1", "123456789"),
  //     createData("Iod, Nora", "12346 Rostok | Anstr. 1", "123456789"),
  //     createData("Brom, Alisa", "12346 Hanover | Anstr. 1", "123456789"),
  //     createData("Silicium, Dora", "12346 Hann | Anstr. 1", "123456789"),
  //   ];
  //   setRows(people);
  //   setFilteredRows(people);
  // }, []);

  // Neu Datesatz hinzufügen
  // const addPerson = (name, adresse, telefon) => {
  //   const newPerson = {
  //     name: name,
  //     adresse: adresse,
  //     telefon: telefon,
  //   };
  //   rows.push(newPerson);
  //   console.log(rows, newPerson);
  //   setRows(rows);
  // };

  // Neu Datesatz hinzufügen
  const addPerson = (name, adresse, telefonnummer) => {
    if (rows.some((v) => v.name.toLowerCase() === name.toLowerCase())) {
      //TODO: Fehler ausgeben
      return;
    }

    const newPerson = {
      name: name,
      adresse: adresse,
      telefonnummer: telefonnummer,
    };
    setRows(rows.concat([newPerson]));

    const searchValue = document.getElementById("searchField").value;

    if (
      searchValue === "" ||
      newPerson.name.toLowerCase().includes(searchValue)
    ) {
      setFilteredRows(filteredRows.concat([newPerson]));
      return;
    }
  };

  // Datesätze löschen (Einfache Vers.)
  // const deleteItems = (items) => {
  //   const updateData = rows.filter((row) => !items.includes(row.name));
  //   setRows(updateData);
  // };

  // Datesätze löschen (Erweiterte Version)
  const deleteItems = (items) => {
    let updatedData = rows.filter((row) => !items.includes(row.name));
    setRows(updatedData);
    updatedData = filteredRows.filter((row) => !items.includes(row.name));
    setFilteredRows(updatedData);
  };

  // Suchleiste in Appbar. Optimirt für rücksetzung von der Tabelle nach dem leeren des Eingabefeld
  const sucheNachBegriff = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === " ") {
      setFilteredRows(rows);
      setFilterApplied(false);
      return;
    }

    const filteredRows = rows.filter((entry) =>
      entry.name.toLowerCase().includes(value)
    );
    setFilteredRows(filteredRows);
    setFilterApplied(true);
    console.log(rows, filteredRows);
  };

  // ----------Popup Allert (Closen nur durch Schließbutton)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ------------Ende Popup Allert

  return (
    <>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <PhoneIcon sx={{ mr: 4 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Telefonbuch
            </Typography>
            {/* ------------- POPUP ALLERT "NEU EINTRAG HINZUFÜGEN" in DialogFenster*/}
            <IconButton color="inherit" onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              // onClose={handleClose} (Close durch cklick außerhalb Fenster)
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <div style={{ display: "flex" }}>
                  <Typography
                    variant="h6"
                    color="GrayText"
                    component="div"
                    style={{ flexGrow: 1 }}
                  >
                    {"Neu Eintrag hinzufügen"}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon color="error" />
                  </IconButton>
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Bitte Name, Nachnahme sowie Adresse und Telefonnummer
                  hinzufügen.
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
            {/* ------ENDE POPUP ALLERT "NEU EINTRAG HINZUFÜGEN" in DialogFenster */}

            {/*------2x Badge als InfoDisplay am AppBar*/}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={rows.length} color="success" showZero>
                  <GroupIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                // aria-label={notifikationslabel(100)}
                color="inherit"
              >
                <Badge
                  badgeContent={filterApplied ? filteredRows.length : 0}
                  color="warning"
                  showZero
                >
                  <PersonSearchIcon />
                </Badge>
              </IconButton>
            </Box>
            {/* Ende - Badge als InfoDisplay */}

            {/* Suchleiste im AppBar*/}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Suche…"
                inputProps={{ "aria-label": "search" }}
                onChange={sucheNachBegriff}
                id="searchField"
                // onChange={(e) => sucheNachBegriff(e.target.value)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </div>

      <InfoDisplay
        filteredRows={filteredRows}
        filterApplied={filterApplied}
        infoDisplay={{ test: 1 }}
      />

      <div>
        <Table rows={filteredRows} deleteItems={deleteItems} />
      </div>
    </>
  );
}

export default App;
