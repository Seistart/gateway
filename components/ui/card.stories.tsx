import type { Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta = {
  title: "Ui/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof Card>

const CardTemplate: Story = {
  render: () => (
    <>
      <CardHeader>
        <CardTitle>Name</CardTitle>
        <CardDescription>Lorum ipsum...</CardDescription>
      </CardHeader>
      <CardFooter>Text</CardFooter>
    </>
  ),
}

export const Default: Story = {
  ...CardTemplate,
}
