import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";//Creates a new user account associated with the specified email address and password
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/cc-images/coins-1.jpg";

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

            navigate("/login")
        }
        catch(err){
            setError("Signup failed");
            //Display error
            alert(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <form onSubmit={handleSignup} className="bg-white/60 py-6 px-8 rounded-lg shadow-lg w-full max-w-md flex flex-col">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">Sign Up</h1>

                {error &&<p className="text-red-500">{error}</p>}

                <div className="mb-4">
                    <label className="block text-black font-semibold text-lg">Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded dark"
                    required
                     />
                </div>

                <div className="mb-4">
                    <label className="block text-black font-semibold text-lg">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                     />
                </div>

                <div className="mb-4">
                    <label className="block text-black font-semibold text-lg">Confirm Password</label>
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
                 className="bg-blue-500 text-white py-2 hover:bg-blue-600 rounded-full font-bold text-xl"
                 >
                    Sign Up
                </button>
                <p className="mt-4 text-center font-semibold">
                  Have an account? <a href="/login" className="text-blue-500 hover:underline font-semibold">Log in</a>
                </p>
            </form>
        </div>
    )
}
export default SignupForm;
