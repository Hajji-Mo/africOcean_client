import React, { useEffect, useState } from "react";

// import { useGetOneProductQuery } from "../State/api";
import { useParams } from "react-router-dom";
import Navbar from "../Features/HomeFeatures/Navbar";

import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { colors } from "../../MaterialTheme";
import { useGetOneProductQuery } from "../State/productsApiSlice";

import { selectCurrentUser } from "../State/AuthSlice";
import { useSelector } from "react-redux";
import { connectSocket, socket } from "../State/socetApi";
import PrdocutContent from "../Features/DetailFeatures/PrdocutContent";

function ProductDetail() {
  const lang = JSON.parse(localStorage.getItem("lang"));
  const user = useSelector(selectCurrentUser);

  const { id } = useParams();
  const pram = { id, lang };
  const { data, isLoading } = useGetOneProductQuery(pram);

  return (
    <Stack>
      <Navbar />
      {data && (
        <PrdocutContent
          subcategory={data.doc[lang].subcategory}
          name={data.doc[lang].name}
          price={data.doc.price}
          coverImage={data.doc.coverImg}
          description={data.doc[lang].description}
          summary={data.doc[lang].summary}
          creadtorId={data.doc.creator._id}
          images={data.doc.images}
        />
      )}
      <Stack>
        <Typography>Other Recomendations for you</Typography>
      </Stack>
    </Stack>
  );
}

export default ProductDetail;
