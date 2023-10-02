import React from "react";
import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "config";
import Navbar from "components/Navbar/Navbar";

const Profile = ({ user }) => {
  const [view, setView] = useState(false);
  const [userData, setUserData] = useState();
  const [flag, setFlag] = useState(false);

  const getClient = async () => {
    await axios
      .get(`${API}/client/${user.uid}`)
      .then((res) => {
        setClient({
          ...client,
          MobNo: res.data[0].MobNo,
          Address: res.data[0].Address,
          count: res.data[0].order.length,
        });
        setView(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getClient();
  }, [view]);
  const [client, setClient] = useState({
    MobNo: 0,
    Name: user.displayName,
    Address: "",
    email: user.email,
    userId: user.uid,
    count: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API}/client/`, client)
      .then((res) => {
        console.log(res);

        setFlag(true);
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Either there is network Error or the for the given gas station there no such Provider Exist"
        );
      });
  };
  useEffect(() => {
    getClient();
  }, [flag]);

  return (
    <>
      <Navbar user={user}/>
      {view && (
        <div class="container" style={{ marginTop: "1rem" }}>
          <div class="row">
            <div class="col-4">
              <div className="card text-center mt-3">
              <div className='d-flex justify-content-center'>
                 <div className="" style={{width: "20rem" }}>
                     <div class="">
                         <img class="profile-img" src={user.photoURL} alt='img2'/>
                     </div>
                    <div className="cardbody">
                        <h5 className="cardtitle">Name: {client.Name}</h5>
                        <p className="cardtext">Email: {client.email}</p>
                        <p className="cardtext">{client.Address}</p>
                        <p className="cardtext">MobNo: {client.MobNo}</p>
                        <p className="cardtext">your order in this month is:  {client.count} </p>
    
                    </div>
                 </div>
                 </div>
                <hr />

                <div className="card-body">
                  <h5 className="">PURCHASING DETAILS</h5>
                </div>
                <div className="card-footer text-muted">
                  last updated - 2 days ago
                </div>
              </div>
            </div>
            <div class="col-8">
              <div className="card mt-3">
                <img
                  src="https://img.freepik.com/free-vector/electric-car-concept-illustration_114360-927.jpg?w=900"
                  className="card-img-top"
                  alt="..."
                  style={{ height: "25rem", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">PURCHASING HISTORY</h5>
                  <p className="card-text">Here all your purchasing Items.</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">An item</li>
                  <li className="list-group-item">A second item</li>
                  <li className="list-group-item">A third item</li>
                </ul>
                <div className="card-footer text-muted">
                  last updated - 2 days ago
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!view && (
        <>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "vh100" }}
          >
            <form className=" w-50 bg-light p-4 formclass rounded">
              <h1 className="text-dark mb-4">Enter your additional Details</h1>

              <div className="form-group">
                <label>Contact no</label>
                <input
                  type="text"
                  className="form-control"
                  name="MobNo"
                  onChange={handleChange}
                  placeholder="Enter Mob No"
                />
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  onChange={handleChange}
                  placeholder="Enter the Address"
                />
                <label>Comment If any</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="comment"
                  onChange={handleChange}
                  placeholder="Comment"
                />
              </div>
              <div
                className="d-flex justify-content-center"
                style={{ postion: "relative" }}
              ></div>
              <button onClick={handleSubmit} className="btn btn-primary my-4">
                Submit Detail
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
