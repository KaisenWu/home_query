import Head from "next/head";
import { getSession } from "next-auth/client";
import { useContext } from "react";
import NewsletterRegistration from "../../components/input/newsletter-registration";
import Notification from "../../components/ui/notification";
import NotificationContext from "../../store/notification-context";

function HomePage(props) {
  // useContext passed the notification context value to this component.
  const notificationCtx = useContext(NotificationContext);
  //   Store the notification data.
  const activeNotification = notificationCtx.notification;

  return (
    <div>
      <Head>
        <title>Home Query</title>
        <meta
          name="description"
          content="Find house transaction record you may interested."
        />
      </Head>
      <NewsletterRegistration />
      {/* The active notification is the status of notification. If the status is not null, the notification component will be shown. */}
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={notificationCtx.status}
        />
      )}
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


export default HomePage;
