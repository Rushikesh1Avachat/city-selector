import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

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

  // Fetch states
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

  // Fetch cities
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
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* State */}
        <select
          value={state}
          disabled={!country}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* City */}
        <select
          value={city}
          disabled={!state}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Box>

      {city && (
        <Typography mt={4} fontSize="1.2rem">
          You selected <b>{city}</b>, {state}, {country}
        </Typography>
      )}
    </Box>
  );
}

export default CitySelector;
