import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { Table, message } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const {user} = useSelector(state => state.user)

  const getAppointments = async () => {
    try {
      const res = await axios.post("http://localhost:8000/doctor/doctor-appointments", {userId: user._id},{
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

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

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
          {record.userInfo.name}
        </span>
      ),
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
	{
		title: "Actions",
		dataIndex: "actions",
		render: (text, record) => (
			<div className="d-flex">
			{record.status === "pending" && (
				<div className="d-flex">
				<button
					className="btn btn-success"
					onClick={() => handleStatus(record, "approved")}
				>
					Approved
				</button>
				<button
					className="btn btn-danger ms-2"
					onClick={() => handleStatus(record, "reject")}
				>
					Reject
				</button>
				</div>
			)}
			</div>
		),
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

export default DoctorAppointments;