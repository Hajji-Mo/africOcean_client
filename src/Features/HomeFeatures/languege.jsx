import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { colors } from "../../../MaterialTheme";
import { useNavigate } from "react-router-dom";

const languege = localStorage.getItem("lang")
  ? JSON.parse(localStorage.getItem("lang"))
  : "en";
export default function Selectlanguage({ mobile }) {
  const [lang, setLang] = useState(languege);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setLang(event.target.value);
    window.location.reload();
  };
  localStorage.setItem("lang", JSON.stringify(lang));
  return (
    <FormControl sx={{ mt: 1, mr: 1, minWidth: 90 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={lang}
        variant="standard"
        label="lang"
        disableUnderline
        onChange={handleChange}
        sx={{ color: mobile ? colors.black : colors.white }}
      >
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
}
