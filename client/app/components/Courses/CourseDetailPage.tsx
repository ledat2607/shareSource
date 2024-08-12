import { useGetCourseQuery } from '@/redux/features/courses/apiCourse';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import CourseDetail from "./CourseDetail";
import Footer from '../Footer';
import { useCreatePaymentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/order/orderApi';
import { loadStripe } from "@stripe/stripe-js";
type Props = {
  id: string;
};

const CourseDetailPage: React.FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [createPayment, { data: paymentIntentData }] =
    useCreatePaymentMutation();

  useEffect(() => {
    if (config) {
      const publishableKey = config.stripePublishKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPayment(amount);
    }
  }, [config, data]);
  useEffect(() => {
   if(paymentIntentData){
    setClientSecret(paymentIntentData?.client_secret);
   }
  }, [paymentIntentData])
  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={`${data.course.name} - Elearning`}
            description=""
            keywords={data.course.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetail
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailPage