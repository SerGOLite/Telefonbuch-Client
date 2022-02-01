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

  // ---- Neu Datesatz hinzufügen
  const addPerson = async (name, adresse, telefonnummer) => {
    if (rows.some((v) => v.name.toLowerCase() === name.toLowerCase())) {
      //TODO: Fehler ausgeben
      return;
    }

    const newPerson = {
      name: name,
      adresse: adresse,
      telefonnummer: telefonnummer,
    };
    // fetch("https://fakestoreapi.com/products", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: "test product",
    //     price: 13.5,
    //     description: "lorem ipsum set",
    //     image: "https://i.pravatar.cc",
    //     category: "electronic",
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((json) => console.log(json));
    await fetch("http://localhost:8082/api/person/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newPerson),
    })
      .then((res) => {
        console.log(res);
        res.json().then((data) => {
          console.log(data);
          setRows(rows.concat([data]));
          setFilteredRows(rows.concat([data]));
        });
      })

      .catch((error) => {
        console.error("Fehler: ", error);
      });

    // ---ENDE- Neu Datesatz hinzufügen

    // ----
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

  // ---- Suchleiste in Appbar. Mit rücksetzung der Anzeige von Tabelle nach dem leeren des Suchfelds
  const sucheNachBegriff = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
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
            {/* ------------- POPUP/ DIALOG Fenster "NEU EINTRAG HINZUFÜGEN" -------------*/}
            {/* ---------ADD BUTTON */}
            <IconButton color="inherit" onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
            {/* ---------Dialog/Popup Fenster */}
            <Dialog
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
            {/* ------ENDE POPUP ALLERT "NEU EINTRAG HINZUFÜGEN" in DialogFenster */}

            {/*-------------------------------2x Badge als InfoDisplay am AppBar*/}
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
                {/* Diese Badge zeigt null sobald die nicht gesucht wird */}
                <Badge
                  badgeContent={filterApplied ? filteredRows.length : 0}
                  color="warning"
                  showZero
                >
                  <PersonSearchIcon />
                </Badge>
              </IconButton>
            </Box>
            {/* -------------------------------Ende - Badge als InfoDisplay */}

            {/* Suchleiste im AppBar */}
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
