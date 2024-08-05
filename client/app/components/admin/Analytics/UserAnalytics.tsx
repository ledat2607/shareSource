import React from "react";
import { useUserAnalyticsQuery } from "@/redux/features/analytics/apiAnalytics";
import { Bar } from "react-chartjs-2";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/style/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  isDashboard: boolean;
};

const UserAnalytics: React.FC<Props> = ({ isDashboard }: Props) => {
  const { data, isLoading, isError } = useUserAnalyticsQuery({});
  const analyticsData: any = [];
  data &&
    data.user?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });
  const chartData = {
    labels: analyticsData.map((item: any) => item.name),
    datasets: [
      {
        label: "UV",
        data: analyticsData.map((item: any) => item.uv),
        backgroundColor: "#3faf82",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "User Analytics",
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={`${isDashboard ? "h-[50vh]" : "h-screen"}`}>
          <div>
            <h1
              className={`${styles.title} ${
                isDashboard ? "pt-0" : "pt-5"
              } pl-5 uppercase !text-[30px] font-[700]`}
            >
              User Analytics
            </h1>
            <p className={`${styles.label} text-center`}>
              Last 12 Months analytics data
            </p>
            <div
              className={`${
                isDashboard ? "w-[100%] mt-0" : "w-[90%] h-[90%] mt-10"
              } flex items-center justify-center`}
            >
              <div
                className={`${isDashboard ? "w-full h-[50%]" : "w-4/5 h-1/2"}`}
              >
                <Bar data={chartData} options={options} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
