import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import ModalCompleted from "./Success";

interface ButtonProps {
  type: string;
  onOpen: (name: string) => void;
}

const ButtonWrapper: React.FC<ButtonProps> = ({ type, onOpen }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: "P-1XT149815W653711XMDNBSVQ",
          })
          .then((orderId) => {
            return orderId;
          });
      }}
      onApprove={(data, actions) => {
        return actions?.order.capture().then((details) => {
          if (details.status === "COMPLETED") {
            onOpen(details.payer.email_address);
          } else {
            alert("Something went wrong.. !");
          }
        });
      }}
      style={{
        label: "subscribe",
      }}
    />
  );
};

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
    intent: "subscription",
    vault: true,
  };
  return (
    <div>
      <PayPalScriptProvider options={options}>
        <ButtonWrapper type="subscription" onOpen={() => onComplete(name)} />
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
