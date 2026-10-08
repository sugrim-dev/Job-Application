import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from './ui/table';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  // Always keep it as an array
  const appliedJobs = Array.isArray(allAppliedJobs)
    ? allAppliedJobs
    : [];

  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
      <Table>
        <TableCaption className="py-4 text-sm text-gray-500">
          A list of jobs you have applied for
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-700">
              Date
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Job Role
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Company
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Location
            </TableHead>

            <TableHead className="font-semibold text-gray-700">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs.length >= 0 ? (
            appliedJobs.map((item) => (
              <TableRow
                key={item?._id}
                className="transition-colors hover:bg-gray-50"
              >
                <TableCell className="text-gray-600">
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : 'N/A'}
                </TableCell>

                <TableCell className="font-medium text-gray-800">
                  {item?.job?.title || 'N/A'}
                </TableCell>

                <TableCell className="text-gray-600">
                  {item?.job?.company?.name || 'N/A'}
                </TableCell>

                <TableCell className="text-gray-600">
                  {item?.job?.location || 'N/A'}
                </TableCell>

                <TableCell>
    <span
        className={`rounded-full px-3 py-1 text-xs font-semibold
            ${
                item?.status?.toLowerCase() === "accepted"
                    ? "bg-green-300 text-green-700"
                    : item?.status?.toLowerCase() === "rejected"
                    ? "bg-red-300 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
            }
        `}
    >
        {item?.status || "Pending"}
    </span>
</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-gray-500"
              >
                You haven't applied for any job yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default memo(AppliedJobTable);