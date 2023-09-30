import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login({token, setToken}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {

                const data = await response.json();

                if (data && data.token) {

                    setLoginSuccess(true);
                    setLoading(false);
                    const { token } = data;
                    setToken(token);
                    localStorage.setItem("userToken", token);

                    setTimeout(() => {
                      navigate("/");
                      location.reload()
                    }, 2000);


                } else {
                    setError("Login failed. Please check your credentials.");
                }
            } else { 
                setError("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occured. Please try again later.");
        }
    };

    return (
      <>
      <div className="confirm">
        <h1>Login</h1>
        <hr />
        {error && <div>{error}</div>}
        
        <div>
          <div>
            <form onSubmit={handleLogin}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            {loginSuccess && <div>Login Successful! Redirecting...</div>}
          </div>
        </div>
      </div>
    </>
    )    
}

