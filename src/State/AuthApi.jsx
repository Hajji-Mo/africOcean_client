import { api } from "./api";

export const userApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (credentials) => ({
        url: "api/v1/users/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signIn: build.mutation({
      query: (credentials) => ({
        url: "api/v1/users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useRegisterMutation, useSignInMutation } = userApiSlice;
