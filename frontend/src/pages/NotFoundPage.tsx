import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-semibold text-gray-700">Page not found</h1>
      <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 text-amazon-orange hover:underline">Return to home</Link>
    </div>
  );
}
