import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
const Bookingscreen = () => {
  let { roomid } = useParams();
  let {fromdate} = useParams();
  let {todate} = useParams();
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  let date1 = moment(fromdate,'DD-MM-YYYY');
  let date2 = moment(todate,'DD-MM-YYYY');

  const [totalamount,setTotalamount] = useState();

  const totaldays = moment.duration(date2.diff(date1)).asDays()+1;


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        const data = response.data;
        setTotalamount(data.restperday * totaldays);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    getData();
  }, [])


  async function bookroom(){
    const bookingDetals ={
      room,
      userid:JSON.parse(localStorage.getItem('currentUser')).data._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
    try {
      const result = await axios.post('/api/booking/bookroom',bookingDetals);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='m-5'>
      {
        loading ? (<h1><Loader/></h1>) : error ? (<Error/>) : (<div>

          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imagesurl[0]} className="bigImg" />
            </div>
            <div className="col-md-6">
              <div  style={{textAlign:'right'}}>
                <h1>Booking Details</h1>
                <hr></hr>
                <b>
                  <p>Name : {JSON.parse(localStorage.getItem('currentUser')).data.name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>MaxCount: {room.maxcount}</p>
                </b>
              </div>
              <div  style={{textAlign:'right'}}>
                <b>
                <h1>Amount</h1>
                <hr></hr>
                <p>Total Days: {totaldays}</p>
                <p>Rent per Day: {room.restperday}</p>
                <p>Total Amount: {totalamount}</p>
                </b>
              </div>
              <div style={{float:'right'}}>
                <button  className='btn btn-primary' onClick={bookroom}>Pay Now</button>
              </div>

            </div>

          </div>


        </div>)
      }
    </div>
  )
}

export default Bookingscreen;