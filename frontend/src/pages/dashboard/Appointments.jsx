import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { Table } from "antd";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const {user} = useSelector(state => state.user)

  const getAppointments = async () => {
    try {
      const res = await axios.post("http://localhost:8000/user/appointments", {userId: user._id},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.name}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {record.date} &nbsp;
          {record.time}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];


  return (
    <div>
      <h1 className="text-center">Appointment Lists</h1>
      <Table columns={columns} dataSource={appointments} scroll={{
      x: 'calc(700px + 50%)',
      y: 240,
    }}/>
    </div>
  )
}

export default Appointments;