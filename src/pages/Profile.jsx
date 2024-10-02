import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
    const [formData, setFormData] = useState({
        fullname: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
    });
    const { fullname, email } = formData;
    const [changeDetails, setChangeDetails] = useState(false);
    const navigate = useNavigate();

    function onLogout() {
        auth.signOut().then(() => {
            navigate("/sign-in");
        });
    }

    const user = auth.currentUser;

    async function onSubmit() {
        try {
            if (user.displayName !== fullname) {
                // Update the profile with the new full name
                await updateProfile(user, { displayName: fullname });
                toast.success("Profile updated successfully");
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, { fullname });
            } else {
                toast.info("No changes made to the profile");
            }
        } catch (error) {
            toast.error("Failed to update profile: " + error.message);
        }
        setChangeDetails(false);
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button onClick={onLogout}>Logout</button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="personalDetailsText">Personal Details</p>
                    <p
                        className="changePersonalDetails"
                        onClick={() => {
                            if (changeDetails) onSubmit(); // Call onSubmit when "Done" is clicked
                            setChangeDetails((prev) => !prev); // Toggle between change and done
                        }}
                    >
                        {changeDetails ? "Done" : "Change"}
                    </p>
                </div>
                <div className="profileTag">
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            id="fullname"
                            className={
                                !changeDetails
                                    ? "profileName"
                                    : "profileNameActive"
                            }
                            value={fullname}
                            onChange={handleChange}
                            disabled={!changeDetails}
                        />
                        <input
                            type="email"
                            id="email"
                            className={
                                !changeDetails
                                    ? "profileName"
                                    : "profileNameActive"
                            }
                            value={email}
                            onChange={handleChange}
                            disabled={true} // Email is usually not editable
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}
