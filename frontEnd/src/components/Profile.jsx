import { memo, useState } from "react";
import Navbar from "./Shared/Navbar";

import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Contact,
  Mail,
  Pen,
  FileText,
  ExternalLink,
  BriefcaseBusiness,
} from "lucide-react";
import { Badge } from "./ui/badge";

import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";

import { useSelector } from "react-redux";
import UseGetAllAppliedJob from "@/hooks/UseGetAllAppliedJob";

const isResume = true;

const Profile = () => {
  UseGetAllAppliedJob();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const skills = user?.profile?.skills || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="h-32 sm:h-40 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_40%)]" />
          </div>

          <div className="px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-12 relative">
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-white shadow-lg bg-white">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      user?.profile?.profileImage ||
                      user?.profile?.photo
                    }
                    alt={user?.fullname || "User"}
                    className="object-cover"
                  />
                </Avatar>

                <div className="pb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {user?.fullname || "Your Name"}
                  </h1>

                  <p className="text-sm text-slate-500 mt-1">
                    {user?.profile?.bio ||
                      "Add a professional bio to your profile"}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="w-full sm:w-auto border-slate-300 hover:bg-slate-900 hover:text-white transition-all"
              >
                <Pen className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Email Address
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1 break-all">
                    {user?.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <Contact className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    Phone Number
                  </p>

                  <p className="text-sm font-medium text-slate-800 mt-1">
                    {user?.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center">
                <BriefcaseBusiness className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Professional Skills
                </h2>

                <p className="text-sm text-slate-500">
                  Technologies and skills you have added
                </p>
              </div>
            </div>

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-5 text-center">
                No skills added yet
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Resume
                </h2>

                <p className="text-sm text-slate-500">
                  Your latest uploaded resume
                </p>
              </div>
            </div>

            {isResume && user?.profile?.resume ? (
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-5 w-5 text-slate-600 shrink-0" />

                  <p className="text-sm font-medium text-slate-700 truncate">
                    {user?.profile?.resumeOriginalName || "View Resume"}
                  </p>
                </div>

                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user?.profile?.resume}
                  className="shrink-0"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300 hover:bg-slate-900 hover:text-white"
                  >
                    View
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </div>
            ) : (
              <div className="text-sm text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-5 text-center">
                No resume uploaded
              </div>
            )}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Applied Jobs
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Track the jobs you have applied for
              </p>
            </div>

            <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
              <BriefcaseBusiness className="h-4 w-4 text-slate-600" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <AppliedJobTable />
          </div>
        </section>
      </main>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default memo(Profile);