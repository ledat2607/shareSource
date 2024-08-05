import { apiSlide } from "../api/appSlice";

export const analyticsApi = apiSlide.injectEndpoints({
  endpoints: (builder) => ({
    courseAnalytics: builder.query({
      query: () => ({
        url: "get-course-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    orderAnalytics: builder.query({
      query: () => ({
        url: "get-order-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    userAnalytics: builder.query({
      query: () => ({
        url: "get-user-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCourseAnalyticsQuery,
  useOrderAnalyticsQuery,
  useUserAnalyticsQuery,
} = analyticsApi;