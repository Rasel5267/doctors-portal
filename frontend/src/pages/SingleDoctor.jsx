import { useParams } from "react-router-dom";

const SingleDoctor = () => {
	const { doctorId } = useParams();
  return (
	<div className="single-doctor">
		<p>{doctorId}</p>
	</div>
  )
}

export default SingleDoctor;