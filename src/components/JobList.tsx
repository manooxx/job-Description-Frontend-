import { useState } from "react";
import { useJobContext } from "../context/JobContext";
import JobCard from "./JobCard";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";

const JobList = () => {
    const { filteredJobs, loading } = useJobContext();
    const totalJobs = filteredJobs.length;
    const jobsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

   
    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

   

    return (
        <div className="py-5">
            <div className="flex pb-10 justify-between items-center">
                <h2 className="flex dark:text-slate-400 items-center gap-2 text-lg md:text-4xl text-slate-800 font-semibold">
                    Recommended Jobs <span className="p-1 md:px-3 border text-xs md:text-lg font-normal rounded-full">{totalJobs}</span>
                </h2>
                <p className="hidden md:block text-xs text-slate-400 font-semibold">
                    Sort by: <span className="text-slate-800 dark:text-slate-400">Last updated</span>
                </p>
            </div>

          
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(!loading)?
                (currentJobs.map((job, index) => (
                    <JobCard key={index} job={job} />
                ))): (<div>Loading Jobs...</div>)}
            </div>

            
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`   ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 hover:rounded-full"}`}
                >
                    <MdOutlineNavigateBefore className="text-2xl"/>
                </button>
                {/* <span className="text-lg font-semibold">
                    Page {currentPage} of {totalPages}
                </span> */}
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`  ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 hover:rounded-full "}`}
                >
                    <MdOutlineNavigateNext className="text-2xl"/>
                </button>
            </div>
        </div>
    );
};

export default JobList;
