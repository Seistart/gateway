import type { Meta, StoryObj } from "@storybook/react"
import { Collaborators } from "."

const meta = {
  title: "Ui/Collaborators",
  component: Collaborators,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Collaborators>

export default meta
type Story = StoryObj<typeof Collaborators>

export const Default: Story = {}
