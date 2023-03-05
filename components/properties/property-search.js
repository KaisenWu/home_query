import { useRef } from "react";
import classes from "./property-search.module.css";
import Button from "../ui/button";

function PropertySearch(props) {
  const bedroomInputRef = useRef();
  const bathroomInputRef = useRef();
  const cityInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    // Access the value property.
    const selectedBedroom = bedroomInputRef.current.value;
    const selectedBathroom = bathroomInputRef.current.value;
    const selectedCity = cityInputRef.current.value;

    props.onSearch(selectedBedroom, selectedBathroom, selectedCity);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="bedroom">Bedroom</label>
          <select id="bedroom" ref={bedroomInputRef}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="bathroom">Bathroom</label>
          <select id="bathroom" ref={bathroomInputRef}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <select id="city" ref={cityInputRef}>
            <option value="Burnaby">Burnaby</option>
            <option value="Coquitlam">Coquitlam</option>
            <option value="New Westminster">New Westminster</option>
            <option value="North Vancouver">North Vancouver</option>
            <option value="Port Coquitlam">Port Coquitlam</option>
            <option value="Port Moody">Port Moody</option>
            <option value="Richmond">Richmond</option>
            <option value="Vancouver">Vancouver</option>
            <option value="West Vancouver">West Vancouver</option>
          </select>
        </div>
        <Button>Query</Button>
      </div>
    </form>
  );
}

export default PropertySearch;
