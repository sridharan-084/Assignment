import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AfterLogin = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  useEffect(() => {
    let login = localStorage.getItem("accessToken");
    if (login) {
      navigate("/");
    }
  });
  return <Component></Component>;
};

export default AfterLogin;
