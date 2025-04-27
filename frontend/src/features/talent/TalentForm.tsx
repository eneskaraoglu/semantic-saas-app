import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Talent, talentService } from '../../services/talentService';
import { useAuth } from '../../hooks/useAuth';

interface FormErrors {
  [key: string]: string;
}

const TalentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const [talent, setTalent] = useState<Talent>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    education: '',
    location: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    resumeUrl: '',
    currentPosition: '',
    desiredPosition: '',
    salaryExpectation: undefined,
    availability: '',
    notes: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.roles?.some(role => role === 'ADMIN' || role === 'ROLE_ADMIN');

  useEffect(() => {
    if (!isAdmin) {
      alert('You do not have permission to access this page');
      navigate('/dashboard');
      return;
    }

    if (isEditMode) {
      fetchTalent();
    }
  }, [id, isAdmin, navigate, isEditMode]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTalent(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value === '' ? undefined : Number(value);
    setTalent(prev => ({ ...prev, [name]: numberValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!talent.firstName) {
      newErrors.firstName = 'First name is required';
    }

    if (!talent.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!talent.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(talent.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fix the errors in the form');
      return;
    }

    setSubmitLoading(true);
    try {
      if (isEditMode) {
        await talentService.updateTalent(Number(id), talent);
        alert('Talent updated successfully');
      } else {
        await talentService.createTalent(talent);
        alert('Talent created successfully');
      }
      navigate('/talents');
    } catch (error) {
      console.error(`Failed to ${isEditMode ? 'update' : 'create'} talent`, error);
      alert(`Failed to ${isEditMode ? 'update' : 'create'} talent`);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-5 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-5 px-4">
      <h1 className="text-2xl font-bold mb-5">{isEditMode ? 'Edit Talent' : 'Add New Talent'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                value={talent.firstName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  errors.firstName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } shadow-sm sm:text-sm`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                value={talent.lastName}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  errors.lastName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } shadow-sm sm:text-sm`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={talent.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } shadow-sm sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={talent.phone || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <hr className="my-4" />
          <h2 className="text-lg font-medium">Professional Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="currentPosition">
                Current Position
              </label>
              <input
                id="currentPosition"
                name="currentPosition"
                value={talent.currentPosition || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="desiredPosition">
                Desired Position
              </label>
              <input
                id="desiredPosition"
                name="desiredPosition"
                value={talent.desiredPosition || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                value={talent.location || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="salaryExpectation">
                Salary Expectation
              </label>
              <input
                id="salaryExpectation"
                name="salaryExpectation"
                type="number"
                min="0"
                value={talent.salaryExpectation || ''}
                onChange={handleNumberChange}
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Annual salary in USD</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="availability">
              Availability
            </label>
            <input
              id="availability"
              name="availability"
              value={talent.availability || ''}
              onChange={handleChange}
              placeholder="e.g., Immediate, 2 weeks notice, etc."
              className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="skills">
              Skills
            </label>
            <textarea
              id="skills"
              name="skills"
              value={talent.skills || ''}
              onChange={handleChange}
              placeholder="Separate skills with commas"
              rows={3}
              className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="experience">
              Experience
            </label>
            <textarea
              id="experience"
              name="experience"
              value={talent.experience || ''}
              onChange={handleChange}
              rows={5}
              className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="education">
              Education
            </label>
            <textarea
              id="education"
              name="education"
              value={talent.education || ''}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <hr className="my-4" />
          <h2 className="text-lg font-medium">Online Profiles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="linkedinUrl">
                LinkedIn URL
              </label>
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                value={talent.linkedinUrl || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="githubUrl">
                GitHub URL
              </label>
              <input
                id="githubUrl"
                name="githubUrl"
                value={talent.githubUrl || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="portfolioUrl">
                Portfolio URL
              </label>
              <input
                id="portfolioUrl"
                name="portfolioUrl"
                value={talent.portfolioUrl || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="resumeUrl">
                Resume URL
              </label>
              <input
                id="resumeUrl"
                name="resumeUrl"
                value={talent.resumeUrl || ''}
                onChange={handleChange}
                placeholder="Link to hosted resume document"
                className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={talent.notes || ''}
              onChange={handleChange}
              placeholder="Additional notes about the talent"
              rows={4}
              className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm sm:text-sm"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button 
              type="button"
              onClick={() => navigate('/talents')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <span>Processing...</span>
              ) : (
                <span>{isEditMode ? 'Update' : 'Create'} Talent</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TalentForm;
