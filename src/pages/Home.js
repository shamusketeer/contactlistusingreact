import React, { useEffect, useState } from 'react';
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.scss';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function Home() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState(false);
    const [newData, setNewData] = useState({ id: 0, name: '', email: '', phone: '' });

    // Fetch user from the API
    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Add a Contact
    const addContact = async () => {
        try {
            if (!newData.email || !newData.email || !newData.phone) {
                return toast.warning('Please fill the form!');
            }
            const res = await axios.post(API_URL, newData);
            setData([...data, res.data]);
            setNewData({ id: 0, name: '', email: '', phone: '' });
            toast.success('Contact added successfully!');
        } catch (err) {
            console.error('Error adding contact:', err);
            toast.error('Failed to add contact.');
        }
    };

    // Update a Contact
    const updateContact = async (item) => {
        try {
            if (!newData.email || !newData.email || !newData.phone) {
                return toast.warning('Please fill the form!');
            }
            const res = await axios.put(`${API_URL}/${item.id}`, newData);
            const updatedData = data.map((dataItem) => (dataItem.id === item.id ? res.data : dataItem));
            setData(updatedData);
            toast.success('Contact updated successfully!');
        } catch (err) {
            console.error('Error updating contact:', err);
            toast.error('Failed to update contact.');
        }
    };

    // Delete a Contact
    const deleteContact = async (item) => {
        try {
            await axios.delete(`${API_URL}/${item.id}`);
            const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
            setData(updatedData);
            toast.success('Contact deleted successfully!');
        } catch (err) {
            console.error('Error deleting contact:', err);
            toast.error('Failed to delete contact.');
        }
    };

    const handleForm = () => {
        setForm(!form);
    };

    return (
        <div>
            <div className="form__Container">
                <form action="#" style={{ display: form ? 'flex' : 'none' }}>
                    <h2>Add & Update Contact</h2>
                    <input
                        type="text"
                        placeholder="name"
                        value={newData.name}
                        required
                        onChange={(e) => setNewData({ ...newData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        value={newData.email}
                        required
                        onChange={(e) => setNewData({ ...newData, email: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="number"
                        value={newData.phone}
                        required
                        onChange={(e) => setNewData({ ...newData, phone: e.target.value })}
                    />
                    <button className="btn" onClick={addContact}>
                        Add Contact
                    </button>
                </form>
                <button className="btn button" onClick={handleForm}>
                    {form ? 'Hide-Form' : 'Show-Form'}
                </button>
            </div>

            <div className="data__container">
                <div className="header">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <div>
                                            <button className="icon edit__icon" onClick={() => updateContact(item)}>
                                                <AiFillEdit />
                                            </button>
                                            <button className="icon delete__icon" onClick={() => deleteContact(item)}>
                                                <AiTwotoneDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
