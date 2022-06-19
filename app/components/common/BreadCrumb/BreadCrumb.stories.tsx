import type { ReactElement } from 'react';
import { ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { BreadCrumb } from './BreadCrumb';

// Need Fixed: Remix Root need to be set for remix-run Link
const decorator = (Story: () => ReactElement): ReactElement => {
  return <BrowserRouter>{Story()}</BrowserRouter>;
};

export default {
  title: 'components/BreadCrumb',
  component: BreadCrumb,
  decorators: [decorator],
  parameters: {
    docs: {
      description: {
        component: 'BreadCrumbのコンポーネント',
      },
    },
  },
} as ComponentMeta<typeof BreadCrumb>;

export const Default = {
  args: {
    linkTitle: 'タイトル',
    locale: 'ja',
  },
  parameters: {
    docs: {
      storyDescription: 'タイトルとlocaleのみの場合',
    },
  },
};

export const ToCategory = {
  args: {
    linkTitle: 'カテゴリー',
    locale: 'ja',
    to: 'category/',
    name: 'サンプル',
  },
  parameters: {
    docs: {
      storyDescription: 'Categoryの場合',
    },
  },
};

export const ToTag = {
  args: {
    linkTitle: 'タグ',
    locale: 'ja',
    to: 'tag/',
    name: 'サンプル',
  },
  parameters: {
    docs: {
      storyDescription: 'Tagの場合',
    },
  },
};
