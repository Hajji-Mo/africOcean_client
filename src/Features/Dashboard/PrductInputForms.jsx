import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Input,
  Link,
  ListItem,
  MenuItem,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { data } from "../../utils/catagories";
function PrductInputForms({ langData, lang, handleChange }) {
  const currentCatagory = data.find((subs) => subs.title === langData.category);
  const notChoosed = langData.category === "";
  const text = lang === "en" ? "fill by English" : "fill by France";
  return (
    <Stack>
      <Typography sx={{ pb: "2rem", pt: "2rem", textAlign: "center" }}>
        {text}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <TextField
            autoComplete="given-name"
            name={`${lang}_name`}
            required
            fullWidth
            id={`${lang}_name`}
            label={`${lang} name`}
            autoFocus
            value={langData.name}
            onChange={(e) => handleChange(lang, "name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            required
            fullWidth
            select
            id={`${lang}_Category`}
            label={`${lang} Category`}
            name={`${lang}_Category`}
            value={langData.category}
            autoComplete="Category"
            onChange={(e) => handleChange(lang, "category", e.target.value)}
          >
            {data &&
              data.map((option, index) => {
                return (
                  <MenuItem key={index} value={option.title}>
                    {option.title}
                  </MenuItem>
                );
              })}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            required
            fullWidth
            select
            value={langData.subcatagory}
            name={`${lang}_SubCategory`}
            label={`${lang} SubCategory`}
            id={`${lang}_SubCategory`}
            autoComplete="SubCategory"
            disabled={notChoosed}
            onChange={(e) => handleChange(lang, "subcategory", e.target.value)}
          >
            {currentCatagory &&
              currentCatagory.subcatagory.map((option, index) => {
                return (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="text"
            name={`${lang}_Description`}
            label={`${lang} Description`}
            autoComplete={`${lang}_Description`}
            multiline
            value={langData.description}
            onChange={(e) => handleChange(lang, "description", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            multiline
            name={`${lang}_summary`}
            label={`${lang} Summary`}
            id={`${lang}_summary`}
            autoComplete={`${lang}_summary`}
            value={langData.summary}
            onChange={(e) => handleChange(lang, "summary", e.target.value)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default PrductInputForms;
