import { useLoadUserQuery } from '@/redux/features/api/appSlice';
import { useCreateOrderMutation } from '@/redux/features/order/orderApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
  setOpen: any;
  data:any
};

const CheckOutForm = ({ setOpen, data }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<any>("");
    const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
    const [loadUser, setLoadUser] = useState(false);
    const {} = useLoadUserQuery({ skip: loadUser ? false : true });
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (!elements || !stripe) {
        return;
      }
      setIsLoading(true)
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if(error){
        setMessage(error.message);
        setIsLoading(true);
      }else{
        if(paymentIntent && paymentIntent.status === "succeeded"){
            setIsLoading(false)
            createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
      }
    };
    useEffect(() => {
      if (orderData) {
        setLoadUser(true);
        redirect(`/course-access/${data._id}`);
      }
      if(error){
        if("data" in error){
          const errorData = error as any;
          toast.error(errorData.data.message);
        }
      }
    }, [orderData, error]);
    
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <br />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span
          id="button-text"
          className="px-6 py-3 bg-blue-400 cursor-pointer rounded-2xl hover:translate-x-2 text-white transition-all duration-300"
        >
          {isLoading ? "Paying" : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckOutForm