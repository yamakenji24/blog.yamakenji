import { ComponentMeta } from '@storybook/react';
import { DateLayout } from './DateLayout';

export default {
  title: 'components/DateLayout',
  component: DateLayout,
  parameters: {
    docs: {
      description: {
        component: 'DateLayoutのコンポーネント',
      },
    },
  },
} as ComponentMeta<typeof DateLayout>;

export const Default = {
  args: {
    createdAt: '2022/01/01',
  },
  parameters: {
    docs: {
      storyDescription: '新規投稿時の日付が表示されます',
    },
  },
};

export const UpdatedDateLayout = {
  args: {
    createdAt: '2022/01/01',
    updatedAt: '2022/06/01',
  },
  parameters: {
    docs: {
      storyDescription: '投稿済みの記事に対して、更新を行った時の日付も表示されます',
    },
  },
};
