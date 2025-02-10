import JobList from "../components/JobList"
import Filters from "../components/Filters"
import { MdFingerprint } from "react-icons/md";

const Home = () => {
  return (
    <div className="flex md:gap-2 justify-center md:justify-evenly  ">
        {/* FilterSection */}
      <div className="md:w-1/5 mt-8 space-y-5 ">
        <div className="border hidden  w-56 rounded-2xl bg-slate-900 md:flex flex-col gap-4 justify-center items-center text-white h-56">

            <div className="p-1 bg-white rounded-full">
                <MdFingerprint className="text-4xl text-black"/>
            </div>
            <div className="flex flex-col  gap-2 justify-center items-center">
                <h3 className="text-lg font-medium"> Update your data !</h3>

                <p className="text-center text-xs px-5">Update your data and find the best opportunities</p>

            </div>

               <div className="p-2 cursor-pointer px-7 py-3 bg-[#4FD1C5] text-black text-sm rounded-full">
                Update you data
                </div> 


        </div>
        <div className="hidden md:block ">
            <Filters/>
        </div>

      </div>

      {/* JobList section */}

        <div className="">

      <JobList/>
        </div>
    </div>
  )
}

export default Home
