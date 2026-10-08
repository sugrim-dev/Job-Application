import { memo, useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { setUser } from "@/redux/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading ,user} = useSelector(store => store.auth);
    const [input, SetInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeEventHandler = (e) => {
        SetInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto '>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2 space-y-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="sugrim@gmail.com"
                        ></Input>
                    </div>

                    <div className='my-2 space-y-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}

                        ></Input>
                    </div>

                    <div className="flex items-center gap-6 mt-4">

                        <label className="flex items-center gap-3 cursor-pointer">
                            <Input
                                type="radio"
                                name="role"
                                value="student"
                                checked={input.role === 'student'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <span>Student</span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <Input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={input.role === 'recruiter'}
                                onChange={changeEventHandler}
                                className="cursor-pointer"
                            />
                            <span>Recruiter</span>
                        </label>
                    </div>

                   {
  loading ? (
    <Button className="w-full my-4 bg-black text-white">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button
      type="submit"
      className="w-full my-4 bg-black text-white hover:bg-gray-800"
    >
      Login
    </Button>
  )
}


                    <span className='text-sm'>Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link> </span>
                </form>
            </div>


        </div>

    );
};

export default Login;