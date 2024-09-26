import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AddRoomForm = ({ onRoomAdded }) => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    name: '',
    price: '',
    status: '',
    introduce: '',
    hotelId: '',
    image: null,
  });
  const [hotels, setHotels] = useState([]);
  const [hotelId, setHotelId] = useState('');

  useEffect(() => {
    // Fetch all hotels from the API
    axios.get('http://localhost:8080/api/hotels')
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the hotels!", error);
      });
  }, []);

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setRoom({ ...room, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", room.name);
    formData.append("price", room.price);
    formData.append("status", room.status);
    formData.append("introduce", room.introduce);
    formData.append("hotel", hotels.id);
    if (room.image) {
      formData.append("image", room.image);
    }

    try {
        const response = await axios.post("http://localhost:8080/api/rooms/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      onRoomAdded(response.data); // Callback để cập nhật danh sách sản phẩm
      
    } catch (error) {
      console.error("Error adding room:", error);
    }
    navigate('/admin/rooms_list');     
  };

  return (
    <div className="container mt-5">
      <h2>Add Rooms</h2>
      <Link to={'/admin/rooms_list'}>All Rooms</Link>

      <Form onSubmit={handleSubmit}>
        
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Room Name :*</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Room Name"
            value={room.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Room Price:*</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Room Price"
            value={room.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus" className="mb-3">
          <Form.Label>Status:*</Form.Label>
          <Form.Control as="select" name="status" value={room.status} onChange={handleChange}>
            <option value="vailable">Available</option>
            <option value="booked">Booked</option>
          </Form.Control>
        </Form.Group>
    
        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Introduce:*</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="introduce"
            placeholder="Introduce"
            value={room.introduce}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus" className="mb-3">
          <Form.Label>Select Hotel:*</Form.Label>
          <Form.Control as="select" value={hotelId} onChange={(e) => setHotelId(e.target.value)} required>
              <option value="">Select a hotel * </option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image :*</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddRoomForm;