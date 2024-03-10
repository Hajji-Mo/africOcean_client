import { Button, List, ListItemButton, Paper, Stack } from "@mui/material";
import React, { useState } from "react";

function Subcategories({ index, subcategory, products, lang }) {
  const [toggle, setToggle] = useState(false);
  const filteredProducties = products.filter(
    (product) => product[lang]?.subcategory.toLowerCase().trim() === subcategory
  );

  const allBrands = filteredProducties.map((product) =>
    product.brand.toLowerCase().trim()
  );

  const brands = allBrands.filter(
    (value, index) => allBrands.indexOf(value) === index
  );

  return (
    <Stack
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      <ListItemButton sx={{ position: "relative", minWidth: "7rem" }}>
        {subcategory}
      </ListItemButton>
      {toggle && (
        <Paper
          sx={{ position: "absolute", marginLeft: "7rem", minWidth: "7rem" }}
        >
          <List>
            {brands.map((brand, i) => (
              <BrandCategory key={i} brand={brand} />
            ))}
          </List>
        </Paper>
      )}
    </Stack>
  );
}

function BrandCategory({ brand }) {
  return <ListItemButton>{brand}</ListItemButton>;
}

function Category({ category, products, lang }) {
  const [toggle, setToggle] = useState(false);

  const filteredProducties = products.filter(
    (product) => product[lang]?.category?.toLowerCase().trim() === category
  );

  const allSubcategory = filteredProducties.map((product) =>
    product[lang]?.subcategory?.toLowerCase().trim()
  );
  const allsubcategories = allSubcategory.filter(
    (value, index) => allSubcategory.indexOf(value) === index
  );

  return (
    <Stack
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      <Button sx={{ position: "relative", textTransform: "capitalize" }}>
        {category}
      </Button>
      {toggle && (
        <Paper
          sx={{
            position: "absolute",
            mt: 4,
            zIndex: 100,
            pt: 0,
          }}
        >
          <List>
            {allsubcategories &&
              allsubcategories.map((subcategory) => (
                <Subcategories
                  key={subcategory}
                  subcategory={subcategory}
                  products={products}
                  lang={lang}
                />
              ))}
          </List>
        </Paper>
      )}
    </Stack>
  );
}

export default Category;
