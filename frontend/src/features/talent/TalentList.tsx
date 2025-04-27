import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Talent, PagedResponse, talentService } from '../../services/talentService';
import { useAuth } from '../../hooks/useAuth';

const TalentList: React.FC = () => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [pageSize] = useState<number>(10);
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.roles?.some(role => role === 'ADMIN' || role === 'ROLE_ADMIN');

  useEffect(() => {
    if (!isAdmin) {
      alert('You do not have permission to view this page');
      navigate('/dashboard');
      return;
    }
    
    fetchTalents();
  }, [page, isAdmin, navigate]);

  const fetchTalents = async () => {
    setLoading(true);
    try {
      let response: PagedResponse<Talent>;
      
      if (searchTerm) {
        response = await talentService.searchTalents(searchTerm, page, pageSize);
      } else {
        response = await talentService.getAllTalents(page, pageSize);
      }
      
      setTalents(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error('Failed to fetch talents', error);
      alert('Failed to fetch talents');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    fetchTalents();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this talent?')) {
      try {
        await talentService.deleteTalent(id);
        alert('Talent deleted successfully');
        fetchTalents();
      } catch (error) {
        console.error('Failed to delete talent', error);
        alert('Failed to delete talent');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-5 px-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Talent Management</h1>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={() => navigate('/talents/new')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Talent
        </button>
      </div>

      <div className="mb-5">
        <div className="flex">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search talents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button 
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Position
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center">Loading...</td>
              </tr>
            ) : talents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center">No talents found</td>
              </tr>
            ) : (
              talents.map((talent) => (
                <tr key={talent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{talent.firstName} {talent.lastName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{talent.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{talent.currentPosition || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {talent.skills 
                        ? talent.skills.split(',').slice(0, 3).join(', ') + (talent.skills.split(',').length > 3 ? '...' : '')
                        : '-'
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="relative inline-block text-left group">
                      <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                        <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      <div className="hidden group-hover:block absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => navigate(`/talents/${talent.id}`)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => navigate(`/talents/edit/${talent.id}`)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(talent.id!)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-5">
        <div className="text-sm text-gray-700">
          Showing {talents.length} of {totalElements} talents
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className={`px-3 py-1 border rounded-md ${
              page === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          <span className="px-3 py-1 text-gray-700">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
            className={`px-3 py-1 border rounded-md ${
              page === totalPages - 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentList;
