import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchJobsApi } from "../api/jobs";

export type Job = {
  id: number;
  IT_job_title: string;
  job_description: string;
  company_name: string;
  company_location: string;
  company_rating: number;
  company_reviews: number;
  salary_per_month: number;
  experience_level: string;
  internship_mode: string;
};

interface Filters {
  company_location: string;
  experience_level: string;
  internship_mode: string[];
  salary_range?: [number, number]; 
}

interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  fetchJobs: () => void;
  updateFilters: (newFilters: Partial<Filters>) => void;
  applyFilters: () => void;
  loading: boolean
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    company_location: "",
    experience_level: "",
    internship_mode: [],
  });

  // Fetch jobs from API
  const fetchJobs = async () => {
    try {
      setLoading(true)
      const data = await fetchJobsApi();
      setJobs(data);
      setFilteredJobs(data); 
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Update filters
  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Apply filters
  const applyFilters = () => {
    let updatedJobs = [...jobs];

    if (filters.company_location) {
      updatedJobs = updatedJobs.filter(
        (job) => job.company_location === filters.company_location
      );
    }

    if (filters.experience_level) {
      updatedJobs = updatedJobs.filter(
        (job) => job.experience_level === filters.experience_level
      );
    }

    if (filters.internship_mode.length > 0) {
      updatedJobs = updatedJobs.filter((job) =>
        filters.internship_mode.includes(job.internship_mode)
      );
    }

    if (filters.salary_range) {
      const [minSalary, maxSalary] = filters.salary_range;
      updatedJobs = updatedJobs.filter(
        (job) => job.salary_per_month >= minSalary && job.salary_per_month <= maxSalary
      );
    }

    setFilteredJobs(updatedJobs);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  return (
    <JobContext.Provider value={{ jobs, filteredJobs, fetchJobs, updateFilters, applyFilters, loading }}>
      {children}
    </JobContext.Provider>
  );
};


export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
