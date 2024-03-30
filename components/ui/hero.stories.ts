import type { Meta, StoryObj } from "@storybook/react"
import Hero from "./Hero"

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
