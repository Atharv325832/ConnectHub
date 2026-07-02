import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
const Dashboard = () => {
    const { user, logout,loading } = useAuth();
    

    const navigate = useNavigate();
    const handleLogout = async()=>{
        await logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen p-5">
            <h1 className="text-3xl">
                Dashboard
            </h1>
            <div className="mt-5">

                <h2>
                    Welcome 
                </h2>
                <p> Email: {user?.email} </p>     
            </div>

            <button
                onClick={handleLogout}
                className="mt-5 bg-red-500 text-white p-2"
            > Logout </button>
        </div>
    );
};

export default Dashboard;