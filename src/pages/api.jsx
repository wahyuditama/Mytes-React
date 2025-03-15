import { useState, useEffect } from "react";
import axios from "axios";

const Api = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", telepon:"" });
    const [updatedUser, setUpdatedUser] = useState({ name: "", email: "", telepon:"" });
    const [isEdit, setEdit] = useState(false);
    const startEditing = (user) => {
        setUpdatedUser(user);
        setEdit(true);
    };
    
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    
    useEffect(() => {
        axios.get(`${API_URL}/users`)
            .then((response) => setUsers(response.data))
    }, []);
    
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };
    
    const handleAddUser = () => {
        axios.post(`${API_URL}/users`, newUser)
            .then((res) => {
                setUsers([...users, res.data]);
                setNewUser({ name: "", email: "", telepon:"" });
            })
    };
    
    const handleEditChange = (e)=> {
        setUpdatedUser({...updatedUser, [e.target.name]: e.target.value});
    };

    const handleEditUser = () => {
        axios.put(`${API_URL}/users/${updatedUser.id}`, updatedUser)
            .then((res) => {
                setUsers(users.map((user) => (user.id === updatedUser.id ? res.data : user)));
                setUpdatedUser({ id: null, name: "", email: "", telepon:"" });
                setEdit(false);
            });
    };    
    
    const handleDeleteUser = (id) => {
        axios.delete(`${API_URL}/users/${id}`)
        .then(() => setUsers(users.filter((user) => user.id !== id)))
    };
    

    return (
        <div>
            <h2>Daftar Pengguna</h2>
                <div className="mb-3">
                        <input type="text" name="name" className="form-control" placeholder="Masukan Nama" value={isEdit ? updatedUser.name : newUser.name} onChange={isEdit ? handleEditChange  : handleChange} />
                </div>

                <div className="mb-3">
                    <input type="email" name="email" placeholder="Maasukan Email" className="form-control" value={isEdit? updatedUser.email : newUser.email} onChange={isEdit ? handleEditChange : handleChange} />
                </div>

                <div className="mb-3">
                    <input type="number" name="telepon" placeholder="Maasukan nomor telepon" className="form-control" value={isEdit? updatedUser.telepon : newUser.telepon} onChange={isEdit ? handleEditChange : handleChange} />
                </div>
                
           {isEdit ? (
            <div className="mb-3">
                <button className="btn btn-sm btn-success" onClick={handleEditUser}>Simpan</button>
            </div>
           ) : (
            <button className="btn btn-sm btn-primary" onClick={handleAddUser}>Tambah User</button>
           )}
                <table className="table-responsive table-bordered" cellPadding={10}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>No. Telepon</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
               <tbody>
               {users.map((user, index) => (
                   <tr key={user.id}>
                        {/* <td>{index+1}</td> */}
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.telepon}</td>
                       <td>
                       <button className="btn btn-sm btn-primary" onClick={() => startEditing(user)}>Edit</button>
                       <button className="btn btn-sm btn-danger mx-3" onClick={() => handleDeleteUser(user.id)}>Hapus</button>
                       </td>
                    </tr>
                ))}
               </tbody>
                </table>
        </div>
    );
};

export default Api;
