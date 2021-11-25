import * as React from 'react';
import { FaTag } from 'react-icons/fa';

type Props = {
  name: string;
};

function Tag({ name }: Props) {
  return (
    <div className="flex m-1 text-blue-500">
      <div className="m-1">
        <FaTag size="14px" color="#2563EB" />
      </div>
      <p>{name}</p>
    </div>
  );
}

export { Tag };
