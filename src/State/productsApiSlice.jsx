import { api } from "./api";

export const productApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (lang) => `api/v1/products?lang=${lang}`,
      providesTags: ["products"],
    }),
    searchProducts: build.query({
      query: (options) => `api/v1/products/search/${options}`,
      providesTags: ["products"],
    }),
    getOneProduct: build.query({
      query: ({ id, lang }) => `api/v1/products/${id}?lang=${lang}`,
      providesTags: ["products"],
    }),
    uploadImages: build.mutation({
      query: (formFiles) => ({
        url: "api/v1/products/uploadImages",
        method: "POST",
        body: formFiles,
        formData: true,
      }),
    }),
    createProduct: build.mutation({
      query: (data) => ({
        url: "api/v1/products",
        method: "POST",
        body: data,

        formData: true,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetOneProductQuery,
  useCreateProductMutation,
  useUploadImagesMutation,
} = productApiSlice;
