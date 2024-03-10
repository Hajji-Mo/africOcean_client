import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Grid,
  Box,
  Input,
  ListItem,
  Container,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Stack,
} from "@mui/material";
import PrductInputForms from "./PrductInputForms";
import {
  useCreateProductMutation,
  useUploadImagesMutation,
} from "../../State/productsApiSlice";
import { selectCurrentUser } from "../../State/AuthSlice";
import { useSelector } from "react-redux";

const UploadProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const [uploadImages] = useUploadImagesMutation();
  const user = useSelector(selectCurrentUser);
  const [coverImgFile, setCoverImg] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [lang, setLang] = useState("en");
  const [formData, setFormData] = useState({
    en: {
      name: "",
      description: "",
      category: "",
      subcategory: "",
      summary: "",
    },
    minQuantity: "",
    price: "",
    priceDiscount: "",
    coverImg: null,
    images: [],
    brand: "",
    tags: [],
    rank: "",
    country: "",
    creator: "",

    city: "",
  });

  const handleChange = (lang, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [lang]: { ...prevData[lang], [field]: value },
    }));
  };
  const handleCommonChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formFiles = new FormData();
    if (!imageFiles > 0) {
      throw Error("not selected any image");
    } else {
      imageFiles.forEach((file) => {
        formFiles.append("images", file);
      });
    }
    formFiles.append("coverImg", coverImgFile);
    if (user) {
      formData.creator = user._id;
    }
    try {
      const res = await uploadImages(formFiles);

      const { coverImg, images } = res.data;

      formData.coverImg = coverImg;
      formData.images = images;

      await createProduct(formData);
      // setFormData({
      //   en: {
      //     name: "",
      //     description: "",
      //     category: "",
      //     subcategory: "",
      //     summary: "",
      //   },
      //   fr: {
      //     name: "",
      //     description: "",
      //     category: "",
      //     subcategory: "",
      //     summary: "",
      //   },
      //   minQuantity: "",
      //   price: "",
      //   priceDiscount: "",
      //   coverImg: null,
      //   images: [],
      //   brand: "",
      //   tags: [],
      //   rank: "",
      //   country: "",
      //   creator: "",

      //   city: "",
      // });
    } catch (err) {
      throw Error(err);
    }
  };

  return (
    <Container sx={{ marginTop: "2.5rem" }}>
      <Typography variant="h4">Create Product</Typography>
      <Stack
        component={"form"}
        sx={{ mt: 1, mr: 1, minWidth: 90 }}
        size="small"
        direction={"row"}
      >
        <Typography variant="h6">Select languege:</Typography>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={lang}
          variant="standard"
          label="lang"
          disableUnderline
          sx={{ ml: ".5rem" }}
          onChange={(e) => setLang(e.target.value)}
        >
          <MenuItem value="en">
            <em>English</em>
          </MenuItem>
        </Select>
      </Stack>
      <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <PrductInputForms
          langData={formData[lang]}
          lang={lang}
          handleChange={handleChange}
        />

        <Typography sx={{ pb: "2rem", pt: "2rem", textAlign: "center" }}>
          Common Fields
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} lg={4}>
            <TextField
              autoComplete="brand"
              name="brand"
              required
              fullWidth
              id="brand"
              label="Brand"
              value={formData.brand}
              onChange={(e) => handleCommonChange("brand", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={4}>
            <TextField
              autoComplete="minQuantity"
              name="minQuantity"
              fullWidth
              id="minQuantity"
              label="min-Quantity"
              type="number"
              value={formData.minQuantity}
              onChange={(e) =>
                handleCommonChange("minQuantity", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={4}>
            <TextField
              autoComplete="price"
              name="price"
              type="number"
              required
              fullWidth
              id="price"
              label="Price"
              value={formData.price}
              onChange={(e) => handleCommonChange("price", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={4}>
            <TextField
              autoComplete="Price-Discount"
              name="PriceDiscount"
              fullWidth
              type="number"
              id="Price-Discount"
              label="Price Discount"
              value={formData.priceDiscount}
              onChange={(e) =>
                handleCommonChange("priceDiscount", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={4}>
            <TextField
              autoComplete="country"
              name="country"
              required
              fullWidth
              id="country"
              label="Country"
              value={formData.country}
              onChange={(e) => handleCommonChange("country", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={4}>
            <TextField
              autoComplete="city"
              name="city"
              required
              fullWidth
              id="city"
              label="City"
              value={formData.city}
              onChange={(e) => handleCommonChange("city", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} lg={4}>
            <TextField
              autoComplete="Tags"
              name="Tags"
              required
              fullWidth
              id="Tags"
              label="Tags"
              multiline
              value={formData.tags}
              onChange={(e) => handleCommonChange("tags", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              p={".7rem"}
              borderRadius={"3px"}
              textAlign="center"
              border={"1px solid rgba(0,0,0,0.3)"}
            >
              <Input
                type="file"
                accept="image/*"
                name=""
                onChange={(e) => setCoverImg(e.target.files[0])}
                style={{ display: "none" }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ textTransform: "capitalize" }}
                >
                  Select Cover Img
                </Button>
              </label>
              {coverImgFile && (
                <div>
                  <Typography
                    variant="subtitle1"
                    mt={2}
                    textTransform={"capitalize"}
                  >
                    Selected CoverImg:
                  </Typography>
                  <ListItem sx={{ pl: 5 }}>{coverImgFile.name}</ListItem>
                </div>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              p={".7rem"}
              borderRadius={"3px"}
              textAlign="center"
              border={"1px solid rgba(0,0,0,0.3)"}
            >
              <input
                type="file"
                accept="image/*"
                name=""
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (!files.length > 0) return;
                  setImageFiles(files);
                }}
                style={{ display: "none" }}
                id="multiple-file-input"
              />
              <label htmlFor="multiple-file-input">
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ textTransform: "capitalize" }}
                >
                  Select Images
                </Button>
              </label>

              {imageFiles.length > 0 && (
                <div>
                  <Typography
                    variant="subtitle1"
                    mt={2}
                    textTransform={"capitalize"}
                  >
                    Selected Images:
                  </Typography>
                  <ul>
                    {imageFiles.map((file) => (
                      <li key={file.name}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Box>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 3, mb: 2 }}
          >
            Upload
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default UploadProduct;
