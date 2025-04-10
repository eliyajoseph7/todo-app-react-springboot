import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestLayout from "./layout/guest";
import api from "../../api/services";
import { toast } from "react-toastify";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  async function handleLogin(e) {
    e.preventDefault();
    toast.loading("Logging in...", { position: "bottom-center" });
    try {
      var body = {
        usernameOrEmail: email,
        password: password,
      }
      // console.log(api);
      // console.log(body);
      const data = await api.post("/auth/login", body, {
      }, {
        headers: headers,
      });
      
      var response = data.data;
      toast.dismiss();
      if (response.status === 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token_expiry", response.token_expiry);

        // console.log(response.token);
        
        toast.success(response.message);
        navigate("/dashboard");
      } else if (response.status === 401 || response.status === 403) {        
        toast.error("Login failed, please check your credentials");
      } else {
        toast.error("Login failed");        
      }
    } catch (error) {
      toast.dismiss();
      if (error.response.status === 401 || error.response.status === 403) {        
        toast.error("Login failed, please check your credentials");
      } else {
        toast.error("Login failed");
      }
      console.log("Error logging in:", error);
    }
  }

  return (
    <GuestLayout>
      <div className="w-full">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg"
        >
          <div className="text-center text-2xl font-bold text-gray-900">Login</div>
          <div className="mt-2 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <button
                className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
              >
                Login
              </button>
              <div className="text-center uppercase py-2">Or</div>
              <div className="flex justify-between text-sm">
                <div className="text-gray-400 hover:text-gray-700">Does not have account?</div>
                <div className="">
                  <a href="/register" className="text-gray-700 hover:text-purple-700">Register</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
