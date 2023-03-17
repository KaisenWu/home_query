import Image from "next/image";
import classes from "./property-item.module.css";

import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Button from "../ui/button";

function PropertyItem(props) {
  const { city, address, price, listDate, id } = props;
  const exploreLink = `/properties/${id}`;

  return (
    <li className={classes.item} key={id}>
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
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default PropertyItem;
