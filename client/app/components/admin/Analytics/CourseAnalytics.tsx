import React from "react";
import { useCourseAnalyticsQuery } from "@/redux/features/analytics/apiAnalytics";
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

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, isError } = useCourseAnalyticsQuery({});
  const analyticsData: any = [];
  data &&
    data.course.last12Months?.forEach((item: any) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });
  console.log(data);
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
        text: "Courses Analytics",
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div>
            <h1
              className={`${styles.title} pt-5 pl-5 uppercase !text-[30px] font-[700]`}
            >
              Courses Analytics
            </h1>
            <p className={`${styles.label} text-center`}>
              Last 12 Months analytics data
            </p>
            <div className="w-full mt-10 h-[90%] flex items-center justify-center">
              <div className="w-4/5 h-1/2">
                <Bar data={chartData} options={options} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
