import Link from "next/link";
// Import the session package.
import { useSession, signOut } from "next-auth/client";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  // Extract session and loading statuse from useSession hook.
  const [session, loading] = useSession();

  // Define the signOut function.
  function loguotHandler() {
    // User could log out by simply call signOut() build-in function.
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
          <div className={classes.logo}>Home Query</div>
      </Link>
      <nav>
        <ul>
          {/* Only show the Login button in case of we don't have a session and not loading. */}
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {/* Only in case of we are holding a session, the profile link will appear. */}
          {session && (
            <li>
              <Link href="/properties">Properties</Link>
            </li>
          )}
           {/* Only in case of we are holding a session, the profile link will appear. */}
           {session && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
          {/* Only in case of we are holding a session, the profile link will appear. */}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {/* Show the Logout button only in case we have a session. */}
          {session && (
            <li>
              <button onClick={loguotHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
