import { memo, useState, useEffect } from 'react';
import Navbar from '../Shared/Navbar';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useNavigate, useParams } from 'react-router-dom';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UseGetCompanyById from '@/hooks/UseGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    UseGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
   

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) formData.append("file", input.file);

        try {
            setLoading(true);
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true
                }
            );

            if (res?.data?.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update company");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany?.name || "",
                description: singleCompany?.description || "",
                website: singleCompany?.website || "",
                location: singleCompany?.location || "",
                file: null
            });
        }
    }, [singleCompany]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-4xl mx-auto mt-10 px-4">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                                onClick={() => navigate("/admin/companies")}
                            >
                                <ArrowLeft size={16} />
                                Back
                            </Button>
                            <div>
                                <h1 className="text-2xl font-semibold">Company Setup</h1>
                                <p className="text-sm text-gray-500">Update your company details</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label className="text-sm font-medium">Company Name</Label>
                                <Input
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="mt-2 h-11"
                                    placeholder="Company name"
                                />
                            </div>

                            <div>
                                <Label className="text-sm font-medium">Website</Label>
                                <Input
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="mt-2 h-11"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Location</Label>
                            <Input
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-2 h-11"
                                placeholder="City, Country"
                            />
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Description</Label>
                            <Textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-2 min-h-[120px] resize-none"
                                placeholder="Write about your company..."
                            />
                        </div>

                        <div>
                            <Label className="text-sm font-medium">Company Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-2 h-11 cursor-pointer"
                            />
                        </div>

                        <div className="pt-4">
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
                                        Save Changes
                                    </Button>
                                )
                            }
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(CompanySetup);