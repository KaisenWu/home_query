import Image from "next/image";
import classes from "./property-item.module.css";

import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";

function PropertyItem(props) {
  const { city, address, price, listDate } = props;
  return (
    <li className={classes.item}>
      <Image src="/house_sample.jpg" alt={address} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2><span><i>Selling Price: $ </i></span>{price}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>Listing Date: {listDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{address}</address>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{city}</address>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PropertyItem;
