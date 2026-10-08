import { setAllAdminJobs } from "@/redux/jobSlice";
import { useEffect } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";

const UseGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/getadminjobs`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("ADMIN JOB RESPONSE:", res.data);

                if (res?.data?.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("ADMIN JOB ERROR:", error);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);
};

export default UseGetAllAdminJobs;