import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const PayPal = () => {
  const options = {
    "client-id":
      "Adfg4auv5WT05bcCncukkEKHPwifv8gYGLKj0yQdsnt26TWgBl9R5u5WtHqoVlGvmof0rA5x-IU9HKpJ",
    currency: "EUR",
  };

  return (
    <PayPalScriptProvider options={options}>
      <PayPalButtons
        style={{
          layout: "horizontal",
          label: "subscribe",
          tagline: false,
        }}
      />
    </PayPalScriptProvider>
  );
};
export default PayPal;
