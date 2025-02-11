import React, {useRef, useState} from "react";
import { Job } from "../context/JobContext";
import { FaLocationDot } from "react-icons/fa6";
import {  FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import JobDialog from "./JobDialog"; 


interface JobCardProps {
    job: Job;
}

const colorsArr = ["#FBBC05", "#FF385C", "#1ED760", "#1B9DF0", "#ffffff"];

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const lastColorRef = useRef<string | null>(null);
    const [open, setOpen] = useState(false);

    const getRandomColor = () => {
        let newColor;
        do {
            newColor = colorsArr[Math.floor(Math.random() * colorsArr.length)];
        } while (newColor === lastColorRef.current); 

        lastColorRef.current = newColor; 
        return newColor;
    };

    const hexToRgba = (hex: string, opacity: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const randomBgColor = getRandomColor();
    const bgColorWithOpacity = hexToRgba(randomBgColor, 0.2);

    const generateStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FaStar key={i} className="text-slate-800 dark:text-slate-400" />);
            } else if (i - 0.5 === rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-slate-800" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-slate-600" />);
            }
        }
        return stars;
    };

    const formatSalary = (salary: number) => {
        const salaryStr = salary.toFixed(0); 
        if (salaryStr[0] >= "5") {
            return `${salaryStr[0]}.${salaryStr[1]}K`;
        } else {
            return `${salaryStr.slice(0, 2)}.${salaryStr[2]}K`;
        }
    };

    return (
        <div className="border p-2 rounded-lg w-[222px] h-[290px] flex flex-col gap-2 shadow-xl justify-between">
            <div key={job.id} className="border h-[270px] flex flex-col gap-2 rounded-md " style={{ backgroundColor: bgColorWithOpacity, }}>


                <div className="flex px-2 pt-2 justify-between items-center" >
                    <div>logo</div>
                    <div className="p-1 w-7 h-7 bg-white flex justify-center items-center border rounded-full">
                        <img src="/images/save.png" alt="" />
                    </div>
                </div>

                <div className="px-2">
                    <h2 className="text-lg dark:text-slate-400 text-slate-800 font-semibold">{job.IT_job_title}</h2>
                </div>

                <div className="px-2 flex justify-between items-center">
                    <div className="flex gap-1">
                        {generateStars(job.company_rating)}
                    </div>
                    <p className="text-sm text-slate-600 underline dark:text-slate-400">({job.company_reviews} Reviews)</p>
                </div>

                <div className="flex px-2 dark:text-slate-400 gap-1 text-sm font-semibold text-slate-600 justify-start items-center">
                    <FaLocationDot />
                    <p>{job.company_location}</p>
                </div>

                <div className="px-2 grid  grid-cols-2 gap-1">
                    <p className="p-1 text-xs border border-slate-500 rounded-full text-center">{job.experience_level}</p>
                </div>

                <div className="px-2 grid  grid-cols-2 gap-1">
                    <p className="p-1 text-xs border border-slate-500 rounded-full text-center">{job.internship_mode}</p>
                    <p className="p-1 text-xs border border-slate-500 rounded-full text-center">On-site</p>
                </div>
            </div>

            <div className="flex w-full px-2 justify-between items-center">
                <p className="flex items-end">${formatSalary(job.salary_per_month)} / <span className="text-slate-500 text-xs">Monthly</span></p>
                <button onClick={() => setOpen(true)} className="border dark:bg-slate-700 shadow-lg px-4 rounded-full text-sm py-1 text-white bg-black text-center">Details</button>
            </div>
            <JobDialog job={job} open={open} onClose={() => setOpen(false)} bgColorWithOpacity={bgColorWithOpacity}   stars={generateStars(job.company_rating)}  />
        </div>
    );
}

export default JobCard;
