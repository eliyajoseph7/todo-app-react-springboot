import { useState } from "react";
import GuestLayout from "./layout/guest";
import { useNavigate } from "react-router-dom";
import api from "../../api/services";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  async function handleRegister(e) {
    e.preventDefault();
    toast.loading('Registering...', { position: "bottom-center" })
    try {
      const data = await api.post( "/auth/register", {
        email,
        password,
        full_name,
        username,
      }, {
        headers: headers,
      });

      var response = data.data;
      toast.dismiss();
      if (response.status === 200) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token_expiry", response.token_expiry);

        toast.success(response.message);
        navigate("/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Error registering");
      console.error("Error registering:", error);
    }
  }

  return (
    <GuestLayout>
      <div className="w-full">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg"
        >
          <div className="text-center text-2xl font-bold text-gray-900">
            Register
          </div>
          <div className="mt-2 space-y-6">
          <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                required
              />
            </div>
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
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <button className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer">
                Register
              </button>
              <div className="text-center uppercase py-2">Or</div>
              <div className="flex justify-between text-sm">
                <div className="text-gray-400 hover:text-gray-700">
                  Already have an account?
                </div>
                <div className="">
                  <a
                    href="/login"
                    className="text-gray-700 hover:text-purple-700"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
