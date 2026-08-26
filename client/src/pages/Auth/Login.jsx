import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Auth.css";



export default function Login(){


const navigate = useNavigate();

const { login } = useAuth();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");




const handleLogin=(e)=>{


e.preventDefault();



login({

    email

});



navigate("/dashboard");


};




return (

<div className="auth-container">


<div className="auth-card">


<h2>
Welcome Back ✈️
</h2>


<p>
Login to manage your trips
</p>



<form onSubmit={handleLogin}>


<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button>

Login

</button>


</form>



<span
onClick={()=>navigate("/register")}
className="auth-link"
>

Create Account

</span>



</div>


</div>

);

}