import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";//Creates a new user account associated with the specified email address and password
import { auth } from "../firebaseConfig";

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    //function to handle user signup
    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setError("Password do not match");
            return;
        }

        try {
            //signup authentication with firebase
            await createUserWithEmailAndPassword (auth, email, password);
            alert("User signed up successfully");
        }
        catch(err){
            setError("Signup failed");
            alert.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

                {error &&<p className="text-red-500">{error}</p>}

                <div className="mb-4">
                    <label>Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                     />
                </div>

                <div className="mb-4">
                    <label>Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                     />
                </div>

                <div className="mb-4">
                    <label>Confirm Password</label>
                    <input
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                     />
                </div>

                <button 
                 type="submit"
                 className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                 >
                    Sign Up
                </button>
            </form>
        </div>
    )
}
export default SignupForm;
