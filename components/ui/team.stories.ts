import type { Meta, StoryObj } from "@storybook/react"
import Team from "./Team"

const meta = {
  title: "Ui/Team",
  component: Team,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Team>

export default meta
type Story = StoryObj<typeof Team>

export const Default: Story = {}
