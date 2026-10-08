import { memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Loader2,
  UserRound,
  Mail,
  Phone,
  FileText,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: "",
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];

    setInput({
      ...input,
      file,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="bg-white text-slate-900 sm:max-w-[550px] p-0 overflow-hidden rounded-2xl border border-slate-200 shadow-2xl"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader className="px-6 py-5 bg-slate-900 text-white">
          <DialogTitle className="text-xl font-semibold flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center">
              <UserRound className="h-5 w-5" />
            </div>
            Update Profile
          </DialogTitle>

          <p className="text-sm text-slate-300 mt-1">
            Keep your professional information up to date.
          </p>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="px-6 py-6 space-y-5 max-h-[65vh] overflow-y-auto">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-slate-700"
              >
                Full Name
              </Label>

              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <Input
                  id="name"
                  name="fullname"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="pl-10 h-11 border-slate-200 focus-visible:ring-slate-900"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="pl-10 h-11 border-slate-200 focus-visible:ring-slate-900"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="number"
                className="text-sm font-medium text-slate-700"
              >
                Phone Number
              </Label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <Input
                  id="number"
                  name="phoneNumber"
                  type="tel"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="pl-10 h-11 border-slate-200 focus-visible:ring-slate-900"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="bio"
                className="text-sm font-medium text-slate-700"
              >
                Professional Bio
              </Label>

              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="h-11 border-slate-200 focus-visible:ring-slate-900"
                placeholder="e.g. MERN Stack Developer"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="skills"
                className="text-sm font-medium text-slate-700"
              >
                Skills
              </Label>

              <div className="relative">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="pl-10 h-11 border-slate-200 focus-visible:ring-slate-900"
                  placeholder="React, Node.js, MongoDB, JavaScript"
                />
              </div>

              <p className="text-xs text-slate-400">
                Separate multiple skills using commas.
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="file"
                className="text-sm font-medium text-slate-700"
              >
                Resume
              </Label>

              <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-slate-600" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Upload Resume
                    </p>

                    <p className="text-xs text-slate-400">
                      PDF files only
                    </p>
                  </div>
                </div>

                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="bg-white border-slate-200 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-slate-100 bg-slate-50">
            {loading ? (
              <Button
                disabled
                className="w-full h-11 bg-slate-900 text-white"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating Profile...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-slate-900 text-white hover:bg-slate-800 transition-all"
              >
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(UpdateProfileDialog);