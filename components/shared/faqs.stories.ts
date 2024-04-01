import type { Meta, StoryObj } from "@storybook/react"
import Faqs from "./Faqs"

const meta = {
  title: "Ui/Faqs",
  component: Faqs,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Faqs>

export default meta
type Story = StoryObj<typeof Faqs>

export const Default: Story = {}
