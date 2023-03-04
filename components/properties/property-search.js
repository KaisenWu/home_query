import { useRef } from "react";
import classes from "./property-search.module.css";
import Button from "../ui/button";

function PropertySearch(props) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();
  const cityInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    // Access the value property.
    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;
    const selectedCity = cityInputRef.current.value;

    props.onSearch(selectedYear, selectedMonth, selectedCity);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">Janurary</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">Septemper</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
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
