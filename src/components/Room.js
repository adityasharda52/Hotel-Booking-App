import React, { useState } from 'react';
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Room({ room, fromdate, todate }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className='row bs'>
                <div className='col-md-4'>
                    <img src={room.imagesurl[0]} className='smallImg'></img>
                </div>
                <div className='col-md-7'>
                    <h1>{room.name}</h1>
                    <p><b>Max Count: </b>{room.maxcount}</p>
                    <p><b>Phone Number: </b>{room.phonenumber}</p>
                    <p><b>Type: </b>{room.type}</p>

                    <div style={{ float: "right" }}>

                        {
                            (fromdate && todate) && (
                                <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                                    <button className='btn btn-primary m-2'>Book Now</button>
                                </Link>
                            )
                        }

                        <button className='btn' onClick={handleShow}>View Details</button>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header>
                        <Modal.Title>{room.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Carousel>
                            {room.imagesurl.map((url) => {
                                return <Carousel.Item>
                                    <img
                                        className="d-block w-100 bigImg"
                                        src={url}
                                    />
                                </Carousel.Item>
                            })}


                        </Carousel>
                    </Modal.Body>
                    <p>{room.description}</p>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Room