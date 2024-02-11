import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../contexts/LoginContextProvider";

export default function Canceled() {
  const { userID } = useContext(LoginContext);
  let navigate = useNavigate();

  useEffect(() => {
    const deleteLatestBooking = async () => {
      try {
        await axios.delete(
          `https://localhost:3001/api/delete-booking/${userID}`
        );
        console.log("Latest booking deleted successfully");
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    };

    // Delete the last booking made
    deleteLatestBooking();

    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [userID]);

  return (
    <div>
      <h2>Canceled</h2>
    </div>
  );
}
