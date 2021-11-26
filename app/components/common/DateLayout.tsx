import * as React from 'react';
import { BiTime } from 'react-icons/bi';

function DateLayout({ date }: { date: string }) {
  return (
    <div className="flex my-1">
      <BiTime />
      <p className="text-xs mx-1">{date}</p>
    </div>
  );
}

export { DateLayout };
