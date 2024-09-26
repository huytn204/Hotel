import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function UpdateRoomForm() {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [status, setStatus] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      fetchRoomById(id); // Gọi hàm lấy sản phẩm theo ID khi component được tải
    }
  }, [id]);
  

  const fetchRoomById = async (roomId) => {
    const result = await axios.get(`http://localhost:8080/api/rooms/${roomId}`);
    const room = result.data;
    setName(room.name);
    setPrice(room.price);
    setStatus(room.status);
    setIntroduce(room.introduce);
    setImageUrl(room.imageUrl); // Hiển thị ảnh hiện tại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('status', status);
    formData.append('introduce', introduce);
    if (image) formData.append('file', image);

    if (id) {
      await axios.put(`http://localhost:8080/api/rooms/update/${id}`, formData);
      navigate('/admin/rooms_list'); // Điều hướng sau khi cập nhật
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Rooms</h2>
      <Link to={'/admin/rooms_list'}>All Rooms</Link>

      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Room Type:*</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Room Price:*</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="status" className="mb-3">
          <Form.Label>Status :*</Form.Label>
          <Form.Control as="select" name="status" onChange={(e) => setStatus(e.target.value)}>
            <option value={status}>{status}</option>
            <option value="available">Available</option>
            <option value="Booked">Booked</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Introduce:*</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="introduce"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image :*</Form.Label>
          {imageUrl && <img src={`http://localhost:8080/rooms/${imageUrl}`} alt="Current Hotels" width="100" />}
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

export default UpdateRoomForm;