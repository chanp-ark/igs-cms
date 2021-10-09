import React from "react";

interface ConditionalWrapProps {
  condition: boolean;
  wrap: (children: React.ReactNode) => JSX.Element;
}

const ConditionalWrap: React.FC<ConditionalWrapProps> = ({
  condition,
  wrap,
  children,
}) => (condition ? React.cloneElement(wrap(children)) : <>{children}</>);

export default ConditionalWrap;
