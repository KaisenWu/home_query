import Head from "next/head";
import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorAlert from "../../../components/ui/error-alert";
import Button from "../../../components/ui/button";
import PropertyList from "../../../components/properties/property-list";

function FilteredPropertiesPage() {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const filter = router.query.slug;

  const filterData = {
    year: filter[0],
    month: filter[1],
    city: filter[2],
  }
  

  useEffect(() => {
    fetch("/api/property/filtered-properties", {
        method: 'POST',
        body: JSON.stringify(filterData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFilteredProperties(data);
        setIsLoading(false);
      });
  },[filter])

  let pageHeadData = (
    <Head>
      <title>Filtered Properties</title>
      <meta name="description" content={`A list of filtered properties.`} />
    </Head>
  );

  if (isLoading) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

//   if (!filteredProperties) {
//     return (
//       <Fragment>
//         {pageHeadData}
//         <ErrorAlert>
//           <p>No events found for the chosen filter!</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/propertiess">Show Random Properties</Button>
//         </div>
//       </Fragment>
//     );
//   }



  return (
    <Fragment>
      <PropertyList properties={filteredProperties} />
    </Fragment>
  );


    
}




export default FilteredPropertiesPage;
