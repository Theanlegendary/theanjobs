import { useState } from 'react';
import { User, Mail, MapPin, Briefcase, Edit2, Save, Camera, Link as LinkIcon } from 'lucide-react';
import { useAuth, useUpdateProfile } from '@/hooks/useAuth';
import { SEO } from '@/lib/seo';

export default function UserProfile() {
  const { user } = useAuth();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.profile?.title || '',
    location: user?.profile?.location || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    experience: user?.profile?.experience || '',
  });

  const handleSave = () => {
    updateProfile({
      title: formData.title,
      location: formData.location,
      bio: formData.bio,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      experience: formData.experience,
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="My Profile"
        description="Manage your Sandbox profile and career preferences"
        noindex={true}
      />

      <div className="container max-w-4xl mx-auto px-4">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <Camera size={16} />
                </button>
              </div>

              {/* Basic Info */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Edit/Save Button */}
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isEditing ? (
                <>
                  <Save size={18} />
                  {isPending ? 'Saving...' : 'Save Changes'}
                </>
              ) : (
                <>
                  <Edit2 size={18} />
                  Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Profile Fields */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Briefcase size={16} className="inline mr-1" />
                Professional Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. Senior Software Engineer"
                />
              ) : (
                <p className="text-gray-900">{formData.title || 'Not specified'}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin size={16} className="inline mr-1" />
                Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. San Francisco, CA"
                />
              ) : (
                <p className="text-gray-900">{formData.location || 'Not specified'}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Me
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-900">{formData.bio || 'No bio added yet'}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma separated)
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. React, TypeScript, Node.js"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills ? (
                    formData.skills.split(',').map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills added yet</p>
                  )}
                </div>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. 5+ years"
                />
              ) : (
                <p className="text-gray-900">{formData.experience || 'Not specified'}</p>
              )}
            </div>
          </div>
        </div>

        {/* Account Settings Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
          
          <div className="space-y-4">
            {/* Email Verification */}
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">Email Verification</p>
                <p className="text-sm text-gray-600">
                  {user.emailVerified ? 'Your email is verified' : 'Please verify your email'}
                </p>
              </div>
              {!user.emailVerified && (
                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Verify Email
                </button>
              )}
            </div>

            {/* Change Password */}
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-600">Change your password</p>
              </div>
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Change Password
              </button>
            </div>

            {/* Delete Account */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Delete Account</p>
                <p className="text-sm text-gray-600">Permanently delete your account and data</p>
              </div>
              <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
