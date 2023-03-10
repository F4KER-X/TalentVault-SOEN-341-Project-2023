import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JobForm from "../components/Job/JobForm";
import Loader from "../components/Loader";
import UseRedirectLoggedOutUser from "../hook/useRedirectLoggedOutUser";
import UseRedirectNotAuthorizedRole from "../hook/useRedirectNotAuthorizedRole";
import {
  selectCompany,
  selectID,
  selectRole,
} from "../redux/features/auth/authSlice";
import { addJob, selectIsLoading } from "../redux/features/job/jobSlice";

const initialState = {
  recruiterId: "",
  jobTitle: "",
  companyName: "",
  maxSalary: "",
  minSalary: "",
  jobType: "",
  jobRequirements: "",
  city: "",
  province: "",
};

const CreateJob = () => {
  UseRedirectLoggedOutUser("/login");
  UseRedirectNotAuthorizedRole("/test", "recruiter");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useSelector(selectID);
  const company = useSelector(selectCompany);

  const [job, setJob] = useState(initialState);
  const [jobDescription, setJobDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const {
    jobTitle,
    maxSalary,
    minSalary,
    jobType,
    jobRequirements,
    city,
    province,
  } = job;

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setJob({
      ...job,
      [name]: value,
    });
  };

  const saveJob = async (ev) => {
    ev.preventDefault();
    const formData = {
      recruiterId: id,
      jobTitle,
      companyName: company,
      maxSalary,
      minSalary,
      jobDescription,
      jobType,
      jobRequirements,
      jobLocation: {
        city,
        province,
      },
    };

    if (
      !formData.jobTitle ||
      !formData.recruiterId ||
      !formData.companyName ||
      !formData.maxSalary ||
      !formData.minSalary ||
      !formData.jobDescription ||
      !formData.jobLocation.city ||
      !formData.jobLocation.province
    ) {
      return toast.error("All fields are required");
    }
    if (formData.maxSalary < 0 || formData.minSalary < 0) {
      return toast.error("Negative salaries are not allowed");
    }
    if (formData.maxSalary <= formData.minSalary) {
      return toast.error("Max salary can not be less than Min salary");
    }

    await dispatch(addJob(formData));

    navigate("/test");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h3>Add new Job</h3>
      <JobForm
        job={job}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        handleInputChange={handleInputChange}
        saveJob={saveJob}
      />
    </div>
  );
};
export default CreateJob;
