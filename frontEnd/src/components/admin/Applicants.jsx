import { memo, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          {
            withCredentials: true,
          }
        );

        console.log('Applicants Response:', res.data);

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log('Error fetching applicants:', error);
      }
    };

    if (params.id) {
      fetchApplications();
    }
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between my-5">
          <h1 className="font-bold text-xl">
            Applicants
            <span className="ml-2 text-gray-500">
              ({applicants?.applications?.length || 0})
            </span>
          </h1>
        </div>

        <ApplicantsTable />
      </div>
    </div>
  );
};

export default memo(Applicants);