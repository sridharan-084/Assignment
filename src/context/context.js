import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));

  const [details, setDetails] = useState();
  const [Package, setPackage] = useState("Monthly");
  const [card, setCard] = useState(null);
  const [plan, setPlan] = useState({
    Monthly: [
      {
        type: "Mobile",
        price: 100,
        quality: "Good",
        resolution: "480p",
        usedin: ["Phone", "Tablet"],
      },
      {
        type: "Basic",
        price: 200,
        quality: "Good",
        resolution: "780p",
        usedin: ["Phone", "Tablet"],
      },
      {
        type: "Standard",
        price: 500,
        quality: "Better",
        resolution: "1080p",
        usedin: ["Phone", "Tablet", "Laptop", "TV"],
      },
      {
        type: "Premium",
        price: 700,
        quality: "Best",
        resolution: "4K",
        usedin: ["Phone", "Tablet", "Laptop", "TV"],
      },
    ],
    Yearly: [
      {
        type: "Mobile",
        price: 1100,
        quality: "Good",
        resolution: "480p",
        usedin: ["Phone", "Tablet"],
      },
      {
        type: "Basic",
        price: 2300,
        quality: "Good",
        resolution: "780p",
        usedin: ["Phone", "Tablet"],
      },
      {
        type: "Standard",
        price: 5000,
        quality: "Better",
        resolution: "1080p",
        usedin: ["Phone", "Tablet", "Laptop", "TV"],
      },
      {
        type: "Premium",
        price: 7000,
        quality: "Best",
        resolution: "4K",
        usedin: ["Phone", "Tablet", "Laptop", "TV"],
      },
    ],
  });
  return (
    <AuthContext.Provider
      value={{
        userEmail,
        setUserEmail,
        details,
        setDetails,
        plan,
        setPlan,
        Package,
        setPackage,
        card,
        setCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
