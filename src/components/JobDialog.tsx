import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Job } from "../context/JobContext";
import { FaLocationDot } from "react-icons/fa6";

interface JobDialogProps {
    job: Job;
    open: boolean;
    onClose: () => void;
    bgColorWithOpacity: string;
    stars: React.ReactNode;
}

const JobDialog: React.FC<JobDialogProps> = ({ job, open, onClose, bgColorWithOpacity, stars }) => {
    return (
        <Dialog  open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle>Details </DialogTitle>
                </DialogHeader>

               <div  className="border  flex flex-col gap-2 rounded-md " style={{ backgroundColor: bgColorWithOpacity, }}>
              
                           
                              <div className="flex px-2 pt-2 justify-between items-center" >
                                  <div>logo</div>
                                  <div className="p-1 w-7 h-7 bg-white flex justify-center items-center border rounded-full">
                                      <img src="/images/save.png" alt="" />
                                  </div>
                              </div>
              
                              <div className="px-2">
                                
                                  <h2 className="text-lg text-slate-800 font-semibold dark:text-slate-300">{job.IT_job_title}</h2>
                              </div>
                              
                              <div className="px-2">
                              <p className="text-sm text-slate-600 dark:text-slate-500">Company Name: <span className="dark:text-slate-400 text-base font-medium">{job.company_name}</span></p>
                              </div>
              
                              <div className="px-2 flex justify-between items-center">
                                  <div className="flex gap-1">
                                      {stars}
                                  </div>
                                  <p className="text-sm text-slate-600 underline dark:text-slate-400">({job.company_reviews} Reviews)</p>
                              </div>
              
                              <div className="flex px-2 gap-1 text-sm font-semibold text-slate-600 justify-start items-center">
                                  <FaLocationDot />
                                  <p className="dark:text-slate-400">{job.company_location}</p>
                              </div>
              
                              <div className="px-2 grid  grid-cols-2 gap-1">
                                  <p className="p-1 text-xs border border-slate-500 rounded-full text-center">{job.experience_level}</p>
                              </div>
              
                              <div className="px-2 grid  grid-cols-2 gap-1">
                                  <p className="p-1 text-xs border border-slate-500 rounded-full text-center">{job.internship_mode}</p>
                                  <p className="p-1 text-xs border border-slate-500 rounded-full text-center">On-site</p>
                              </div>
                              <div className="flex justify-end items-center">
                                <button onClick={onClose} className="px-8 dark:bg-slate-600 border hover:shadow-2xl duration-300  h-8 rounded-full text-sm text-white bg-black ">Apply</button>
                              </div>
                          </div>
            </DialogContent>
        </Dialog>
    );
};

export default JobDialog;

