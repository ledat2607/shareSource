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
    getAllCourse: builder.query({
      query: () => ({
        url: "all-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `update-course/${id}`,
        method: "PUT",
        body: { data },
        credentials: "include" as const,
      }),
    }),
    getAllUserCourses: builder.query({
      query: () => ({
        url: "get-all-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourse: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetAllUserCoursesQuery,
  useGetCourseQuery,
} = apiCourse;