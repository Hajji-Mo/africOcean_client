import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { colors } from "../../../MaterialTheme";
import { addToCart } from "../../State/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ product, lang }) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: "",
  });

  function goProductDetail() {
    Navigate(`/product/${product._id}`);
  }
  function handleCart() {
    dispatch(addToCart(product));
    setAlert({
      ...alert,
      visible: true,
      color: "success",
      message: "The product is successfully added into your Cart",
    });
    setTimeout(() => {
      setAlert({ ...alert, visible: false });
    }, 3000);
  }
  const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
  const s3_REGION = import.meta.env.VITE_AWS_REGION;
  return (
    <>
      {product[lang]?.name && (
        <Grid item xs={6} sm={4} lg={3} xlg={2} sx={{ position: "relative" }}>
          {alert.visible && (
            <Alert
              variant="filled"
              severity={alert.color}
              sx={{ position: "absolute" }}
            >
              {alert.message}
            </Alert>
          )}
          <Card
            sx={{
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#fff",
              },
            }}
          >
            <CardMedia
              component="img"
              image={`https://${S3_BUCKET_NAME}.s3.${s3_REGION}.amazonaws.com/${product.coverImg}`}
              alt="green iguana"
              sx={{
                height: "100%",
                width: "100%",
                transition: "width .4s",
                // "&:hover": {
                //   width: 300,
                // },
              }}
              onClick={goProductDetail}
            />
            <CardContent
              sx={{
                "&:last-child": {
                  paddingBottom: "1rem",
                },
              }}
            >
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Box
                  variant="h4"
                  component={"h4"}
                  className="tex-ellipsis"
                  sx={{ margin: 0, marginBottom: 1 }}
                >
                  {product[lang]?.name}
                </Box>
                <IconButton
                  sx={{ color: colors.main, mt: -1 }}
                  onClick={handleCart}
                >
                  <FaShoppingCart />
                </IconButton>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                className="tex-ellipsis"
              >
                {product[lang]?.description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <Box
                  variant="h4"
                  component="h4"
                  fontWeight={"bold"}
                  sx={{ margin: 0 }}
                >
                  $ {product.price}
                </Box>
                <Button variant="text" sx={{ textTransform: "capitalize" }}>
                  Order now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
}
