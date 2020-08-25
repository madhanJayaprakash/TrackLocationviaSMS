import React, { useState, useEffect} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const errorClass={
    color:'red'
  }
  const validClass={
    color: '#26c35d',
    padding:'15px',
    fontWeight: 'bold'
  }

const initialValues={
  name: '',
  phone:'',
  location:'',
  vehiclename:'',
  smsdescription:''
}
const onSubmit = (values) => {
  console.log(JSON.stringify(values));
    axios.post('http://localhost:5000/users/add', values)
    .then(res =>{
      console.log(res.data)
    });
}
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
//const phoneRegExp = /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/;

const validationSchema = yup.object({
  name: yup.string().required('This field is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('This field is required'),
  location:yup.string().required('This field is required'),
  vehiclename:yup.string().required('This field is required'),
  smsdescription:yup.string().required('This field is required'),
});
function App(props) {
  const [intialLat,setIntialLat] =useState('28.7041');
  const [intialLong,setIntialLong] =useState('77.1025');
  
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });
  
  useEffect(()=>{
    console.log('render>>>>');
    socket.on('MyMessage',(data)=>{
      console.log('map cord',data);
      const {latitude,longitude} = data;
      setIntialLat(latitude);
      setIntialLong(longitude)
      
    })
  },[intialLat,intialLong]);
  const coords = { lat: intialLat, lng:intialLong };
  return (
    <div className="container">
      <div className="  row justify-content-center">
      <h1 className="text-center">Request Assistance</h1>
      </div>
      <div  className="row justify-content-center">
      {
        formik.isSubmitting && (
          <p style={validClass}>User Added Sucessfully !!!</p>
        )
      }
      </div>
      <div  className="row justify-content-center">
      <form onSubmit={formik.handleSubmit} className="col-md-4">
      <div className="form-group">
        <label for="exampleFormControlSelect1">Name</label>
            <input type="text" className="form-control" name="name" placeholder="Enter your name."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
             {formik.touched.name && formik.errors.name ? <div style={errorClass}>{formik.errors.name}</div>:''}
      </div>
      <div className="form-group">
        <label for="exampleFormControlInput1">Phone</label>
        <input type="text" className="form-control" name="phone"  placeholder="Enter your Phone no."
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.phone}
        />
         {formik.touched.phone && formik.errors.phone ? <div style={errorClass}>{formik.errors.phone}</div>:''}
      </div>
      
      <div className="form-group">
        <label for="exampleFormControlSelect2">Location</label>
        <input type="text" className="form-control"  name="location" placeholder="Enter your location."
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.location}
        />
         {formik.touched.location && formik.errors.location ? <div style={errorClass}>{formik.errors.location}</div>:''}
      </div>
      <div className="form-group">
      <label for="exampleFormControlSelect2">Vehicle</label>
        <input type="text" className="form-control" name="vehiclename" placeholder="Enter your Vehicle."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.vehiclename}
        />
         {formik.touched.vehiclename && formik.errors.vehiclename ? <div style={errorClass}>{formik.errors.vehiclename}</div>:''}
      </div>
      <div className="form-group">
        <label for="exampleFormControlTextarea1">Description of Needed assistance</label>
        <input type="text" className="form-control" name="smsdescription" placeholder="Enter your assistance."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.smsdescription}
        />
         {formik.touched.smsdescription && formik.errors.smsdescription ? <div style={errorClass}>{formik.errors.smsdescription}</div>:''}
      </div>
      <div className="form-group">
        <button type="submit"name="submit" className="form-control btn btn-primary" >
          Submit
        </button>
      </div>
      </form>
      </div>
     
        {
          intialLat && (
          <div class="row justify-content-center">
          <Map
          key={new Date().getTime()}
          google={props.google}
          initialCenter={coords}
          zoom={14}
          style={{ justifyContent: 'center', height: '100%', position: 'static' }}>
          <Marker name={'Current location'} />

          <InfoWindow>

          </InfoWindow>
        </Map>
        </div>
        )
          
        }
        
     
    </div>
  );
}

//export default App;
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDb9cYxD1iU2AC2D1ZEMRpnfCfN9weSLpQ')
})(App)