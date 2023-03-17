import { Fragment } from "react";
import {
  connectToDatabase,
  getPropertyByMl,
  getAllProperties,
} from "../../../helper/db";
import Button from "../../../components/ui/button";

function PropertyDetailPage(props) {
  // The selected property will be passed to here by the server side function getStaticProps.
  const property = props.selectedProperty;

  if (!property) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <h1>Price: ${property.Price}</h1>
      <p>Address: {property.Address}</p>
      <p>List Date: {property["List Date"]}</p>
      <p>Length of Listing: {property["Length of Listing"]}</p>
      <p>Total Bedrooms: {property["Total Bedrooms"]}</p>
      <p>Total Bathrooms: {property["Total Bathrooms"]}</p>
      <p>Total Area: {property["Total Area"]}</p>
      <p>Age: {property["Age"]}</p>
      <p>
        Frontage: {property.Frontage}
        <p>Total Kitchens: {property["Total Kitchens"]}</p>
        <p>City: {property.City}</p>
        <Button link="/properties">
          <span>Back to check more properties</span>
        </Button>
      </p>
    </Fragment>
  );
}

// Get the property by its id.
export async function getStaticProps(context) {
  // Get the propertyId from the context.
  const propertyMl = context.params.propertyMl;
  // Declare the connection.
  const client = await connectToDatabase();
  // Get the selected property.
  const rawSelectedProperty = await getPropertyByMl(
    client,
    "transactions",
    propertyMl
  );
  const selectedProperty = JSON.parse(JSON.stringify(rawSelectedProperty));
  // Pass the property data to the page function.
  return {
    props: {
      selectedProperty: selectedProperty,
    },
    revalidate: 30,
  };
}

// Get all the pathes by from server.
export async function getStaticPaths() {
  // Declare the connection.
  const client = await connectToDatabase();
  // Get all the properties.
  const properties = await getAllProperties(client, "transactions");
  // Get all the _id as the pathes.
  const paths = properties.map((property) => ({
    params: { propertyMl: property["ML #"] },
  }));
  // Return all the pathes.
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default PropertyDetailPage;
