import * as React from 'react';
import { Link } from 'remix';
import { Tag } from '~/components/common';

type Props = {
  categories: string[];
  tags: string[];
};

function SideBar({ categories, tags }: Props) {
  return (
    <div className="flex-col mx-2 w-1/5">
      <h3 className="font-bold rounded-md text-xl bg-green-100 p-1 my-2">Categories</h3>
      {categories.map((category) => (
        <Link key={category} to={'/category/' + category}>
          <p className="text-xs mx-2 p-1 hover:bg-green-100">{category}</p>
        </Link>
      ))}
      <h3 className="font-bold rounded-md text-xl bg-green-100 p-1 my-2">Tags</h3>
      {tags.map((tag) => (
        <div key={tag}>
          <Tag name={tag} color="text-gray-600" />
        </div>
      ))}
    </div>
  );
}

export { SideBar };
