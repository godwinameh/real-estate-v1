import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ReactComponent as ArrowRight } from "../assets/svg/keyboardArrowRightIcon.svg";
// import { ReactComponent as VisibilityIcon } from "../assets/svg/visibilityIcon.svg";

import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;
    const toggleVisibilityIcon = () => {
        setShowPassword(!showPassword);
    };

    const onGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check for user
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            // If user, doesn't exist, create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (error) {
            toast.error("Could not authorize with Google", error.message);
        }
    };
    const onGithubClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check for user
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            // If user doesn't exist, create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }

            navigate("/");
        } catch (error) {
            toast.error("Could not authorize with GitHub: " + error.message);
        }
    };
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (userCredentials.user) {
                navigate("/");
                toast.success(
                    `Sign up Successful, Welcome
                    ${auth.currentUser.displayName}`
                );
            }
        } catch (error) {
            toast.error("Something went wrong", error.message);
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-6 text-center text-2xl md:text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Welcome Back
                </h1>
                <h2 className="mt-6 text-center text-xl md:text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Address input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/* Password input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={toggleVisibilityIcon}
                                >
                                    {showPassword ? (
                                        <MdVisibility />
                                    ) : (
                                        <MdVisibilityOff />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Remember me and forgot password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-3 block text-sm leading-6 text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm leading-6">
                                <Link
                                    to="/forgot-password"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {/* Sign in Button */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm   bg-gradient-to-r from-orange-500 to-yellow-500 hover:bg-gradient-to-r hover:from-orange-300 hover:to-yellow-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div>
                        <div className="relative mt-10">
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 flex items-center"
                            >
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-6 text-gray-900">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button
                                onClick={onGoogleClick}
                                href="#"
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                >
                                    <path
                                        d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                        fill="#EA4335"
                                    />
                                    <path
                                        d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                        fill="#34A853"
                                    />
                                </svg>
                                <span className="text-sm font-semibold leading-6">
                                    Google
                                </span>
                            </button>

                            <button
                                onClick={onGithubClick}
                                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                            >
                                <svg
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                    className="h-5 w-5 fill-[#24292F]"
                                >
                                    <path
                                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                    />
                                </svg>
                                <span className="text-sm font-semibold leading-6">
                                    GitHub
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{" "}
                    <Link
                        to="/sign-up"
                        className="font-semibold leading-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent hover:from-orange-300 hover:to-yellow-800"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
