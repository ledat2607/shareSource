import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Loader from '../../Loader/Loader';
import { format } from "timeago.js";
import { useDeleteUserMutation, useGetAllUserQuery, useUpdateRoleMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
type Props = {
  isTeam: boolean;
};

const AllUser: React.FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const { isLoading, data, refetch } = useGetAllUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess }] = useDeleteUserMutation();
  const [active, setActive] = useState(false);
  const [userIdDel, setUserIdDel] = useState("");
  const [activeDelete, setActiveDelete] = useState(false);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [updateRole, { isSuccess, error: updateError }] =
    useUpdateRoleMutation();
  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (isSuccess) {
      refetch();
      toast.success("Update role successfull");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Delete user successfull !");
      setActiveDelete(false);
    }
  }, [updateError, isSuccess, deleteSuccess]);
  const handleOpenDelete = (id:any)=>{
    setActiveDelete(!activeDelete);
    setUserIdDel(id);
  }

  const handleDeleteUser = async (id:any) => {
    await deleteUser({ id });
  };
  let columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Tên người dùng", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "birthDay", headerName: "Ngày sinh", flex: 0.3 },
    { field: "created_at", headerName: "Ngày tạo", flex: 0.5 },
    {
      field: "delete",
      headerName: "Xóa",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <AiOutlineDelete
            onClick={() => handleOpenDelete(params.row.id)}
            className="dark:text-white text-black"
            size={20}
          />
        </Button>
      ),
    },
    {
      field: "sendEmail",
      headerName: "Gửi Email",
      flex: 0.2,
      renderCell: (params: any) => (
        <Button>
          <a href={`mailto:${params.row.email}`}>
            <AiOutlineMail className="dark:text-white text-black" size={20} />
          </a>
        </Button>
      ),
    },
  ];

  if (isTeam) {
    columns.splice(4, 0, { field: "role", headerName: "Phân quyền", flex: 0.3 });
  } else {
    columns.splice(4, 0, { field: "course", headerName: "Thanh toán", flex: 0.3 });
  }

  const rows: any = [];
  if (isTeam) {
    const newData =
      data && data.user.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          birthDay: item.birthDay.slice(0, 10),
          role: item.role,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.user.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          birthDay: item.birthDay.slice(0, 10),
          course: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateRole({ id: userId, role });
  };

  const handleClose = () => {
    setActive(false);
    setUserId("");
    setRole("");
  };
  return (
    <div className="mt-20">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex-end">
              <div
                onClick={() => setActive(!active)}
                className="w-[20%] text-[20px] text-white rounded-2xl px-2 py-2 hover:translate-x-3 transition-all duration-300 bg-teal-500 cursor-pointer flex items-center justify-center font-Josefin"
              >
                Add new member
              </div>
            </div>
          )}
          {active ? (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-80 z-[100000]">
              <div className="bg-white dark:bg-slate-700 rounded-md p-4 800px:w-[25%] w-[90%]">
                <h1 className="text-center font-[600] capitalize text-[20px] dark:text-white text-black">
                  Add new member to Admin team
                </h1>
                <div className="flex flex-col mt-6">
                  <label className="dark:text-white text-black text-[20px] font-Josefin">
                    User Id
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter user id want to add admin group...."
                    className="px-3 py-3 rounded-2xl text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="dark:text-white text-black text-[20px] font-Josefin">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="px-3 py-3 rounded-2xl dark:text-white text-black"
                  >
                    <option value="">Choose user role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="flex w-[70%] mx-auto justify-between">
                  <div
                    onClick={handleClose}
                    className="cursor-pointer w-[120px] mt-4 rounded-2xl px-3 py-3 dark:bg-slate-800 flex justify-center items-center dark:text-white text-black font-Josefin font-[700] text-[20px] border border-slate-800"
                  >
                    Close
                  </div>
                  <div
                    onClick={() => handleSubmit()}
                    className="cursor-pointer w-[120px] mt-4 rounded-2xl px-3 py-3 dark:bg-slate-800 flex justify-center items-center dark:text-white text-black font-Josefin font-[700] text-[20px] border border-slate-800"
                  >
                    Submit
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {activeDelete ? (
            <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-gray-800 bg-opacity-80 z-[1000]">
              <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 800px:w-[20%] w-[90%]">
                <h1 className="text-center font-[600] text-[25px] font-Josefin dark:text-white text-black">
                  Are you sure want to delete this user ?{" "}
                </h1>
                <div className="w-full flex justify-between items-center">
                  <div
                    onClick={() => handleDeleteUser(userIdDel)}
                    className="px-3 py-4 rounded-2xl bg-teal-500 flex justify-center items-center cursor-pointer font-[600] font-Josefin text-white hover:-translate-x-3 duration-300 transition-all"
                  >
                    Confirm
                  </div>
                  <div
                    onClick={() => handleOpenDelete("")}
                    className="px-3 py-4 rounded-2xl bg-teal-500 flex justify-center items-center cursor-pointer font-[600] font-Josefin text-white hover:translate-x-3 duration-300 transition-all"
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <Box
            m="20px 0 0 0"
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
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllUser;
