'use client';

import { useThemeContext } from '@/components/theme-provider';
import { cn } from '@/utils/cn';

const AboutPage = () => {
  const isThemeDark = useThemeContext();

  return (
    <div
      className={cn(
        'max-w-4xl mx-auto p-4 flex flex-col gap-4',
        isThemeDark ? 'text-emerald-400' : 'text-slate-900'
      )}
    >
      <h2 className="text-2xl">About:</h2>
      <div>
        <h3>Author</h3>
        <ul className="text-sm">
          <li>Name: Alexander Alexeichik</li>
          <li>
            Github:{' '}
            <a
              className="text-blue-500 hover:text-blue-600 underline"
              href="https://github.com/nexorqk"
            >
              link
            </a>
          </li>
        </ul>
      </div>
      <a
        href="https://rs.school/courses/reactjs"
        className="text-3xl underline text-blue-700 hover:text-blue-800"
      >
        RS School React Course
      </a>
    </div>
  );
};

export default AboutPage;
