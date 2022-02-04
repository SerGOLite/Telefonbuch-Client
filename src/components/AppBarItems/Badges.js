import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import GroupIcon from "@mui/icons-material/Group";

// Bediengung (Badge) fuktioniert auch ohne, deswegen auskommentiert
// function notifikationslabel(count) {
//   if (count === 0) {
//     return "no notification";
//   }
//   if (count > 99) {
//     return "more than 99 notifications";
//   }
//   return;
// }
// ---------------ENDE Bediengung---------------

export default function Badges({ rows, filteredRows, filterApplied }) {
  console.log(rows, filterApplied, filteredRows);
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
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
          {/* Diese Badge zeigt null sobald es nicht gesucht wird */}
          <Badge
            badgeContent={filterApplied ? filteredRows.length : 0}
            color="warning"
            showZero
          >
            <PersonSearchIcon />
          </Badge>
        </IconButton>
      </Box>
    </>
  );
}
