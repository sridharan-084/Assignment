import React, { useState, useContext } from "react";
import "../Style/Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";
const Card = (props) => {
  return (
    <>
      <div>
        <input
          className="tab-input"
          type="radio"
          name={`radiotab-${props.Device}`}
          id={`tab-${props.Device}`}
          checked={props.isSelected}
          onChange={props.onSelect}
        />
        <div className="label">
          <label
            className="tab-label text-table-head"
            htmlFor={`tab-${props.Device}`}
          >
            {props.Device}
          </label>
        </div>

        <div className="content-list">
          <p className="text-content"> {props.Price}</p>
          <p className="text-content"> {props.Quality}</p>
          <p className="text-content"> {props.Resolution}</p>
          {props.UsedIn.map((ele, index) => (
            <div key={index} className="device-list">
              <i className="fas fa-mobile-alt text-icon"></i>
              <span className="text-icon-1">{ele}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Test = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  // const [Package, setPackage] = useState("monthly");
  const { plan, Package, setPackage, card, setCard } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleCardSelect = (device, currentcard) => {
    setSelectedCard((prev) => device);
    setCard(currentcard);
    console.log(card);
  };

  const handleNext = () => {
    console.log(selectedCard);
    if (selectedCard) {
      navigate("/payment");
    } else {
      alert("Please Select a plan");
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-30">
        <h3 className="fst-italic">Choose the right Plan for you</h3>
      </div>

      <div className="container d-flex justify-content-center align-items-center  ">
        <button
          className="btn btn-outline-primary text-black"
          onClick={() => setPackage("Monthly")}
        >
          Monthly
        </button>
        <button
          className="ms-2 btn btn-outline-primary text-black"
          onClick={() => setPackage("Yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="table-res">
        <div className="tab-hidden hide">
          <input
            className="tab-input-none"
            type="radio"
            name="radiotab"
            id="tab-1"
            checked={selectedCard === null} // Check if "None" card is selected
            onChange={() => setSelectedCard(null)} // Set selectedCard to null when "None" card is clicked
          />

          <div className="label"></div>

          <div className="content-list hide">
            <p className="text-content-1 ">Monthly price</p>
            <p className="text-content-1 ">Video quality</p>
            <p className="text-content-1 ">Resolution</p>
            <p className="text-content-1 ">Devices you can use to watch</p>
          </div>
        </div>

        {
          // console.log(Package)
          plan[Package].map((ele) => {
            return (
              <Card
                key={ele.type}
                Device={ele.type}
                Price={ele.price}
                Quality={ele.quality}
                Resolution={ele.resolution}
                UsedIn={ele.usedin}
                isSelected={selectedCard === ele.type}
                onSelect={() => handleCardSelect(ele.type, ele)}
              />
            );
          })
          // {type: 'Mobile', price: 100, quality: 'Good', resolution: '480p', usedin: Array(2)}
        }
      </div>

      <div className="container d-flex justify-content-center align-items-center vh-30">
        <button type="button" className="Button-blue" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default Test;
