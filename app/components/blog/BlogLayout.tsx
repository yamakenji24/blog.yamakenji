import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { BreadCrumb, DateLayout } from '../common';
import { ClassifyLayout } from './ClassifyLayout';

type Props = {
  category: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  children: React.ReactNode;
};

export const BlogLayout = ({ category, title, createdAt, updatedAt, tags, children }: Props) => {
  const { t, i18n } = useTranslation('index');
  const locale = i18n.language;
  // Fix: want lang to be changed before rendering
  //useChangeLanguage('ja')
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <div className="flex-col">
      <BreadCrumb
        to={'category/' + category}
        name={category}
        linkTitle={t('linkTitle')}
        locale={t('link')}
      />
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
