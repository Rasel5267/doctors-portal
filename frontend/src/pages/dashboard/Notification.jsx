import { Tabs, message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


const Notification = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleMarkRead = async () => {
    dispatch(showLoading());
    try{
      const res = await axios.post('http://localhost:8000/user/get-all-notification', {userId: user._id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading());
      if(res.data.success) {
        message.success(res.data.message);
        location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }
  const handleDeleteRead = async () => {
    dispatch(showLoading());
    try{
      const res = await axios.post('http://localhost:8000/user/delete-all-notification', {userId: user._id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading());
      if(res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }

  const items = [
    {
      key: '0',
      label: `UnRead`,
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkRead} style={{cursor: 'pointer', color: '#39c7a5'}}>Mark All Read</h4>
          </div>
          {
            user?.notification.map(notification => (
              <div className="card p-2 mb-3" key={user._id}>
                <span className="card-text notification-text">{notification.message}</span>
              </div>
            ))
          }
        </>
      )
    },
    {
      key: '1',
      label: `Read`,
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleDeleteRead}  style={{cursor: 'pointer', color: '#39c7a5'}}>Delete All Read</h4>
          </div>
          {
            user?.seennotification.map(notification => (
              <div className="card p-2 mb-3" key={user._id}>
                <span className="card-text notification-text">{notification.message}</span>
              </div>
            ))
          }
        </>
      )
    }
  ]
  return (
    <div>
      <h4 className="text-center pt-3">Notifications</h4>
      <Tabs defaultActiveKey="0" items={items} />
    </div>
  )
}

export default Notification;