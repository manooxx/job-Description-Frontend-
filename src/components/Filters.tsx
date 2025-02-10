import { useState, useEffect } from "react";
import { useJobContext } from "../context/JobContext";

const Filters = () => {
  const { updateFilters, applyFilters } = useJobContext();

  
  const [selectedFilters, setSelectedFilters] = useState({
    internship_mode: [] as string[],
    experience_level: "",
  });

 
  useEffect(() => {
    updateFilters(selectedFilters);
  }, [selectedFilters, ]);

  const handleInternshipChange = (mode: string) => {
    setSelectedFilters((prev) => {
      const updatedModes = prev.internship_mode.includes(mode)
        ? prev.internship_mode.filter((m) => m !== mode) 
        : [...prev.internship_mode, mode]; 
      return { ...prev, internship_mode: updatedModes };
    });
  };

  
  const handleExperienceChange = (level: string) => {
    setSelectedFilters((prev) => ({ ...prev, experience_level: level }));
  };

  
  const applySelectedFilters = () => {
    applyFilters();
  };

  return (
    <div className="p-4   rounded-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      <div className="mb-4 space-y-4">
        <h4 className="font-semibold">Internship Mode</h4>
        <div className="flex flex-col space-y-2">
          {["Full Time", "Internship", "Part Time", "Contractual"].map((mode) => (
            <label key={mode} className="flex items-center space-x-2">
              <input
                type="checkbox"

                value={mode}
                checked={selectedFilters.internship_mode.includes(mode)}
                onChange={() => handleInternshipChange(mode)}
                className="w-4  bg-black text-black h-4"
              />
              <span className="text-sm underline-none">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4 space-y-4">
        <h4 className="font-semibold">Experience Level</h4>
        <div className="flex flex-col space-y-2">
          {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
            <label key={level} className="flex items-center space-x-2">
              <input
                type="radio"
                name="experience_level"
                value={level}
                checked={selectedFilters.experience_level === level}
                onChange={() => handleExperienceChange(level)}
                className="w-4 h-4"
              />
              <span className="text-sm">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={applySelectedFilters}
        className="bg-black rounded-full text-center text-white px-4 py-2  hover:drop-shadow-2xl"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
