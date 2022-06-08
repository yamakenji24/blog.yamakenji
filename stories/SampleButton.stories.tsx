import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SampleButton } from './SampleButton';

export default {
  title: 'Sample/Button',
  component: SampleButton,
  parameters: {
    docs: {
      description: {
        component: 'Storybookのサンプルコンポーネント'
      }
    }
  }
} as ComponentMeta<typeof SampleButton>;

export const Template: ComponentStory<typeof SampleButton> = () => <SampleButton />;