import { Card, CardContent, CardDescription, CardFooter, CardHeader,CardTitle } from '@/components/ui/card'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof Card> = {
  title: 'Component/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof Card>

export const Primary: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description.</CardDescription>
    </CardHeader>
    <CardContent>
      <p>This is a card content.</p>
      <p>This is a card content.</p>
    </CardContent>
    <CardFooter>
      This is a CardFooter.
    </CardFooter>
  </Card>
  ),
};
