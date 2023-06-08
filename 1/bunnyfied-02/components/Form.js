import React from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";

import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@mui/material";

import { postApiOne } from "../routes";

export default function Form() {
  const paperStyle = { padding: "25px 10px", width: 350, margin: "250px auto" };
  const headerStyle = { margin: 0 };
  const FormControlStyle = { marginTop: 5 };

  async function formHandel(e) {
    let status = e.target.status.value == "yes";
    const payload = {
      firstName: e.target.fn.value,
      lastName: e.target.ln.value,
      status: status,
    };
    postApiOne(payload);
  }

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>MUI TUTORIAL</h2>
          <Typography variant="caption">
            Demo project for developers to learn quickly.
          </Typography>
        </Grid>
        <form onSubmit={formHandel}>
          <TextField
            id="fn"
            fullWidth
            label="First Name"
            placeholder="enter your first name"
            style={{ marginTop: 10 }}
          />
          <TextField
            id="ln"
            fullWidth
            label="Last Name"
            placeholder="enter your last name"
            style={{ marginTop: 10 }}
          />
          <FormControl component="fieldset" style={FormControlStyle}>
            <FormLabel component="legend">Vote</FormLabel>
            <RadioGroup
              id="status"
              aria-label="status"
              name="status"
              style={{ display: "initial" }}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <FormControlLabel
            control={<Checkbox name="checkedA" />}
            label="I accept the terms and conditions."
          />
          <Button type="submit" variant="contained" color="primary">
            Vote Now
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
