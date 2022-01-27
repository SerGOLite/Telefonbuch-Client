import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// const Img = styled('img')({
//   margin: 'auto',
//   display: 'block',
//   maxWidth: '100%',
//   maxHeight: '100%',
// });

export default function InfoDisplay({ filteredRows }) {
  console.log(filteredRows);
  //   return (
  //     <div>
  //       <h1>Anzahl</h1>
  //       {/* <h2>Gesammt: {rows.length} </h2> */}

  //       <h2>Suchergebniss: {filteredRows.length} </h2>
  //     </div>
  //   );
  // }

  return (
    <Paper sx={{ p: 1.5, margin: "auto", maxWidth: 200, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item></Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Anzahl
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Gesammt:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Suchergebniss: {filteredRows.length}
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
