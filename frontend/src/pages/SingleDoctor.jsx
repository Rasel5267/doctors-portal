import { useParams } from "react-router-dom";
import Doctors from "../components/data"

const SingleDoctor = () => {
	const { doctorId } = useParams();
	const doctor = Doctors.find((doctor) => doctor._id === doctorId);
  return (
	<div className="single-doctor">
		<h2 className="text-center py-4">{doctor.name}</h2>
		<div className="d-flex">
			<img className="mx-auto" src={doctor.img} alt={doctor.name} />
		</div>
		<p className="text-center py-2">Email: {doctor.email}</p>
		<p className="text-center">Specialization: {doctor.specialization}</p>
		<p className="text-center py-2">Experience: {doctor.experience}</p>
		<p className="text-center">Fees: {doctor.feesPerConsultation}</p>
		<p className="text-center py-2">Phone: {doctor.phone}</p>
		<p className="text-center">Address: {doctor.address}</p>
		<p className="text-center py-2">Time: {doctor.timing}</p>
		<div className="d-flex justify-content-center mb-4">
			<a target="_blank" rel="noreferrer" href={doctor.website}>Visit Profile</a>
		</div>
	</div>
  )
}

export default SingleDoctor;