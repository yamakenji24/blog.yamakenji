import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Footer } from '../Footer';

export default {
  title: 'components/Footer',
  component: Footer,
  parameters: {
    docs: {
      description: {
        component: 'Footerのコンポーネント',
      },
    },
  },
} as ComponentMeta<typeof Footer>;

export const Template: ComponentStory<typeof Footer> = () => <Footer />;
