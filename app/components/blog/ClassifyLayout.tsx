import { LinkLayout, Tag } from '~/components/common';

type Props = {
  category: string;
  tags: string[];
};

function ClassifyLayout({ category, tags }: Props) {
  return (
    <div className="flex flex-wrap">
      <LinkLayout to={'/category/' + category} prefetch="render">
        <p className="text-xs inline-flex items-center font-bold leading-sm p-1 m-1 border border-blue-500 text-blue-600 rounded-md">
          {category}
        </p>
      </LinkLayout>

      {tags.map((tag) => (
        <LinkLayout key={tag} to={'/tag/' + tag} prefetch="render">
          <Tag name={tag} />
        </LinkLayout>
      ))}
    </div>
  );
}

export { ClassifyLayout };
