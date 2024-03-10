import React from "react";
import Navbar from "../Features/HomeFeatures/Navbar";
import Carousel from "react-material-ui-carousel";
import { BannerCarousels } from "../utils/Carousel";
import Banner from "../Features/HomeFeatures/Banner";
import { Box, Container, Grid, Stack } from "@mui/material";
import ProductCard from "../Features/HomeFeatures/ProductCard";
import { colors } from "../../MaterialTheme";
import { useGetProductsQuery } from "../State/productsApiSlice";
import Category from "../Features/category/Category";
import ButtonNav from "../Features/HomeFeatures/ButtonNav";

function HomePage() {
  const lang = JSON.parse(localStorage.getItem("lang"));

  const { data, isLoading } = useGetProductsQuery(lang);

  let allCategory, categories;
  if (data) {
    allCategory = data.doc.map((product) =>
      product[lang]?.category?.toLowerCase().trim()
    );
    categories = allCategory.filter(
      (value, index) => allCategory.indexOf(value) === index
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <Stack direction={"row"}>
          {data &&
            categories.map((category, index) => (
              <Category
                category={category}
                key={index}
                products={data.doc}
                lang={lang}
              />
            ))}
        </Stack>
        <Carousel animation="slide" indicators={false} duration={300}>
          {BannerCarousels.map((banner, i) => (
            <Banner key={i} banner={banner} />
          ))}
        </Carousel>
      </Container>
      <Box sx={{ bgcolor: colors.Grey100, py: 4, mb: 4 }}>
        <Container>
          <Grid container spacing={1}>
            {data &&
              data.doc.map((product) => (
                <ProductCard product={product} key={product._id} lang={lang} />
              ))}
          </Grid>
        </Container>
      </Box>
      <ButtonNav />
    </>
  );
}

export default HomePage;
