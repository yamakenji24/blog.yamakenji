import * as React from 'react';
import { FaGithub } from 'react-icons/fa';

const GITHUB_URL = 'https://github.com/yamakenji24/blog.yamakenji';

function Footer() {
  const year = React.useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="mx-auto bg-green-600 text-white p-2">
      <div className="flex justify-center space-x-4">
        <p>&copy; {year} yamakenji24, All rights reserved.</p>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <FaGithub fontSize="24px" />
        </a>
      </div>
    </footer>
  );
}

export { Footer };
