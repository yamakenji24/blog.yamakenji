import { ComponentMeta } from '@storybook/react';
import { Tag } from './Tag';

export default {
  title: 'components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: 'Tagのコンポーネント',
      },
    },
  },
} as ComponentMeta<typeof Tag>;

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
