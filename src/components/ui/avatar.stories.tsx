import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Avatar> = {
  title: 'Component/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {}
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Primary: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/vercel.svg" alt="@shadcn" />
    </Avatar>
  )
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>KI</AvatarFallback>
    </Avatar>
  )
};
