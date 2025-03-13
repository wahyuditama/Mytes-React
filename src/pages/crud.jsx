import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {usersData} from '../data'

const CRUD = ()=> {
  const [users, setUsers] = useState(usersData);
  const [formData, setFormData] = useState({id:null, name:"", email:"", role:""});

  const handleChange = (e)=> {
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  const handleSubmit = (e)=> {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.role) return;

    if(formData.id){
      setUsers(users.map((data)=> (data.id === formData.id ? formData : data)));
    }else{
      setUsers([...users,{...formData, id:users.length + 1}]);
    }
    setFormData({id:null, name:"", email:"", role:""});
  }

  const handleEdit = (param)=> {
    setFormData(param);
  };

  const handleDelete = (id)=> {
    setUsers(users.filter((user)=> user.id !== id));
  };
  return (
    <div style={{padding: "20px"}}>
      <h2>Halaman CRUD</h2>
      {/* form-data-pengguna */}
      <form action="" onSubmit={handleSubmit} method="post" style={{marginBottom:"20px"}}>
      <div className="mb-3">
        <input type="text" className="form-control" name="name" id="" placeholder='nama' value={formData.name} onChange={handleChange} />
        </div>
  
        <div className="mb-3">
        <input type="text" className="form-control" name="email" id="" placeholder='email' value={formData.email} onChange={handleChange} />
        </div>
  
        <div className="mb-3">
        <input type="text" className="form-control" name="role" id="" placeholder='Role' value={formData.role} onChange={handleChange} />
        </div>
        <button type='submit' className="btn btn-sm btn-primary">{formData.id ? 'Edit' : 'Tambah'} Data</button>
      </form>
      <table border="1" className="table-bordered table-responsive" cellPadding="10" style={{borderCollapse: "collapse"}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Email</th>
          <th>Role</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) =>
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <button onClick={() => handleEdit(user)} className="btn btn-sm btn-warning">Edit</button>
            <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">Delete</button>
          </td>
  
        </tr>
        )}
      </tbody>
    </table>
    </div>
  );
}

export default CRUD;