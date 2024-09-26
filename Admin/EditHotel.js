import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function UpdateHotelForm() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      fetchHotelById(id); // Gọi hàm lấy sản phẩm theo ID khi component được tải
    }
  }, [id]);

  const fetchHotelById = async (hotelId) => {
    const result = await axios.get(`http://localhost:8080/api/hotels/${hotelId}`);
    const hotel = result.data;
    setName(hotel.name);
    setAddress(hotel.address);
    setImageUrl(hotel.imageUrl); // Hiển thị ảnh hiện tại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    if (image) formData.append('file', image);

    if (id) {
      await axios.put(`http://localhost:8080/api/hotels/update/${id}`, formData);
      navigate('/admin/hotel_list'); // Điều hướng sau khi cập nhật
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address :*</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image :*</Form.Label>
          {imageUrl && <img src={`http://localhost:8080/hotels/${imageUrl}`} alt="Current Hotels" width="100" />}
          <Form.Control
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group> 

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UpdateHotelForm;