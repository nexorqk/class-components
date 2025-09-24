import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-2">
      <h2 className="font-bold text-5xl">Page Not Found</h2>
      <div className="text-2xl">
        <p className="decoration-wavy decoration-2 underline decoration-amber-300 italic">
          Change URL to proper or
        </p>
        <Link
          to="/pokemon/list/1"
          className="text-blue-500 hover:text-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};
