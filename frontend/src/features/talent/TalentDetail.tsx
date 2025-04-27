import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Talent, talentService } from '../../services/talentService';
import { useAuth } from '../../hooks/useAuth';

const TalentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [talent, setTalent] = useState<Talent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.roles?.some(role => role === 'ADMIN' || role === 'ROLE_ADMIN');

  useEffect(() => {
    if (!isAdmin) {
      alert('You do not have permission to view this page');
      navigate('/dashboard');
      return;
    }

    fetchTalent();
  }, [id, isAdmin, navigate]);

  const fetchTalent = async () => {
    setLoading(true);
    try {
      const data = await talentService.getTalentById(Number(id));
      setTalent(data);
    } catch (error) {
      console.error('Failed to fetch talent details', error);
      alert('Failed to fetch talent details');
      navigate('/talents');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this talent?')) {
      try {
        await talentService.deleteTalent(Number(id));
        alert('Talent deleted successfully');
        navigate('/talents');
      } catch (error) {
        console.error('Failed to delete talent', error);
        alert('Failed to delete talent');
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-5 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!talent) {
    return (
      <div className="max-w-4xl mx-auto py-5 px-4">
        <div className="text-center">Talent not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-5 px-4">
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {talent.firstName} {talent.lastName}
          </h1>
          <p className="text-gray-600">
            {talent.currentPosition || 'No current position'}
          </p>
        </div>
        <div className="flex space-x-3 mt-2 sm:mt-0">
          <button
            onClick={() => navigate('/talents')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to List
          </button>
          <button
            onClick={() => navigate(`/talents/edit/${id}`)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow overflow-hidden rounded-lg p-4">
          <div className="font-medium text-gray-500">Email</div>
          <div className="mt-1 text-gray-900">{talent.email}</div>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg p-4">
          <div className="font-medium text-gray-500">Phone</div>
          <div className="mt-1 text-gray-900">{talent.phone || '-'}</div>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg p-4">
          <div className="font-medium text-gray-500">Location</div>
          <div className="mt-1 text-gray-900">{talent.location || '-'}</div>
        </div>
      </div>

      <div className="space-y-6 divide-y divide-gray-200">
        <div className="pt-6">
          <h2 className="text-lg font-medium mb-3">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-sm font-medium text-gray-700">Current Position:</span>
              <span className="block mt-1">{talent.currentPosition || '-'}</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">Desired Position:</span>
              <span className="block mt-1">{talent.desiredPosition || '-'}</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">Salary Expectation:</span>
              <span className="block mt-1">
                {talent.salaryExpectation
                  ? `$${talent.salaryExpectation.toLocaleString()}`
                  : '-'}
              </span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">Availability:</span>
              <span className="block mt-1">{talent.availability || '-'}</span>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h2 className="text-lg font-medium mb-3">Skills</h2>
          <div>
            {talent.skills ? (
              <div className="flex flex-wrap gap-2">
                {talent.skills.split(',').map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            ) : (
              <p>No skills listed</p>
            )}
          </div>
        </div>

        <div className="pt-6">
          <h2 className="text-lg font-medium mb-3">Experience</h2>
          <div className="whitespace-pre-wrap">{talent.experience || 'No experience information provided'}</div>
        </div>

        <div className="pt-6">
          <h2 className="text-lg font-medium mb-3">Education</h2>
          <div className="whitespace-pre-wrap">{talent.education || 'No education information provided'}</div>
        </div>

        <div className="pt-6">
          <h2 className="text-lg font-medium mb-3">Online Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-sm font-medium text-gray-700">LinkedIn:</span>
              {talent.linkedinUrl ? (
                <a 
                  href={talent.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-1 text-blue-600 hover:text-blue-800"
                >
                  View Profile
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="block mt-1">-</span>
              )}
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">GitHub:</span>
              {talent.githubUrl ? (
                <a 
                  href={talent.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-1 text-blue-600 hover:text-blue-800"
                >
                  View Profile
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="block mt-1">-</span>
              )}
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">Portfolio:</span>
              {talent.portfolioUrl ? (
                <a 
                  href={talent.portfolioUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-1 text-blue-600 hover:text-blue-800"
                >
                  View Portfolio
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="block mt-1">-</span>
              )}
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">Resume:</span>
              {talent.resumeUrl ? (
                <a 
                  href={talent.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block mt-1 text-blue-600 hover:text-blue-800"
                >
                  View Resume
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="block mt-1">-</span>
              )}
            </div>
          </div>
        </div>

        {talent.notes && (
          <div className="pt-6">
            <h2 className="text-lg font-medium mb-3">Notes</h2>
            <div className="whitespace-pre-wrap">{talent.notes}</div>
          </div>
        )}

        <div className="pt-6">
          <h2 className="text-lg font-medium mb-3">Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="block text-sm font-medium text-gray-700">Created At:</span>
              <span className="block mt-1">{formatDate(talent.createdAt)}</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-gray-700">Last Updated:</span>
              <span className="block mt-1">{formatDate(talent.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentDetail;
