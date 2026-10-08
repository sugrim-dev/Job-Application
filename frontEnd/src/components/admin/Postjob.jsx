import { memo, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import {  useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";
const Postjob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: ""
  });

  const [loading,setLoading]  = useState(false);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const { companies } = useSelector(store => store.company);

  const submitHandler = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          'Content-Type':'application/json'
        },withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/jobs")
      }

    }catch(error){
      console.error(error);
      
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <form onSubmit={submitHandler}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Post a New Job
            </h1>
            <p className="text-gray-500 mt-2">
              Create a job opportunity and find the right candidate.
            </p>
          </div>

          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  type="text"
                  placeholder="e.g. Full Stack Developer"
                  name="title"
                  value={input.title}
                  onChange={changeHandler}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  type="text"
                  placeholder="e.g. Noida"
                  name="location"
                  value={input.location}
                  onChange={changeHandler}
                  className="h-11"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Job Description</Label>
                <textarea
                  placeholder="Describe the role, responsibilities and expectations..."
                  name="description"
                  value={input.description}
                  onChange={changeHandler}
                  className="w-full min-h-[130px] resize-none rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Requirements</Label>
                <textarea
                  placeholder="e.g. MERN Stack, REST API, MongoDB, Git"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeHandler}
                  className="w-full min-h-[110px] resize-none rounded-md border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
                <p className="text-xs text-gray-400">
                  Separate multiple requirements with commas.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Salary</Label>
                <Input
                  type="number"
                  placeholder="e.g. 8 LPA"
                  name="salary"
                  value={input.salary}
                  onChange={changeHandler}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Job Type</Label>
                <Input
                  type="text"
                  placeholder="e.g. Full Time"
                  name="jobType"
                  value={input.jobType}
                  onChange={changeHandler}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Input
                  type="number"
                  placeholder="e.g. 1"
                  name="experience"
                  value={input.experience}
                  onChange={changeHandler}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Number of Positions</Label>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  name="position"
                  value={input.position}
                  onChange={changeHandler}
                  className="h-11"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label>Company ID</Label>
                <Input
                  type="password"
                  placeholder="Enter company ID"
                  name="companyId"
                  value={input.companyId}
                  onChange={changeHandler}
                  className="h-11"
                />
              </div>
              {
                companies?.length >= 0 && (
                  <div className="md:col-span-2 space-y-2">
                    <Label>Company</Label>

                    <select
                      name="companyId"
                      value={input.companyId}
                      onChange={changeHandler}
                      className="w-full h-11 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-700 shadow-sm transition-all outline-none cursor-pointer hover:border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-100"
                    >
                      <option value="">
                        Select a company
                      </option>

                      {companies.map((company) => (
                        <option
                          key={company._id}
                          value={company._id}
                        >
                          {company.name}
                        </option>
                      ))}
                    </select>

                    <p className="text-xs text-gray-400">
                      Select the company for which you are posting this job.
                    </p>
                  </div>
                )
              }
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
               

              {
                                loading ? (
                                    <Button className="w-full bg-black text-white">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="w-full bg-black text-white hover:bg-gray-800 transition"
                                    >
                                        Post
                                    </Button>
                                )
                            }

            </div>
            {
              companies.length === 0 && <p className='text-xs text-red-500 font-bold text-center my-3'>*Please register a company first ,before posting a jobs</p>
            }
          </div>
        </div>

      </form>
    </div>
  );
};

export default memo(Postjob);

