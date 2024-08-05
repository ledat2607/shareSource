import React from "react";
import { useOrderAnalyticsQuery } from "@/redux/features/analytics/apiAnalytics";
import { Line } from "react-chartjs-2";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/style/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = { isDashboard: boolean };

const OrderAnalytics: React.FC<Props> = ({ isDashboard }: Props) => {
  const { data, isLoading, isError } = useOrderAnalyticsQuery({});
  const analyticsData: any = [];
  data &&
    data.order?.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });

  const chartData = {
    labels: analyticsData.map((item: any) => item.name),
    datasets: [
      {
        label: "UV",
        data: analyticsData.map((item: any) => item.uv),
        backgroundColor: "#3faf82",
        borderColor: "#3faf82",
        fill: false,
        tension: 0.5, // Làm mượt các đường nối
        pointBackgroundColor: "#3faf82",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#3faf82",
      },
    ],
  };

  const options:any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Order Analytics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
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
              Order Analytics
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
                <Line data={chartData} options={options} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
