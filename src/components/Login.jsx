import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("abdul@gmail.com");
  const [password, setPassword] = useState("pass786@WORD");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          // email -> DB, emailId -> Login-emailId
          email: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-200 text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title text-white justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text p-1 text-white">Email Id</span>
              </div>
              <input
                type="text"
                value={emailId}
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text p-1 text-white">Password</span>
              </div>
              <input
                type="text"
                value={password}
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn bg-blue-500 p-2" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
