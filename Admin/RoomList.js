import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => { 
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`http://localhost:8080/api/rooms/delete/${roomId}`);
      setRooms(rooms.filter((room) => room.id !== roomId));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`http://localhost:8080/api/rooms/${id}/status`, {
        status: newStatus,
    });
    fetchRooms(); // Refresh list
};

  return (
    <div>
      <h1>Rooms List</h1>
      <Link to={'/admin/add_rooms'}>Add New Rooms</Link>
      <table width="100%">
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Image</th>
            <th>Room Price</th>
            <th>Introduce</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>                       
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>

              <td>
                {room.imageUrl && (
                  <img src={`http://localhost:8080/rooms/${room.imageUrl}`} alt={room.name} width="100" />
                )}
              </td>

              <td>{room.price}</td>

              <td>{room.introduce}</td>

              <td>
                  <button onClick={() => handleStatusChange(room.id, room.status === 'available' ? 'booked' : 'available')}>
                  {room.status}
                   </button>
              </td>
              
              <td>
              <button onClick={() => handleDelete(room.id)}>Delete</button>
              <Link to={`${room.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;