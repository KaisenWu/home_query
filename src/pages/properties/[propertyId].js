import { Fragment } from "react";
import Head from "next/head";

import { connectToDatabase, getPropertyById, getAllProperties } from "../../../helper/db";


function PropertyDetailPage(props) {
  // The selected property will be passed to here by the server side function getStaticProps.
  const property = props.selectedProperty;

  console.log(property);

  //   if (!event) {
  //     return (
  //       <div className="center">
  //         <p>Loading...</p>
  //       </div>
  //     );
  //   }

  return (
    <h1>Hello</h1>
    // <Fragment>
    //   <Head>
    //     <title>{event.title}</title>
    //     <meta
    //       name='description'
    //       content={event.description}
    //     />
    //   </Head>
    //   <EventSummary title={event.title} />
    //   <EventLogistics
    //     date={event.date}
    //     address={event.location}
    //     image={event.image}
    //     imageAlt={event.title}
    //   />
    //   <EventContent>
    //     <p>{event.description}</p>
    //   </EventContent>
    //   <Comments eventId={event.id} />
    // </Fragment>
  );
}

// Get the property by its id.
export async function getStaticProps(context) {
  var ObjectID = require('mongodb').ObjectID; 
  // Get the propertyId from the context.
  const propertyId = context.params.propertyId;
  const objId = new ObjectId(propertyId);
  // Declare the connection.
  const client = await connectToDatabase();
  // Get the selected property.
  const selectedProperty = await getPropertyById(client, 'transactions', objId);
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
    params: { propertyId: property._id.toString()},
  }));
  // Return all the pathes.
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default PropertyDetailPage;
