import { Meta } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: 'Tagのコンポーネント',
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    name: 'Default Tag',
  },
  parameters: {
    docs: {
      storyDescription: 'デフォルトの青色でテキストが表示されます',
    },
  },
};

export const SidebarTag = {
  args: {
    name: 'SideBar Tag',
    color: 'text-gray-600',
  },
  parameters: {
    docs: {
      storyDescription: 'SideBarの表示されるタグ色',
    },
  },
};
