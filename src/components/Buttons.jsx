import { useNavigate } from "react-router-dom";
import React from "react";
export const Back = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate(-1)}>Back</button>;
};

