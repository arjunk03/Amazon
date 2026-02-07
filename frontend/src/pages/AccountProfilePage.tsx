import { useAuth } from '../context/AuthContext';

/**
 * GET /api/user/profile, PATCH /api/user/profile
 */
export function AccountProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-[600px] mx-auto p-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-gray-500 mt-2">Sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto p-6">
      <h1 className="text-2xl font-semibold">Your profile</h1>
      <div className="mt-4 space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}
