import { FaLocationDot } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";

import { IoIosSearch } from "react-icons/io";
import { FaSortDown } from "react-icons/fa";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useJobContext } from "../context/JobContext";
import { useState } from "react";
import { GiHandBag } from "react-icons/gi";
import { Slider } from "@/components/ui/slider";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle"


const Navbar = () => {
  const { jobs, updateFilters } = useJobContext();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 10000]);

  const locations = Array.from(new Set(jobs.map((job) => job.company_location)));
  const experienceLevels = Array.from(new Set(jobs.map((job) => job.experience_level)));

  const handleFilterChange = (type: "location" | "experience", value: string) => {
    if (type === "location") {
      setSelectedLocation(value);
      updateFilters({ company_location: value, experience_level: selectedExperience });
    } else if (type === "experience") {
      setSelectedExperience(value);
      updateFilters({ company_location: selectedLocation, experience_level: value });
    }

  };
  const handleSalaryChange = (value: number[]) => {
    if (value.length === 2) {
      setSalaryRange([value[0], value[1]] as [number, number]); // Cast to tuple
      updateFilters({
        company_location: selectedLocation,
        experience_level: selectedExperience,
        salary_range: [value[0], value[1]] as [number, number], // Ensure correct type
      });
    }
  };




  return (
    <div className="bg-[#171923] text-white h-36  w-full flex flex-col justify-center items-center  ">

      <div className="flex flex-col justify-between items-center  gap-2 w-[90%] mx-auto">
        {/* this is for first line */}
        <div className=" w-full  border-b-2 border-slate-800 flex justify-between items-center h-16">
         
          <Logo/>


          {/* navigation LINKs */}
          <div className=" h-full">
            <ul className="flex text-sm text-slate-300 h-full justify-center items-center gap-6">
              <div className="border-b-2   h-full flex justify-center items-center ">

                <li className="">Find Job</li>
              </div>
              <li className="hidden md:block">Messages</li>
              <li className="hidden md:block">Hiring</li>
              <li className="hidden md:block">Community</li>
              <li className="hidden md:block">FAQ</li>
            </ul>

          </div>

          {/* location */}
          <div className="hidden md:flex text-slate-300 text-sm justify-center items-center gap-4">
            <FaLocationDot />
            <p>New York, NY</p>
          </div>
          {/* profile */}
          <div className=" hidden md:flex justify-center items-center gap-4">

            <CgProfile className="text-2xl" />

            <div className="border p-1 border-slate-500 rounded-full">

              <IoSettingsSharp />
            </div>
            <div className="border border-slate-500 p-1 rounded-full">

              <ModeToggle />
            </div>


          </div>
        </div>

        {/* this is for second line */}
        <div className="flex text-slate-300   w-full  justify-between  items-center">
          <div className="hidden  gap-4 w-48 md:flex  justify-between h-16 items-center">
            <div className="p-1 border rounded-full border-slate-400">
              <IoIosSearch />
            </div>
            <div className="flex  mr-10 w-44 justify-between items-center">
              <p className="text-sm">Designer</p>
              <FaSortDown />
            </div>

          </div>
          <div className="h-12 hidden md:block border border-slate-600"></div>






          <div className="gap-6 w-48 flex  justify-center h-16 items-center">




            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex justify-center items-center  text-slate-300">
                  <div className="p-1 border rounded-full">

                    <FaLocationDot className="" />
                  </div>
                  <Button variant="destructive" className="outline-none border-none bg-slate-900 hover:bg-slate-900 text-slate-300 hover:text-white">{selectedLocation || "Work Location"}</Button>
                  <FaSortDown />
                </div>
              </DropdownMenuTrigger>


              <DropdownMenuContent>
                {locations.map((location) => (
                  <DropdownMenuItem key={location} onClick={() => handleFilterChange("location", location)}>
                    {location}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>







          <div className="h-12  border border-slate-600"></div>
          <div className="gap-6 w-48   flex  justify-center h-16 items-center">


            <DropdownMenu >
              <DropdownMenuTrigger asChild>


                <div className="flex  justify-center items-center text-slate-300">
                  <div className="p-1 border rounded-full">
                    <GiHandBag />
                  </div>
                  <Button variant="destructive" className=" underline-none border-none bg-slate-900 hover:bg-slate-900 hover:text-white text-slate-300 ">{selectedExperience || "Experience "}</Button>
                  <FaSortDown />

                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {experienceLevels.map((level) => (
                  <DropdownMenuItem key={level} onClick={() => handleFilterChange("experience", level)}>
                    {level}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>







          <div className="h-12  border hidden md:block border-slate-600"></div>
          <div className="gap-6 w-48 hidden md:flex  justify-center h-16 items-center">
            <div className="p-1 border rounded-full border-slate-400">
              <IoIosSearch />
            </div>
            <div className="flex w-28 justify-between items-center">
              <p className="text-sm">Per month</p>
              <FaSortDown />
            </div>
          </div>



          <div className="h-12 hidden md:fixed  border border-slate-600"></div>



          <div className="hidden gap-6 w-48  md:flex  justify-center h-16 items-center">


            <div className="flex flex-col  gap-1 justify-center h-16 items-start">
              <p className="text-sm">Salary Range:</p>
              <Slider
                className="w-36 outline-none"
                value={salaryRange}
                onValueChange={handleSalaryChange}
                min={0}
                max={10000}
                step={1000}
              />
              <div className="flex justify-between w-full  items-center text-sm">
                <p className="text-sm">${salaryRange[0]}</p>
                <p className="text-sm"> ${salaryRange[1]}</p>


              </div>
            </div>

          </div>

        </div>





      </div>

    </div>
  )
}

export default Navbar

