import Job from "../models/job-model.js";
import Application from "../models/application-model.js";
//admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, experience, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

//student k liye

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword?.trim() || "";

        let query = {};

        // Agar keyword hai tabhi search/filter karo
        if (keyword) {
            query = {
                $or: [
                    {
                        title: {
                            $regex: keyword,
                            $options: "i"
                        }
                    },
                    {
                        description: {
                            $regex: keyword,
                            $options: "i"
                        }
                    }
                ]
            };
        }

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log("GET ALL JOBS ERROR:", error);

        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

//student 
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

//admin kitne job create kra hai abhi tk

export const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;

        console.log("ADMIN ID:", adminId);

        const jobs = await Job.find({ created_by: adminId }).populate("company");

        console.log("ADMIN JOBS:", jobs);

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const applyJob = async (req, res) => {
    try {

        const userId = req.id;
        const jobId = req.params.id;


        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }


        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: userId
        });


        if (alreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "Already applied for this job"
            });
        }


        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });


        job.applications.push(newApplication._id);

        await job.save();


        return res.status(200).json({
            success: true,
            message: "Job applied successfully"
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
}