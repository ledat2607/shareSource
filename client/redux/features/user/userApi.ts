import { apiSlide } from "../api/appSlice";

export const userApi = apiSlide.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name, birthDay }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name, birthDay },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-pass",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "get-all-user",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateRole: builder.mutation({
      query: ({ id, role }) => ({
        url: "update-role",
        method: "PUT",
        body: { id, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ userId, courseId }) => ({
        url: "update-course",
        method: "PUT",
        body: { userId, courseId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUserQuery,
  useUpdateRoleMutation,
  useDeleteUserMutation,
  useUpdateCourseMutation,
} = userApi;