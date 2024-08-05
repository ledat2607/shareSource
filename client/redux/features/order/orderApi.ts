import { apiSlide } from "../api/appSlice";

export const orderApi = apiSlide.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (type) => ({
        url: "all-order",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {useGetAllOrderQuery} = orderApi