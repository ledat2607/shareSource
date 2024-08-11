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
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "payment/stripepublishablekey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPayment: builder.mutation({
      query: (amount) => ({
        url: "payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "add-course",
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include" as const,
      }),
    }),
  }),
});
export const {
  useGetAllOrderQuery,
  useGetStripePublishableKeyQuery,
  useCreatePaymentMutation,
  useCreateOrderMutation,
} = orderApi;