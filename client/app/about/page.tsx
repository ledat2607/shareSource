"use client";
import React, { useState } from "react";
import Image from "next/image";
import img from "../../public/assets/aboutus.png";
import Header from "../components/Header";

type Props = {};

const AboutPage = (props: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={2}
      />
      <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0">
              <Image
                src={img}
                alt="Về Chúng Tôi"
                width={400}
                height={400}
                className="rounded-full border-4 border-blue-500 shadow-lg"
              />
            </div>
            <div className="mt-5 md:mt-0 md:ml-6 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">Về Chúng Tôi</h1>
              <p className="text-lg mb-4">
                Chào mừng bạn đến với website của chúng tôi! Chúng tôi là một
                đội ngũ trẻ trung, năng động và nhiệt huyết, với sứ mệnh mang
                đến những trải nghiệm web tuyệt vời cho khách hàng. Với niềm đam
                mê công nghệ và sự sáng tạo không ngừng, chúng tôi tự hào cung
                cấp những dịch vụ chất lượng cao, đáp ứng mọi nhu cầu của bạn.
              </p>
              <p className="text-lg mb-4">
                Trong suốt những năm qua, chúng tôi đã tích lũy được nhiều kinh
                nghiệm trong các lĩnh vực như phát triển web, thiết kế giao
                diện, và tiếp thị số. Đội ngũ của chúng tôi luôn cập nhật những
                xu hướng mới nhất, ứng dụng những công nghệ tiên tiến nhất để
                đảm bảo mang đến cho bạn những giải pháp tốt nhất và hiệu quả
                nhất.
              </p>
              <p className="text-lg mb-4">
                Chúng tôi không chỉ đơn thuần là một công ty, mà còn là đối tác
                đáng tin cậy của bạn. Chúng tôi cam kết lắng nghe, thấu hiểu và
                đồng hành cùng bạn trong từng giai đoạn của dự án. Sự hài lòng
                của bạn là động lực lớn nhất để chúng tôi không ngừng phát triển
                và hoàn thiện.
              </p>
              <p className="text-lg mb-4">
                Nếu bạn có ý tưởng hoặc đang tìm kiếm giải pháp để phát triển
                kinh doanh trực tuyến, đừng ngần ngại liên hệ với chúng tôi.
                Chúng tôi luôn sẵn lòng hỗ trợ và mang đến những giá trị tốt
                nhất cho bạn.
              </p>
              <p className="text-lg">
                Cảm ơn bạn đã ghé thăm website của chúng tôi. Chúng tôi mong
                muốn được hợp tác cùng bạn và biến những ý tưởng thành hiện thực.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
