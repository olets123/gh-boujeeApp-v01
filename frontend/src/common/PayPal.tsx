import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import ModalCompleted from "./Success";

export const PayPal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const onComplete = (name: string) => {
    setName(name);
    setOpen(true);
  };

  const options = {
    "client-id":
      "AVM4IyQ5Hbl8lKhpk9zKbTf9T1VFciTHz9T83C4CY1L6zw88y90LmkM1Dc3hnYiLY7Ryd7L-5dU6AcBx",
    currency: "EUR",
  };
  return (
    <div>
      {/* <button onClick={() => setOpen(true)}>OPEN</button> */}
      <PayPalScriptProvider options={options}>
        <PayPalButtons
          style={{
            layout: "horizontal",
            label: "subscribe",
            tagline: false,
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    // value: "19.99",
                    value: "00.01",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              if (details.status === "COMPLETED") {
                onComplete(name);
              } else {
                alert("ERROR");
              }
            });
          }}
        />
      </PayPalScriptProvider>
      {open ? (
        <ModalCompleted
          name={name}
          handleClose={() => setOpen(false)}
          open={open}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default PayPal;
