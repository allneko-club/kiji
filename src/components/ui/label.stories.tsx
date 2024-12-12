import { Label } from '@/components/ui/label'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof Label> = {
  title: 'Component/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof Label>

export const Primary: Story = {
  args: {
    children: "これはラベルです。",
  },
};
