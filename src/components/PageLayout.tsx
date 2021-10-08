import React from "react";
import { Page } from "../lib/types";
import Sidebar from "./Sidebar";

interface Props {
  page: Page;
}

const PageLayout: React.FC<Props> = ({ page, children }) => {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <Sidebar page={page} />
        {children}
      </div>
    </>
  );
};

export default PageLayout;
