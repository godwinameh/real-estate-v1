import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const onChange = (e) => setEmail(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success("Email was sent");
        } catch (error) {
            toast.error("Could not send reset email", error.message);
        }
    };

    return (
        <div className="bg-white shadow sm:rounded-lg w-full max-w-xl mx-auto mt-32">
            <div className="px-4 py-5 sm:p-6 flex flex-col ">
                <h3 className="text-xl md:text-2xl font-light leading-6 text-gray-900">
                    Forgot Your Password?
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                        Don't worry! Just enter your email below and we'll send
                        you instructions to reset your password.
                    </p>
                </div>
                <form
                    onSubmit={onSubmit}
                    className="mt-5 sm:flex sm:items-center"
                >
                    <div className="w-full sm:max-w-xs">
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={onChange}
                            placeholder="you@example.com"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:ml-3 sm:mt-0 sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 text-center whitespace-nowrap"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
