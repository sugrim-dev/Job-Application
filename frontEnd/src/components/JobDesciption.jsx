import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
    MapPin,
    BriefcaseBusiness,
    IndianRupee,
    Users,
    CalendarDays,
    Clock3,
    Building2,
    CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";

const JobDesciption = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);

    const dispatch = useDispatch();
    const { id: jobId } = useParams();

    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);

    // ---------------------------------------
    // Check whether user already applied
    // ---------------------------------------
    const checkApplied = (job) => {
        if (!job?.applications || !user?._id) {
            return false;
        }

        return job.applications.some(
            (application) =>
                application?.applicant === user._id ||
                application?.applicant?._id === user._id
        );
    };

    // ---------------------------------------
    // Fetch single job
    // ---------------------------------------
    useEffect(() => {
        if (!jobId) return;

        const fetchSingleJob = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    {
                        withCredentials: true,
                    }
                );

                if (res?.data?.success && res?.data?.job) {
                    const job = res.data.job;

                    dispatch(setSingleJob(job));

                    setIsApplied(checkApplied(job));
                } else {
                    toast.error(
                        res?.data?.message || "Job not found"
                    );
                }
            } catch (error) {
                console.error("Fetch Single Job Error:", error);

                toast.error(
                    error?.response?.data?.message ||
                        "Unable to load job details"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    // ---------------------------------------
    // Apply Job
    // ---------------------------------------
    const applyJobHandler = async () => {
        if (!user?._id) {
            toast.error("Please login to apply for this job.");
            return;
        }

        if (!jobId) {
            toast.error("Job ID is missing.");
            return;
        }

        if (isApplied || applying) {
            return;
        }

        try {
            setApplying(true);

            const res = await axios.post(
                `${JOB_API_END_POINT}/apply/${jobId}`,
                {},
                {
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                setIsApplied(true);

                // Safely update Redux state
                const currentApplications =
                    singleJob?.applications || [];

                const updatedSingleJob = {
                    ...singleJob,
                    applications: [
                        ...currentApplications,
                        {
                            applicant: user._id,
                        },
                    ],
                };

                dispatch(setSingleJob(updatedSingleJob));

                toast.success(
                    res?.data?.message ||
                        "Application submitted successfully!"
                );
            } else {
                toast.error(
                    res?.data?.message ||
                        "Unable to apply for this job."
                );
            }
        } catch (error) {
            console.error("Apply Job Error:", error);

            toast.error(
                error?.response?.data?.message ||
                    "Something went wrong while applying."
            );
        } finally {
            setApplying(false);
        }
    };

    // ---------------------------------------
    // Loading UI
    // ---------------------------------------
    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="h-12 w-12 mx-auto rounded-full border-4 border-purple-100 border-t-[#6A38C2] animate-spin" />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading job details...
                    </p>
                </motion.div>
            </div>
        );
    }

    // ---------------------------------------
    // No Job
    // ---------------------------------------
    if (!singleJob) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center">
                        <BriefcaseBusiness className="w-8 h-8 text-red-500" />
                    </div>

                    <h2 className="mt-5 text-2xl font-bold text-gray-900">
                        Job Not Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        This job may have been removed or is no longer
                        available.
                    </p>
                </div>
            </div>
        );
    }

    // ---------------------------------------
    // Safe values
    // ---------------------------------------
    const applications = singleJob?.applications || [];

    const applicantCount = applications.length;

    const createdDate = singleJob?.createdAt
        ? new Date(singleJob.createdAt).toLocaleDateString(
              "en-IN",
              {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              }
          )
        : "Not available";

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50/30 py-10 px-4 md:px-8">

            <div className="max-w-6xl mx-auto">

                {/* -------------------------------- */}
                {/* HERO CARD */}
                {/* -------------------------------- */}

                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
                        shadow-[0_15px_50px_rgba(0,0,0,0.06)]
                    "
                >

                    {/* Background Glow */}

                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

                    <div className="absolute -bottom-32 -left-24 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl" />

                    <div className="relative p-6 md:p-10">

                        {/* Company + Apply */}

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-7">

                            <div className="flex items-center gap-5">

                                {/* Company Logo */}

                                <div className="
                                    w-20
                                    h-20
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-[#6A38C2]
                                    to-indigo-600
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    text-3xl
                                    font-bold
                                    shadow-lg
                                    shadow-purple-200
                                ">
                                    {singleJob?.company?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "J"}
                                </div>

                                <div>

                                    <p className="text-sm font-medium text-purple-600">
                                        {singleJob?.company?.name ||
                                            "Company"}
                                    </p>

                                    <h1 className="
                                        mt-1
                                        text-3xl
                                        md:text-4xl
                                        font-bold
                                        tracking-tight
                                        text-gray-900
                                    ">
                                        {singleJob?.title ||
                                            "Job Position"}
                                    </h1>

                                    <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                                        <MapPin className="w-4 h-4" />

                                        {singleJob?.location ||
                                            "India"}
                                    </div>

                                </div>
                            </div>

                            {/* Apply Button */}

                            <Button
                                onClick={
                                    isApplied
                                        ? undefined
                                        : applyJobHandler
                                }
                                disabled={
                                    isApplied || applying
                                }
                                className={`
                                    h-12
                                    px-7
                                    rounded-xl
                                    font-semibold
                                    shadow-lg
                                    transition-all
                                    ${
                                        isApplied
                                            ? "bg-green-600 hover:bg-green-600 cursor-not-allowed"
                                            : "bg-gradient-to-r from-[#6A38C2] to-indigo-600 hover:from-[#5929ad] hover:to-indigo-700 shadow-purple-200"
                                    }
                                `}
                            >
                                {isApplied ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5 mr-2" />
                                        Already Applied
                                    </>
                                ) : applying ? (
                                    <>
                                        <span className="w-4 h-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                        Applying...
                                    </>
                                ) : (
                                    "Apply Now"
                                )}
                            </Button>

                        </div>

                        {/* Badges */}

                        <div className="flex flex-wrap gap-3 mt-8">

                            <Badge className="
                                rounded-lg
                                px-4
                                py-2
                                bg-blue-50
                                text-blue-700
                                border
                                border-blue-100
                            ">
                                <BriefcaseBusiness className="w-4 h-4 mr-2" />
                                {singleJob?.position || "Position"}
                            </Badge>

                            <Badge className="
                                rounded-lg
                                px-4
                                py-2
                                bg-orange-50
                                text-orange-700
                                border
                                border-orange-100
                            ">
                                <Clock3 className="w-4 h-4 mr-2" />
                                {singleJob?.jobType || "Full Time"}
                            </Badge>

                            <Badge className="
                                rounded-lg
                                px-4
                                py-2
                                bg-purple-50
                                text-purple-700
                                border
                                border-purple-100
                            ">
                                <IndianRupee className="w-4 h-4 mr-2" />
                                {singleJob?.salary || "Salary"} LPA
                            </Badge>

                        </div>

                    </div>
                </motion.div>

                {/* -------------------------------- */}
                {/* MAIN CONTENT */}
                {/* -------------------------------- */}

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-7
                    mt-8
                ">

                    {/* DESCRIPTION */}

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="
                            lg:col-span-2
                            rounded-3xl
                            border
                            border-gray-200
                            bg-white
                            p-6
                            md:p-8
                            shadow-sm
                        "
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-purple-50
                                flex
                                items-center
                                justify-center
                            ">
                                <Building2 className="w-5 h-5 text-[#6A38C2]" />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900">
                                Job Description
                            </h2>

                        </div>

                        <div className="
                            text-gray-600
                            leading-8
                            text-[15px]
                            whitespace-pre-line
                        ">
                            {singleJob?.description ||
                                "No description available for this job."}
                        </div>

                    </motion.div>

                    {/* JOB OVERVIEW */}

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="
                            rounded-3xl
                            border
                            border-gray-200
                            bg-white
                            p-6
                            shadow-sm
                            h-fit
                        "
                    >

                        <h2 className="
                            text-xl
                            font-bold
                            text-gray-900
                            mb-6
                        ">
                            Job Overview
                        </h2>

                        <div className="space-y-5">

                            {/* Location */}

                            <div className="flex gap-4">

                                <div className="
                                    w-10
                                    h-10
                                    shrink-0
                                    rounded-xl
                                    bg-blue-50
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Location
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {singleJob?.location ||
                                            "India"}
                                    </p>
                                </div>

                            </div>

                            {/* Experience */}

                            <div className="flex gap-4">

                                <div className="
                                    w-10
                                    h-10
                                    shrink-0
                                    rounded-xl
                                    bg-purple-50
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <BriefcaseBusiness className="w-5 h-5 text-purple-600" />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Experience
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {singleJob?.experienceLevel ||
                                            0}{" "}
                                        Years
                                    </p>
                                </div>

                            </div>

                            {/* Applicants */}

                            <div className="flex gap-4">

                                <div className="
                                    w-10
                                    h-10
                                    shrink-0
                                    rounded-xl
                                    bg-green-50
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <Users className="w-5 h-5 text-green-600" />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Total Applicants
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {applicantCount} Applicants
                                    </p>
                                </div>

                            </div>

                            {/* Salary */}

                            <div className="flex gap-4">

                                <div className="
                                    w-10
                                    h-10
                                    shrink-0
                                    rounded-xl
                                    bg-orange-50
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <IndianRupee className="w-5 h-5 text-orange-600" />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Salary
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {singleJob?.salary || "Not specified"}{" "}
                                        LPA
                                    </p>
                                </div>

                            </div>

                            {/* Posted Date */}

                            <div className="flex gap-4">

                                <div className="
                                    w-10
                                    h-10
                                    shrink-0
                                    rounded-xl
                                    bg-indigo-50
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <CalendarDays className="w-5 h-5 text-indigo-600" />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Posted On
                                    </p>

                                    <p className="font-semibold text-gray-800 mt-1">
                                        {createdDate}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default memo(JobDesciption);