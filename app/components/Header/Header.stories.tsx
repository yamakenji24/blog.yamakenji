import type { ReactElement } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '.';

// Need Fixed: Remix Root need to be set for remix-run Link
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
