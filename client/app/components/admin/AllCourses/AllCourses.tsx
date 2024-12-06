import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import {  useDeleteCourseMutation, useGetAllCourseQuery } from '@/redux/features/courses/apiCourse';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js";
import toast from 'react-hot-toast';
import Link from 'next/link';
type Props = {};

const AllCourses: React.FC<Props> = () => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllCourseQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courseId, setCourseId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Delete course successfull !");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errMessage = error as any;
        toast.error(errMessage.data.message);
      }
    }
  }, [isSuccess, error]);
  
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.7 },
    { field: "title", headerName: "Tiêu đề khóa học", flex: 0.7 },
    { field: "ratings", headerName: "Đánh giá", flex: 0.5 },
    { field: "purchased", headerName: "Lượt tham gia", flex: 0.5 },
    { field: "created_at", headerName: "Ngày tạo", flex: 0.5 },
    {
      field: "delete",
      headerName: "Xóa",
      flex: 0.3,
      renderCell: (params: any) => (
        <Button>
          <AiOutlineDelete
            onClick={() => {
              setOpen(true);
              setCourseId(params.row.id);
            }}
            className="dark:text-white text-black"
            size={20}
          />
        </Button>
      ),
    },
    {
      field: "edit",
      headerName: "Chỉnh sửa",
      flex: 0.3,
      renderCell: (params: any) => (
        <Link href={`edit-course/${params.row.id}`}>
          <Button>
            <AiOutlineEdit className="dark:text-white text-black" size={20} />
          </Button>
        </Link>
      ),
    },
  ];
  const rows:any = [];
  {
    data &&
      data.allCourse.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.rating,
          purchased: item.purchased,
          created_at: format(item.createdAt),
        });
      });
  }
  const handleDeleteCourse = async () => {
    const id = courseId;
    await deleteCourse(id);
  };
  return (
    <div className="mt-20">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqj2vy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePaganition--root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-colunm-cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
                borderBottom: "none",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
            {open ? (
              <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-gray-800 bg-opacity-80 z-[1000]">
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 800px:w-[20%] w-[90%]">
                  <h1 className="text-center font-[600] text-[25px] font-Josefin dark:text-white text-black">
                    Are you sure want to delete this course ?{" "}
                  </h1>
                  <div className="w-full flex justify-between items-center">
                    <div
                      onClick={() => handleDeleteCourse()}
                      className="px-3 py-4 rounded-2xl bg-teal-500 flex justify-center items-center cursor-pointer font-[600] font-Josefin text-white hover:-translate-x-3 duration-300 transition-all"
                    >
                      Confirm
                    </div>
                    <div className="px-3 py-4 rounded-2xl bg-teal-500 flex justify-center items-center cursor-pointer font-[600] font-Josefin text-white hover:translate-x-3 duration-300 transition-all">
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
