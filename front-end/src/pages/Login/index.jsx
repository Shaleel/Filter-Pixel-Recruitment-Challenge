import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import "./login.css";
import googleLogo from "../../assets/google.png";
import { GoogleLogin } from "react-google-login";
import { useAuth } from "../../AuthContext";
import { gapi } from "gapi-script";
const Login = () => {
  const { user, setuser } = useAuth();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const Signup = async () => {
    const response = await fetch(`http://localhost:8000/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => response.json());

    if (response.error) {
      alert(response.error.message);
      return;
    }

    setuser(response.user);
    localStorage.setItem("token", response.accessToken);
  };

  const responseGoogle = async (googleResponse) => {
    if (!googleResponse.profileObj) {
      // seterrorMsg('Unable to Login with Google right now')
      return;
    }
    console.log(googleResponse);
    const { email, name, imageUrl } = googleResponse.profileObj;
    const userData = {
      email: email,
      name: name,
      photo: imageUrl,
    };

    const response = await fetch(`http://localhost:8000/google-auth`, {
      // mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username: name }),
    }).then((response) => response.json());

    if (response.error) {
      console.log(response.error);
      return;
    }

    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("img-url", userData.photo);
    setuser(response.user);
  };

  return (
    <div>
      <Nav />
      <div className="main">
        <GoogleLogin
          clientId="91843930254-5p7bhvgfn878q9ii8marvri9if173e42.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button {...renderProps} className="danger">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    height: "2rem",
                    marginRight: "1rem",
                  }}
                  src={googleLogo}
                ></img>
                Login with Google
              </div>
            </button>
          )}
        />

        <h2>---------- OR ----------</h2>

        <input
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
          }}
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
        />
        <button className="cta" onClick={Signup}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
