import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { connectSocket, socket } from "../../State/socetApi";
import { selectCurrentUser } from "../../State/AuthSlice";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../MaterialTheme";
const S3_BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
const s3_REGION = import.meta.env.VITE_AWS_REGION;
function PrdocutContent({
  subcategory,
  name,
  description,
  price,
  summary,
  coverImage,
  creadtorId,
  images,
}) {
  const [coverImg, setCoverImg] = useState(coverImage);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const quantity = "10";
  const proDiscount = 6;
  const discount = (price * proDiscount) / 100;
  const pay = price - discount;
  const handleChat = () => {
    if (user) {
      if (!socket) connectSocket(user._id);
      socket.emit("start_conversation", {
        to: creadtorId,
        from: user._id,
      });
    }
    navigate("/Chat");
  };

  return (
    <Container>
      <Box mt={3}>
        <Typography
          variant="h5"
          component={"h5"}
          sx={{ textTransform: "capitalize" }}
        >
          {subcategory && subcategory} | {name && name}{" "}
        </Typography>
      </Box>
      <Stack
        sx={{
          mt: 3,
          display: "block",
          "@media screen and (min-width: 768px)": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          },
        }}
      >
        <Box>
          <Card
            sx={{
              width: "100%",
              "@media screen and (min-width: 768px)": {
                height: "70vh",
              },
            }}
          >
            <CardMedia
              component="img"
              image={`https://${S3_BUCKET_NAME}.s3.${s3_REGION}.amazonaws.com/${coverImage}`}
              alt="green iguana"
              sx={{
                width: "100%",
                height: "100%",
                transition: "width .4s",
                "&:hover": {
                  width: "103%",
                },
              }}
            />
          </Card>
          <Stack
            direction={"row"}
            sx={{
              overflowX: "auto",
            }}
          >
            {images.map((image, index) => (
              <ImgCard image={image} key={index} setCoverImg={setCoverImg} />
            ))}
          </Stack>
        </Box>
        <Paper
          sx={{
            px: 3,
            pt: 5,
            border: ".5px solid rgba(0, 0, 0, 0.1)",
            "@media screen and (max-width: 768px)": {
              mt: 3,
            },
          }}
          elevation={0}
        >
          <Stack>
            <Typography variant="h5" fontWeight={"bold"}>
              ${price}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: colors.Brown }}
            >
              {quantity
                ? ` buy ${quantity}, to get discount of ${proDiscount}% ($${discount}) and pay $${pay}`
                : ""}
            </Typography>
          </Stack>
          {summary &&
            summary
              .split(/\s+(?=\w+:)/)
              .map((address, index) => (
                <Typography key={index}>
                  {address
                    .split(/(?=:)/)
                    .map((x, i) => (i === 0 ? <b key={i}>{x}</b> : x))}{" "}
                </Typography>
              ))}
          <Stack direction={"row"}>
            <Button variant="contained" className="buttonGroups btnConained">
              Add To cart
            </Button>
            <Button variant="outlined" className="buttonGroups btnOutlined">
              Order Now
            </Button>
            <Button
              variant="contained"
              className="buttonGroups btnConained"
              onClick={handleChat}
            >
              Chat Now
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <Paper sx={{ mt: 3, pt: 2, pl: 1 }}>
        <Typography sx={{ pb: 2 }} variant="h4">
          key Attributes
        </Typography>
        {description &&
          description
            .split(/\s+(?=\w+:)/)
            .map((address, index) => (
              <Typography key={index}>
                {address
                  .split(/(?=:)/)
                  .map((x, i) => (i === 0 ? <b key={i}>{x}</b> : x))}{" "}
              </Typography>
            ))}
      </Paper>
    </Container>
  );
}
function ImgCard({ image, setCoverImg }) {
  return (
    <Stack
      mt={"1rem"}
      sx={{
        "&:not(:first-Child)": {
          marginLeft: ".5rem",
        },
      }}
    >
      <Card
        sx={{
          width: "5rem",
          height: "5rem",
          transition: "width .4s",
          "&:hover": {
            border: "1px solid #000",
          },
        }}
        onClick={() => setCoverImg(image)}
      >
        <CardMedia
          component="img"
          image={`https://${S3_BUCKET_NAME}.s3.${s3_REGION}.amazonaws.com/${image}`}
          alt="green iguana"
          sx={{
            width: "100%",
            height: "100%",
            transition: "width .4s",
            "&:hover": {
              width: "95 %",
            },
          }}
        />
      </Card>
    </Stack>
  );
}
export default PrdocutContent;
