import { memo } from 'react';
import {
    Table,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
    TableBody
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover';
import { MoreHorizontal, Edit2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText = "" } = useSelector(
        store => store.company
    );

    const navigate = useNavigate();

    const filterCompanies = companies.filter((company) =>
        company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto my-10 px-4">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                <div className="p-5 border-b">
                    <h2 className="text-xl font-semibold">Companies</h2>
                    <p className="text-sm text-gray-500">
                        Manage your registered companies
                    </p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="pl-6">
                                Company
                            </TableHead>

                            <TableHead>
                                Date
                            </TableHead>

                            <TableHead className="text-right pr-6">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filterCompanies.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="text-center py-10 text-gray-500"
                                >
                                    {searchCompanyByText
                                        ? `No company found for "${searchCompanyByText}"`
                                        : "You haven't registered any company yet."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterCompanies.map((company) => (
                                <TableRow
                                    key={company._id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <TableCell className="pl-6">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage
                                                    src={
                                                        company?.logo ||
                                                        "https://via.placeholder.com/40"
                                                    }
                                                />
                                            </Avatar>

                                            <span className="font-medium">
                                                {company?.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-gray-600">
                                        {company?.createdAt
                                            ? new Date(
                                                company.createdAt
                                            ).toLocaleDateString()
                                            : "N/A"}
                                    </TableCell>

                                    <TableCell className="text-right pr-6">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-2 rounded-md hover:bg-gray-100">
                                                    <MoreHorizontal
                                                        size={20}
                                                        className="text-gray-500"
                                                    />
                                                </button>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-15  p-2">
                                                <div
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/companies/${company._id}`
                                                        )
                                                    }
                                                    className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <Edit2 size={14} />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default memo(CompaniesTable);