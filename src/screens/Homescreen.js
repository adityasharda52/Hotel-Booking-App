import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import 'antd/dist/reset.css';
import {DatePicker,Space} from 'antd';
import moment from 'moment';
const {RangePicker} = DatePicker;
const Homescreen = () => {


    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [fromdate,setFromdate] = useState();
    const [todate,setTodate] = useState();
    const [duplicaterooms,setDuplicaterooms] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/rooms/getallrooms');
                const data = response.data;
                setDuplicaterooms(data);
                setRooms(data);
                setLoading(false);
            } catch (error) {
                setError(true);
                console.log(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function filterByDate(dates) {
        //from date
        console.log(dates[0].format("DD-MM-YYYY"));
        setFromdate(dates[0].format("DD-MM-YYYY"));
        //to date
        console.log(dates[1].format("DD-MM-YYYY"));
        setTodate(dates[1].format("DD-MM-YYYY"));
      
        var tempRooms = [];
      
        for (const room of duplicaterooms) {
          var availability = false;
      
          if (room.currentbooking.length > 0) {
            for ( const booking of room.currentbooking) {
              if (
                !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                  booking.fromdate,
                  booking.todate
                ) &&
                !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                  booking.fromdate,
                  booking.todate
                )
              ) {
                
                if (
                  dates[0].format("DD-MM-YYYY") !== booking.fromdate &&
                  dates[0].format("DD-MM-YYYY") !== booking.todate &&
                  dates[1].format("DD-MM-YYYY") !== booking.fromdate &&
                  dates[1].format("DD-MM-YYYY") !== booking.todate
                ) {
                  availability = true;
                }
              }
            }
          } else {
            availability = true;
          }
      
          if (availability === true) {
            tempRooms.push(room);
          }
        }
      
        setRooms(tempRooms);
      }

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
                </div>
            </div>
            <div className='row justify-content-center mt-5'>
                {
                    loading ? (<h1><Loader/></h1>) : error ? (<Error/>) : (rooms.map((room) => {

                        return <div className='col-md-9 mt-2'>
                            <Room room={room} fromdate={fromdate} todate={todate}></Room>
                        </div>
                        // return <h1>{room.name}</h1>
                    }))
                }
            </div>
        </div>
    )
}

export default Homescreen;