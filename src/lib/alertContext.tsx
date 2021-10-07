import React, { useContext, useState } from "react";

interface IAlertContext {
  alert: string;
  setAlert: React.Dispatch<React.SetStateAction<string>>;
}

const AlertContext = React.createContext<IAlertContext>({
  alert: "",
  setAlert: () => {},
});

export const AlertContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState("");

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
      {/* {alert ? <AlertBar isError={Boolean(alert)}>{alert}</AlertBar> : null} */}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const { alert, setAlert } = useContext(AlertContext);

  return {
    alert,
    setAlert,
  };
};
