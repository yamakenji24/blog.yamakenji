import * as React from 'react';
import { Tag, LinkLayout } from '~/components/common';

type Props = {
  categories: string[];
  tags: string[];
};

function SideBar({ categories, tags }: Props) {
  return (
    <div className="flex-col mx-2 w-full md:w-1/5 ">
      <h3 className="font-bold rounded-md text-xl bg-green-100 p-1 my-2">Categories</h3>
      {categories.map((category) => (
        <LinkLayout key={category} to={'/category/' + category} prefetch="intent">
          <p className="text-sm mx-2 p-1 hover:bg-green-100">{category}</p>
        </LinkLayout>
      ))}
      <h3 className="font-bold rounded-md text-xl bg-green-100 p-1 my-2">Tags</h3>
      {tags.map((tag) => (
        <LinkLayout key={tag} to={'/tag/' + tag} prefetch="intent">
          <Tag name={tag} color="text-gray-600" />
        </LinkLayout>
      ))}
    </div>
  );
}

export { SideBar };
