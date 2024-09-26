import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            //Login authentication with firebase
            await signInWithEmailAndPassword(auth, email, password);
            alert("user logged in successfully");
        }
        catch (err){
            setError("Invalid login credentials");
            alert("err");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin}className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-4">
             <label className="block text-gray-700">Email</label>
             <input 
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full p-2 border border-gray-300 rounded"
             required
             />
            </div>

             <div className="mb-4">
             <label className="block text-gray-700">Password</label>
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
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
             >
             Login
            </button>
        </form>
        </div>
    )
}
export default LoginForm;
