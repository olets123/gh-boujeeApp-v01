import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const PayPal = () => {
  const options = {
    "client-id":
      "AVM4IyQ5Hbl8lKhpk9zKbTf9T1VFciTHz9T83C4CY1L6zw88y90LmkM1Dc3hnYiLY7Ryd7L-5dU6AcBx",
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
