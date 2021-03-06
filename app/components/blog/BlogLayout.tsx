import { useLocale } from '~/hooks';
import { BreadCrumb, DateLayout } from '../common';
import { ClassifyLayout } from './ClassifyLayout';

type Props = {
  category: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  locale: 'en' | 'ja';
  children: React.ReactNode;
};

export const BlogLayout = ({
  category,
  title,
  createdAt,
  updatedAt,
  tags,
  locale,
  children,
}: Props) => {
  const { linkTitle, link } = useLocale(locale);

  return (
    <div className="flex-col">
      <BreadCrumb to={'category/' + category} name={category} linkTitle={linkTitle} locale={link} />
      <div className="md:flex">
        <div className="w-full md:pl-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <DateLayout createdAt={createdAt} updatedAt={updatedAt} />
          <ClassifyLayout category={category} tags={tags} />
          <div className="prose prose-blue">{children}</div>
        </div>
      </div>
    </div>
  );
};
