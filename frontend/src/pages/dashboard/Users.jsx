import { useEffect, useState } from "react";
import axios from "axios";
import { Table, message } from 'antd';

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try{
      const res = await axios.get('http://localhost:8000/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success) {
        setUsers(res.data.data)
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => (
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      )
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      )
    },
  ]

  return (
    <div>
      <h1 className="text-center mb-3">Users List</h1>
      <Table columns={columns} key={users._id} dataSource={users} scroll={{
      x: 'calc(700px + 50%)',
      y: 240,
    }}/>
    </div>
  )
}

export default Users;