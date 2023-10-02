import React,{useState,useRef,useEffect} from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';
import {  useParams } from 'react-router-dom';
import Success from 'components/success/success';
import {API} from 'config'
import login from './login.jpg'

  
  
const Client = ({user}) => {
    const {place_id}=useParams();
    
    const [ libraries ] = useState(['places']);
    const Navigate=useNavigate();

    const [client,setClient]=useState({
        MobNo: 0,
        Name: '', 
        Address: '' ,
        email: '',
        userId: user.uid,
    })


    const handleChange=(e)=>{
        const { name, value } = e.target;
        setClient({...client,[name]: value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        await axios.patch(`${API}/client/${user.uid}`)
        .then(res=>{
                
        })
        .catch(err=>{

        })
        await axios.patch(`${API}/provider/${place_id}`,client)
        .then(res=>{
            console.log(res);
            console.log(client)
            Navigate("/payment");

        })
        .catch(error=>{
            console.log(error);
            alert("Either there is network Error or the for the given gas station there no such Provider Exist")
        })

        
    }


    return ( 
        <>
    <div className="body">
      <div id="box_background1"></div>
      <div
        className="shadow-lg bg-white rounded"
        style={{
          width: "70vw",
          height: "80vh",
          display: "flex",
          position: "fixed",
        }}
      >
        <img src={login} alt="#" style={{ width: "40vw" }} id="img" />
        <div
          className="container mx-4"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
           <h2 className=" font-weight-bolder">Submit Your Detail</h2>
          <form onSubmit={handleSubmit}>
            <br />
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address*
              </label>
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <ion-icon name="person" />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  name= "email"
                  required
                />
                <span className="input-group-text" id="basic-addon1">
                  <ion-icon name="person" />
                </span>
                <input
                  className="form-control"
                  placeholder="Mob No"
                  aria-label="Mob No"
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  name= "MobNo"
                  required
                />
              </div>
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <label
            >
            Name
            </label>
            <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
                  <ion-icon name="person" />
            </span>
            <input
                className="form-control"
                placeholder="Name"
                aria-label="password"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                required
                name = "name"
              />
    
            </div>
            <label className= "mt-4">
                Address
            </label>
            <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon1">
                  <ion-icon name="person" />
            </span>
            <input
                className="form-control"
                placeholder="Address"
                aria-describedby="basic-addon1"
                onChange={handleChange}
                required
                name = "Address"
              />
    
            </div>
            <button
              className="btn btn-primary d-grid gap-2 col-6 my-1"
              type="submit"
            >
                Submit
            </button>
          </form>
          
        </div>
      </div>
      <div id="box_background2"></div>
    </div>
        </>

     );
}
 
export default Client;