import { Link } from 'react-router-dom';

/**
 * POST /api/auth/forgot-password
 * Body: { email }
 * Response: { message: string }
 */
export function ForgotPasswordPage() {
  return (
    <div className="max-w-[400px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Forgot password</h1>
      <p className="text-gray-500 text-sm">POST /api/auth/forgot-password { '{ email }' } → { '{ message }' }</p>
      <Link to="/login" className="block mt-4 text-amazon-orange hover:underline">Back to Sign in</Link>
    </div>
  );
}
