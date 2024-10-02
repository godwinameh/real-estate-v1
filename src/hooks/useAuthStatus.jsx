import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

export default function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkStatus, setCheckStatus] = useState(true);
    useEffect(
        function () {
            onAuthStateChanged(auth, function (user) {
                if (user) {
                    setLoggedIn(true);
                    setCheckStatus(false);
                }
            });
        },
        [loggedIn, checkStatus]
    );
    return { loggedIn, checkStatus };
}
