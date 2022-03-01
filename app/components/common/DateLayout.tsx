import { BiTime } from 'react-icons/bi';
import { MdUpdate } from 'react-icons/md';

function DateLayout({ createdAt, updatedAt }: { createdAt: string; updatedAt?: string }) {
  return (
    <div className="flex my-1">
      <BiTime />
      <p className="text-xs mx-1">{createdAt}</p>
      <MdUpdate />
      <p className="text-xs mx-1">{updatedAt}</p>
    </div>
  );
}

export { DateLayout };
