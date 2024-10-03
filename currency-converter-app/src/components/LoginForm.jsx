import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/cc-images/coins-1.jpg";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); //hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            //Login authentication with firebase
            await signInWithEmailAndPassword(auth, email, password);
            alert("user logged in successfully");

            //redirect the user after successful login
            navigate("/homepage")
        }
        catch (err){
            setError("Invalid login credentials");
            alert("err.message");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundImage})`}}>
        <form onSubmit={handleLogin} className="bg-white/60 p-12 px-4 rounded-lg shadow-lg w-full max-w-sm flex flex-col">
            <h1 className="text-5xl font-bold mb-6 text-center">Login</h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-4">
             <label className="block text-black font-semibold text-2xl">Email</label>
             <input 
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded"
             required
             />
            </div>

            <div className="mb-4">
             <label className="block text-black font-semibold text-2xl">Password</label>
             <input 
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded"
             required
             />
            </div>

            <button 
             type="submit"
             className="bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 rounded-full text-2xl mb-4"
             >
             Login
            </button>
            
            <p className="mt-4 text-center font-semibold">
              Don't have an account? <a href="/signup" className="text-blue-500 hover:underline font-semibold">Create new account</a>
            </p>
        </form>
        </div>
    )
}
export default LoginForm;
