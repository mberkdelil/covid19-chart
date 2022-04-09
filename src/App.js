import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import covid from "./covid.png";
import { useEffect, useState } from "react";
import AreaChart from "./AreaChart.jsx";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "50px auto",
    width: "50%"
  }
}));

function App() {

  const [countrie, setCountries] = useState([]);
  const [country, setCountry] = useState("Turkey");

  useEffect(() => {
    axios.get("https://api.covid19api.com/countries")
      .then(res => setCountries(res.data));
  }, []);

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <img src={covid} alt="CovidPNG" style={{ width: "100px", height: "100px", marginTop: "20px" }} />
          <FormControl className={classes.formControl}>
            <Select
              value={country}
              onChange={e => setCountry(e.target.value)}>
              {
                countrie.map(country => (
                  <MenuItem value={country.Slug}>{country.Country}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Grid item xs={12}>
            <Paper>
              <AreaChart country={country} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
