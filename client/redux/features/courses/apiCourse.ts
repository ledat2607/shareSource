import { apiSlide } from "../api/appSlice";


export const apiCourse = apiSlide.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "upload-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = apiCourse;