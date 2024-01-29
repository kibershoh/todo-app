// TABLE.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TABLE = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/posts');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleActionClick = (itemId) => {
    setSelectedItemId(itemId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  const handleEdit = () => {
    // Implement edit logic here
    console.log('Edit item with id:', selectedItemId);
    handleCloseModal();
  };

  const handleDelete = () => {
    // Implement delete logic here
    console.log('Delete item with id:', selectedItemId);
    handleCloseModal();
  };

  const handleDetail = () => {
    // Implement detail logic here
    console.log('Show details for item with id:', selectedItemId);
    handleCloseModal();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.ID}>
              <td>{item.ID}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>
                <div>
                  <button className='font-medium' onClick={() => handleActionClick(item.id)}>Modal</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Item Actions"
      >
        <h2>Item Actions</h2>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleDetail}>Detail</button>
      </Modal>
    </div>
  );
};

export default TABLE;