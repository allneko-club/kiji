import { Textarea } from '@/components/ui/textarea'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof Textarea> = {
  title: 'Component/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Primary: Story = {
  args: {
    placeholder: "Type your message here.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
