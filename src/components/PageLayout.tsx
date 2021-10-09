import React from "react";
import Sidebar from "./Sidebar";

const PageLayout: React.FC = ({ children }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <Sidebar />
      {children}
    </div>
  );
};

export default PageLayout;
