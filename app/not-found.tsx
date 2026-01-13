import Link from 'next/link';
import PageWrapper from '../components/layout/PageWrapper';

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-md text-center">
          <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}