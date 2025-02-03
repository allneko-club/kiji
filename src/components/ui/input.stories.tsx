import { Input } from '@/components/ui/input'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof Input> = {
  title: 'Component/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof Input>

export const Primary: Story = {
  args: {
    placeholder: "Email",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const File: Story = {
  args: {
    type: "file",
  },
};
