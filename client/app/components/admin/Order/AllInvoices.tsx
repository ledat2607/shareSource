import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import { DataGrid,GridToolbar } from '@mui/x-data-grid';
import { useTheme } from 'next-themes';
import { useGetAllOrderQuery } from '@/redux/features/order/orderApi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';
import { useGetAllUserQuery } from '@/redux/features/user/userApi';
import { useGetAllCourseQuery } from '@/redux/features/courses/apiCourse';
import { AiOutlineMail } from 'react-icons/ai';



type Props = {
  isDashboard?: boolean;
};

const AllInvoices: React.FC<Props> = ({ isDashboard }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrderQuery({});
  const { data: userData } = useGetAllUserQuery({});
  const { data: courseData } = useGetAllCourseQuery({});
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.allOrder.map((item: any) => {
        const user = userData?.user?.find((u: any) => u._id === item.userId);
        const courses = courseData?.allCourse?.find(
          (c: any) => c._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: courses?.name,
          price: "$ " + courses?.price,
          created_at: format(item.createdAt),
        };
      });
    setOrderData(temp);
    }
  }, [userData,courseData, data]);

  const colunm: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    {
      field: "userName",
      headerName: "Tên người dùngs",
      flex: isDashboard ? 0.6 : 0.5,
    },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Tiêu đề khóa học", flex: 1 },
        ]),
    { field: "price", headerName: "Phí", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Ngày tạo", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail
                    className="dark:text-white text-black cursor-pointer"
                    size={25}
                  />
                </a>
              );
            },
          },
        ]),
  ];
  const rows:any = [];
  orderData && orderData.forEach((item:any)=>{
    rows.push({
      id: item._id,
      userName: item.userName,
      userEmail: item.userEmail,
      title: item.title,
      price: item.price,
      created_at: item.created_at,
    });
  })
  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow="hidden"
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
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={colunm}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices