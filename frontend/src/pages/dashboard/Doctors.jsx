import { useEffect, useState } from "react";
import axios from "axios";
import { Table, message } from 'antd';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try{
      const res = await axios.get('http://localhost:8000/admin/doctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success) {
        setDoctors(res.data.data)
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post('http://localhost:8000/admin/changeAccountStatus', {doctorsId: record._id, status:status}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.success) {
        message.success(res.data.message);
        location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: 'name',
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Phone",
      dataIndex: "phone"
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={() => handleAccountStatus(record, "approved")}>Approve</button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      )
    },
  ]

  return (
    <div>
      <h1 className="text-center mb-3">Doctors List</h1>
      <Table columns={columns} dataSource={doctors} />
    </div>
  )
}

export default Doctors;