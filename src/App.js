import { useState } from "react";
import "./App.css";
import Table from "./components/table";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import PhoneIcon from "@mui/icons-material/Phone";
import { Typography } from "@mui/material";

import "./components/table";

import InfoDisplay from "./components/infoDisplay";
import Lettering from "./components/AppBarItems/Lettering";
import Badges from "./components/AppBarItems/Badges";
import SearchField from "./components/AppBarItems/SearchField";
import AddIconButton from "./components/AppBarItems/AddIconButton";
import MyMenuIcon from "./components/AppBarItems/MenuIcon";

function App() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [suchbegriff, setSuchbegriff] = useState("");

  const addPerson = async (name, adresse, telefonnummer) => {
    const newPerson = {
      name: name,
      adresse: adresse,
      telefonnummer: telefonnummer,
    };

    // wenn das backend ein ist, folgenden code auskommentieren
    setRows(rows.concat([newPerson]));

    // Wenn das backend an ist, folgenden Code einkommentieren
    // setFilteredRows(rows.concat([data]));wait fetch("http://localhost:8082/api/person/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify(newPerson),
    // }).then((res) => {
    //   res.json().then((data) => {
    //     setRows(rows.concat([data]));
    //     setFilteredRows(rows.concat([data]));
    //   });
    // });
  };

  React.useEffect(() => {
    async function getData() {
      // wenn backend ein ist, folgenden Code auskommenteiren
      const person = {
        name: "Person Name ",
        adresse: "Person Adresse ",
        telefonnummer: "123 + ",
      };
      const data = ["Alfred", "Ida", "Georg", "Sascha", "Jerry", "Sergej"].map(
        (name) => ({ ...person, name: name })
      );
      console.log(data);
      setRows(data);

      //wenn backend ein ist, folgenden Code einkommentieren
      // fetch("http://localhost:8082/api/person/", {
      //   method: "GET",
      // }).then((res) => {
      //   console.log("1", res);
      //   res.json().then((data) => {
      //     console.log("data", data, null, 2);
      //     setRows(data);
      //     setFilteredRows(data);
      //   });
      // });
    }
    getData();
  }, []);

  const deleteItems = (items) => {
    let updatedData = rows.filter((row) => !items.includes(row.name));
    setRows(updatedData);
    updatedData = filteredRows.filter((row) => !items.includes(row.name));
    setFilteredRows(updatedData);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <MyMenuIcon />
          <PhoneIcon sx={{ mr: 4 }} />
          <Lettering />
          <AddIconButton addPerson={addPerson} />

          <Badges
            rows={rows}
            filteredRows={filteredRows}
            filterApplied={false}
          />
          <SearchField setSuchbegriff={setSuchbegriff} />
        </Toolbar>
      </AppBar>
      <InfoDisplay
        rows={rows}
        filteredRows={filteredRows}
        filterApplied={suchbegriff.length > 0}
      />
      <Typography className="schrift">Test mit ClassName</Typography>
      <Typography sx={{ color: "blue" }}>Test mit Sx</Typography>
      <div style={{ color: "blue" }}>Test mit styles</div>
      <div>
        <Table
          rows={rows.filter(
            (entry) =>
              entry.name.toLowerCase().includes(suchbegriff) ||
              entry.adresse.toLowerCase().includes(suchbegriff) ||
              entry.telefonnummer.toLowerCase().includes(suchbegriff)
          )}
          deleteItems={deleteItems}
        />
      </div>
    </>
  );
}

export default App;
