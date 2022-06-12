import type { ReactElement } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '.';

const decorator = (Story: () => ReactElement): ReactElement => {
  return <BrowserRouter>{Story()}</BrowserRouter>;
};

export default {
  title: 'components/Header',
  component: Header,
  decorators: [decorator],
  parameters: {
    docs: {
      description: {
        component: 'Headerのコンポーネント',
      },
    },
  },
} as ComponentMeta<typeof Header>;

export const Template: ComponentStory<typeof Header> = () => <Header />;
