import Navbar from "../components/Navbar";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getJobs } from "../redux/features/job/jobSlice";
import Jobs from "../components/Jobs";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { useState } from "react";

function Dashboard() {
  UseRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { jobs, isLoading, isError, message } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getJobs());
    }
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, isLoggedIn, message]);



  //for pagination
  // To hold the actual data
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

     // User is currently on this page
     const [currentPage, setCurrentPage] = useState(1);

    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(5);

    //indices of first and last record on the current page
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    // Records to be displayed on the current page
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

   //number of pages we will have
    const nPages = Math.ceil(data.length / recordsPerPage)

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <Navbar />

        <div className="top-container">
          <h2>Explore Our Jobs!</h2>
        </div>
      </div>

      <div className="container">
        <div>
          {jobs.map((job) => (
            <Jobs key={job._id} job={job} />
          ))}
        </div>
      </div>
      
    </>
  );
}

export default Dashboard;
