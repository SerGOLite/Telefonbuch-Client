import { useState } from "react";
import "./App.css";
import Table from "./components/table";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./components/table";
import AddDataForm from "./components/addForm";
import Grid from "@mui/material/Grid";

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
    marginLeft: theme.spacing(1),
    width: "auto",
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

//* ----- UNWICHTIG Ende -----

function createData(name, adresse, telefon) {
  return {
    name,
    adresse,
    telefon,
  };
}

function App() {
  // WICHTIG
  const [rows, setRows] = useState([
    createData("Saturn, Anna", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Cobalt, Olaf", "12346 Berlin | Ruhestr. 2", "123456789"),
    createData(
      "Merkur, Frank",
      "12346 Berlin | Altenweg Straße 3",
      "123456789"
    ),
    createData("Venus, Alex", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Erde, Clara", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Mars, Ilon", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Jupiter, Gloria", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Uranus, Konny", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Neptun, Miriam", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Graphen, Erik", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Nickel, Rebeca", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Chrom, Helena", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Iod, Nora", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Brom, Alisa", "12346 Berlin | Anstr. 1", "123456789"),
    createData("Silicium, Dora", "12346 Berlin | Anstr. 1", "123456789"),
  ]);

  // Neu Datesatz hinzufügen
  const addPerson = (name, adresse, telefon) => {
    const newPerson = {
      name: name,
      adresse: adresse,
      telefon: telefon,
    };
    rows.push(newPerson);
    console.log(rows, newPerson);
    setRows(rows);
  };
  //
  // Datesätze löschen
  const deleteItems = (items) => {
    //WICHTIG

    const updateData = rows.filter((row) => !items.includes(row.name));
    setRows(updateData);
  };

  const sucheNachBegriff = (begriff) => {
    //WICHTIG
    console.log("hallo von suchbegriff", begriff);
  };

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
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Telefonbuch
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => sucheNachBegriff(e.target.value)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </div>
      <Grid>
        {/* <h3> Gesamtanzahl: {rows.length}</h3>
        <h3> Neu Eintrag hinzufügen:</h3> */}
        <AddDataForm addPerson={addPerson} />
      </Grid>
      <div>
        <Table rows={rows} deleteItems={deleteItems} />
      </div>
    </>
  );
}

export default App;
