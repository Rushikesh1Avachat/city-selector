import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const API_BASE = "https://location-selector.labs.crio.do";

 function CitySelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  // Fetch countries
  useEffect(() => {
    fetch(`${API_BASE}/countries`)
      .then((res) => res.json())
      .then(setCountries)
      .catch((err) =>
        console.error("Error fetching countries:", err)
      );
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!country) return;

    setState("");
    setCity("");
    setCities([]);

    fetch(`${API_BASE}/country=${country}/states`)
      .then((res) => res.json())
      .then(setStates)
      .catch((err) =>
        console.error("Error fetching states:", err)
      );
  }, [country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!state) return;

    setCity("");

    fetch(
      `${API_BASE}/country=${country}/state=${state}/cities`
    )
      .then((res) => res.json())
      .then(setCities)
      .catch((err) =>
        console.error("Error fetching cities:", err)
      );
  }, [state, country]);

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" mb={4}>
        Select Location
      </Typography>

      <Box display="flex" justifyContent="center" gap={2}>
        {/* Country */}
        <FormControl>
          <Select
            value={country}
            displayEmpty
            onChange={(e) => setCountry(e.target.value)}
          >
            <MenuItem value="">Select Country</MenuItem>
            {countries.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* State */}
        <FormControl disabled={!country}>
          <Select
            value={state}
            displayEmpty
            onChange={(e) => setState(e.target.value)}
          >
            <MenuItem value="">Select State</MenuItem>
            {states.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* City */}
        <FormControl disabled={!state}>
          <Select
            value={city}
            displayEmpty
            onChange={(e) => setCity(e.target.value)}
          >
            <MenuItem value="">Select City</MenuItem>
            {cities.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {city && (
        <Typography mt={4} fontSize="1.2rem">
          You selected <b>{city}</b>, {state}, {country}
        </Typography>
      )}
    </Box>
  );
}
export default CitySelector