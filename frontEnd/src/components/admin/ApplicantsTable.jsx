import { memo } from 'react';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../ui/table';
import { MoreHorizontal } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';

const shortListingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
      <Table>
        <TableCaption className="py-4 text-sm text-gray-500">
          A list of your recent applied users
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-700">
              Full Name
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Email
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Contact
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Resume
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Date
            </TableHead>

            <TableHead className="text-right font-semibold text-gray-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item) => (
              <TableRow
                key={item?._id}
                className="transition-colors hover:bg-gray-50"
              >
                {/* Full Name */}
                <TableCell className="font-medium text-gray-800">
                  {item?.applicant?.fullname || 'N/A'}
                </TableCell>

                {/* Email */}
                <TableCell className="text-gray-600">
                  {item?.applicant?.email || 'N/A'}
                </TableCell>

                {/* Contact */}
                <TableCell className="text-gray-600">
                  {item?.applicant?.phoneNumber || 'N/A'}
                </TableCell>

                {/* Resume */}
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {item?.applicant?.profile?.resumeOriginalName ||
                        'View Resume'}
                    </a>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </TableCell>

                {/* Date */}
                <TableCell className="text-gray-600">
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : 'N/A'}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-gray-100"
                      >
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      align="end"
                      className="w-36 p-2"
                    >
                      {shortListingStatus.map((status) => (
                        <div
                          key={status}
                          onClick={() =>
                            statusHandler(status, item?._id)
                          }
                          className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-24 text-center text-gray-500"
              >
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default memo(ApplicantsTable);