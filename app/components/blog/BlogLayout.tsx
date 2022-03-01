import { BreadCrumb, DateLayout } from '../common';
import { ClassifyLayout } from './ClassifyLayout';

type Props = {
  category: string;
  title: string;
  createdAt: string;
  tags: string[];
  children: React.ReactNode;
};

export const BlogLayout = ({ category, title, createdAt, tags, children }: Props) => {
  return (
    <div className="flex-col">
      <BreadCrumb to={'/category/' + category} name={category} />
      <div className="md:flex">
        <div className="w-full md:pl-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <DateLayout date={createdAt} />
          <ClassifyLayout category={category} tags={tags} />
          <div className="prose prose-blue">{children}</div>
        </div>
      </div>
    </div>
  );
};
