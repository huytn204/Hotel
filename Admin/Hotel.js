import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AddHotelForm = ({ onHotelAdded }) => {
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    image: null,
  });

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setHotel({ ...hotel, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", hotel.name);
    formData.append("address", hotel.address);
    if (hotel.image) {
      formData.append("image", hotel.image);
    }

    try {
        const response = await axios.post("http://localhost:8080/api/hotels/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      onHotelAdded(response.data); // Callback để cập nhật danh sách sản phẩm
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
    navigate('/admin/hotel_list'); 
  };


  return (
    <div className="container mt-5">
      <h2>Add Hotels</h2>
      <Link to={'/admin/hotel_list'}>All Hotels</Link>

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Hotel Name:*</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Hotel Name"
            value={hotel.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address :*</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Address"
            value={hotel.address}
            onChange={handleChange}
            required
          />
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

export default AddHotelForm;