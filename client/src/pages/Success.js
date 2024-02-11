import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div>
      <h2>Success</h2>
    </div>
  );
}
