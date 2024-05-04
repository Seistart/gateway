import { Button } from "@/components/ui/button"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Ui/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Load more",
    variant: "default",
  },
}

export const Secondary: Story = {
  args: {
    children: "Hello",
    variant: "secondary",
  },
}

export const Destructive: Story = {
  args: {
    children: "Hello",
    variant: "destructive",
  },
}

export const Outline: Story = {
  args: {
    children: "Hello",
    variant: "outline",
  },
}
