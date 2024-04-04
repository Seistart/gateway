import { Hero } from "@/components/home"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Ui/Hero",
  component: Hero,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof Hero>

export const Default: Story = {}
