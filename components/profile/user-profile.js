import { useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Define the login error message useState.
  const [changePasswordMsg, setChangePasswordMsg] = useState("");
  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if(data.message === 'Password updated!') {
      setChangePasswordMsg('Password updated successfully. Please logout and use the new password to login.')
    } else {
      setChangePasswordMsg('Password updated faild, please try again.')
    }
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <p>{changePasswordMsg}</p>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
