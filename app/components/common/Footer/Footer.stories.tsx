import { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../Footer';

const meta: Meta<typeof Footer> = {
  title: 'components/Footer',
  component: Footer,
  parameters: {
    docs: {
      description: {
        component: 'Footerのコンポーネント',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;
