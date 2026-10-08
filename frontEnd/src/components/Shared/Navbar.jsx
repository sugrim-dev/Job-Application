import { memo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { setUser } from "@/redux/authSlice";
import { UserCircle } from "lucide-react";
const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res?.data?.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
       return (
    <div className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl shadow-lg shadow-black/10">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-[72px] px-6">

            {/* Logo */}
            <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 rounded-xl border border-white/10 shadow-md">
                    <AvatarImage
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7AzL0sJBSg_fagZnzlbuR8nhNVxyE-7fiWYKCxYNOnA&s"
                        className="object-cover"
                    />
                </Avatar>

                <h2 className="text-2xl font-bold tracking-tight text-white">
                    Job <span className="text-violet-400">Portal</span>
                </h2>
            </div>

            {/* Navigation + Auth */}
            <div className="flex items-center gap-8">

                <ul className="flex items-center gap-2 font-medium">
                    {
                        user && user.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link
                                        to="/admin/companies"
                                        className="rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                                    >
                                        Companies
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/admin/jobs"
                                        className="rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                                    >
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/"
                                        className="rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/jobs"
                                        className="rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                                    >
                                        Jobs
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/browse"
                                        className="rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                                    >
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>

                {
                    !user ? (
                        <div className="flex items-center gap-3">

                            <Link to="/login">
                                <Button
                                    variant="outline"
                                    className="border-slate-700 bg-transparent px-5 text-slate-200 hover:bg-white/10 hover:text-white"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button
                                    className="bg-violet-600 px-5 font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:bg-violet-700 hover:shadow-violet-600/30"
                                >
                                    Signup
                                </Button>
                            </Link>

                        </div>
                    ) : (
                        <Popover>

                            <PopoverTrigger asChild>
                                <div className="cursor-pointer rounded-full p-0.5 transition-all duration-200 hover:bg-violet-500/20">
                                    <Avatar className="h-10 w-10 border-2 border-slate-700 transition-all hover:border-violet-400">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="@shadcn"
                                            className="object-cover"
                                        />
                                    </Avatar>
                                </div>
                            </PopoverTrigger>

                            <PopoverContent
                                align="end"
                                className="w-80 border border-slate-800 bg-slate-950 p-5 text-white shadow-2xl shadow-black/30"
                            >

                                {/* Profile Header */}
                                <div className="flex gap-4 border-b border-slate-800 pb-4">
                                    <Avatar className="h-12 w-12 border border-slate-700">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="@shadcn"
                                            className="object-cover"
                                        />
                                    </Avatar>

                                    <div className="min-w-0">
                                        <h4 className="truncate font-semibold text-white">
                                            {user?.fullname}
                                        </h4>

                                        <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                                            {user?.profile?.bio || "Welcome to Job Portal"}
                                        </p>
                                    </div>
                                </div>

                                {/* Profile Actions */}
                                <div className="mt-4 flex flex-col gap-2">

                                    {user && user.role === "student" && (
                                        <div className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5">
                                            <UserCircle
                                                size={18}
                                                className="text-slate-400"
                                            />

                                            <Button
                                                variant="link"
                                                className="h-auto p-0 text-slate-300 no-underline hover:text-white"
                                            >
                                                <Link to="/profile">
                                                    View Profile
                                                </Link>
                                            </Button>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-red-500/10">
                                        <LogOut
                                            size={18}
                                            className="text-slate-400"
                                        />

                                        <Button
                                            onClick={logoutHandler}
                                            variant="link"
                                            className="h-auto p-0 text-slate-300 no-underline hover:text-red-400"
                                        >
                                            Logout
                                        </Button>
                                    </div>

                                </div>

                            </PopoverContent>

                        </Popover>
                    )
                }

            </div>
        </div>
    </div>
);
};

export default Navbar;