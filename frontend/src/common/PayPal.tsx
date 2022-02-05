import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useEffect, useState } from "react"
import ModalCompleted from "./Success"

interface ButtonProps {
  type: string
  onOpen: (name: string) => void
}

const ButtonWrapper: React.FC<ButtonProps> = ({ type, onOpen }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  /* const onApproveData = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      if (details.status === "COMPLETED") {
        onOpen(`${details.payer.email_address} + ${data.orderID}`)
      } else {
        alert("Something went wrong.. !")
      }
    })
  } */

  return (
    <PayPalButtons
      createSubscription={async (data, actions) => {
        return await actions.subscription
          .create({
            plan_id: "P-1XT149815W653711XMDNBSVQ",
          })
          .then((orderId) => {
            return orderId
          })
      }}
      onApprove={async (data, actions) => {
        if (actions) {
          const order = await actions.order.capture()
          if (order) {
            if (order.status === "COMPLETED") {
              onOpen(`${order.payer.email_address} + ${data.orderID}`)
            } else {
              alert("Something went wrong.. !")
            }
          }
        }
      }}
      onError={(error) => alert(error)}
      style={{
        label: "subscribe",
      }}
    />
  )
}

export const PayPal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [name, setName] = useState<string>("")

  const onComplete = (name: string) => {
    setName(name)
    setOpen(true)
  }

  const options = {
    "client-id": "AVM4IyQ5Hbl8lKhpk9zKbTf9T1VFciTHz9T83C4CY1L6zw88y90LmkM1Dc3hnYiLY7Ryd7L-5dU6AcBx",
    currency: "EUR",
    intent: "subscription",
    vault: true,
  }
  return (
    <div>
      <PayPalScriptProvider options={options}>
        <ButtonWrapper type="subscription" onOpen={() => onComplete(name)} />
      </PayPalScriptProvider>
      {open ? <ModalCompleted name={name} handleClose={() => setOpen(false)} open={open} /> : <></>}
    </div>
  )
}
export default PayPal
