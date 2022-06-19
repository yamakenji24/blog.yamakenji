import { FaTag } from 'react-icons/fa';

type Props = {
  name: string;
  color?: string;
};

function Tag({ name, color = 'text-blue-500' }: Props) {
  return (
    <div className={`flex m-1 ${color} hover:bg-green-100`}>
      <div className={'m-1 ' + color}>
        <FaTag size="14px" />
      </div>
      <p>{name}</p>
    </div>
  );
}

export { Tag };
