import PropertyItem from './property-item';
import classes from './property-list.module.css'

function PropertyList(props) {
  const { properties } = props;
  return (
    <ul className={classes.list}>
      {properties.map((property) => (
        <PropertyItem
          key={property['ML #']}
          ml={property['ML #']}
          city={property.City}
          address={property.Address}
          price={property.Price}
          listDate={property['List Date']}
        />
      ))}
    </ul>
  );
}

export default PropertyList