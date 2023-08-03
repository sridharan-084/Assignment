import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import axios from "axios";

const CenteredDiv = () => {
  const [data, setData] = useState("");
  const [hide, setHide] = useState("");
  //const [dates, setDates] = useState([]);
  const navigate = useNavigate();
  const { Package } = useContext(AuthContext);

  const GetDetails = async () => {
    try {
      let email = localStorage.getItem("email");
      console.log("before", email);
      if (email) {
        email = await JSON.parse(email);
        //console.log(email);
        console.log("details", email);
        const result = await axios.post("http://localhost:4000/details", {
          email: email,
        });
        console.log(result.data.user[0]);
        await setData(result.data.user[0]);
        await setHide(false);
        // GetTime(result.data.createdAt);
        return result;
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const res = GetDetails();
  }, []);

  const handleCancel = async () => {
    try {
      let email = localStorage.getItem("email");
      if (email) {
        email = JSON.parse(email);
        console.log("details", email);
        const result = await axios.post("http://localhost:4000/cancelsub", {
          email: email,
        });
        //setData("");
        setData((prev) => {
          return { ...prev, subscribe: false };
        });
        setHide(true);
        return result;
      }
    } catch (error) {
      return error;
    }
  };

  const GetTime = () => {
    const dateStr = data.createdAt;
    const date = new Date(dateStr);

    // Add one month
    if (Package === "Monthly") {
      date.setMonth(date.getMonth());
    } else {
      date.setFullYear(date.getFullYear());
    }
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate1 = date.toLocaleDateString("en-US", options);
    if (Package === "Monthly") {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setFullYear(date.getFullYear() + 1);
    }
    const formattedDate2 = date.toLocaleDateString("en-US", options);

    //setDates([formattedDate1, formattedDate2]); // Output: "September 3, 2023"
    return [formattedDate1, formattedDate2];
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
      <div className="bg-light w-50 p-5 position-relative border border-black">
        <div className="row">
          <div className="col">
            <p className="h2">Current Plane Details</p>
          </div>
          <div className="col d-flex justify-content-end">
            {hide ? (
              <></>
            ) : (
              <button className="btn btn-primary" onClick={handleCancel}>
                Cancel Plan
              </button>
            )}
          </div>
        </div>

        <p className="h4">Status:</p>
        {data.subscribe ? (
          <p className="h4 text-bg-success">Active</p>
        ) : (
          <p className="h4 text-bg-danger">Cancelled</p>
        )}
        <p className="h5">{data.PlanType}</p>
        <p className="h6">
          {data.Devices !== undefined && data.Devices.length > 0
            ? data.Devices.join("+")
            : ""}
        </p>
        <p className="h3">{data.monthlyPrice}</p>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/subscribe")}
            >
              Choose Plan
            </button>
          </div>
        </div>
        <p className="border border-black mt-1 p-3 rounded">
          {`Your Subscription is started on ${
            GetTime()[0]
          } and will auto renew on ${GetTime()[1]}`}
        </p>
      </div>
    </div>
  );
};

export default CenteredDiv;
