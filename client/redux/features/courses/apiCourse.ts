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
    getCourseConten: builder.query({
      query: (id: any) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "add-question",
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include" as const,
      }),
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "add-answer",
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
      }),
    }),
    addReview: builder.mutation({
      query: ({ review, rating, courseId }: any) => ({
        url: `add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),
    addReplyReview: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: "add-review-reply",
        method: "PUT",
        body: { comment, courseId, reviewId },
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
  useGetCourseContenQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewMutation,
  useAddReplyReviewMutation
} = apiCourse;