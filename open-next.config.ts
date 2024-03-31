const config = {
  default: {
    override: {
      wrapper: "aws-lambda-streaming",
    },
  },
}

export default config
export type Config = typeof config
