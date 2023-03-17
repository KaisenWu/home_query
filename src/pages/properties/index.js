import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PropertyList from "../../../components/properties/property-list";
import PropertySearch from "../../../components/properties/property-search";

import { getSession } from "next-auth/client";

function Properties() {
  const router = useRouter();
  const [randomProperties, setRandomProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function searchPropertyHandler(year, month, city) {
    const fullPath = `/properties/${year}/${month}/${city}`;
    router.push(fullPath);
  }

  useEffect(() => {
    fetch("/api/property/random-properties")
      .then((response) => response.json())
      .then((data) => {
        setRandomProperties(data);
        // console.log(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1><center>Query property transactions you are intrested.</center></h1>
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div>
      <h1><center>Query property transactions you are intrested.</center></h1>
      <PropertySearch onSearch={searchPropertyHandler}/> <br/>
      <h1><center>Refresh the page to have more random properties transactions.</center></h1>
      <PropertyList properties={randomProperties} />
    </div>
  );
}


// Define the function to extract session infomation from the server side.
// Extract session from the baclend avoid flashing the profile page in case of unauthenticated.
export async function getServerSideProps(context) {
    // getSession() function can run on either client side and server side.
    const session = await getSession({ req: context.req });
    // Define how to response in case of the session is empty.
    if (!session) {
      return {
        // Define redirect to the authentication page.
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      };
    }
    return {
      // If the session is active, return the session to the profile page.
      props: { session },
    };
  }

export default Properties;
