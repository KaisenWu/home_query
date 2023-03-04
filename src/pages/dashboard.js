import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

const DynamicDashboard = dynamic(
  () => import("../../components/dashboard/home-dashboard"),
  {
    ssr: false,
  }
);

function DashboardPage() {
  return <DynamicDashboard />;
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

export default DashboardPage;
