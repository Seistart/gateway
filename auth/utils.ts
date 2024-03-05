import {
  UsernameAndPassword,
  authenticationSchema,
} from "@/database/schemas/auth.schema"

export const genericError = { error: "Error, please try again." }

const getErrorMessage = (errors: any): string => {
  if (errors.email) return "Invalid Email"
  if (errors.password) return "Invalid Password - " + errors.password[0]
  return ""
}

export const validateAuthFormData = (
  formData: FormData
):
  | { data: UsernameAndPassword; error: null }
  | { data: null; error: string } => {
  const email = formData.get("email")
  const password = formData.get("password")
  const result = authenticationSchema.safeParse({ email, password })

  if (!result.success) {
    return {
      data: null,
      error: getErrorMessage(result.error.flatten().fieldErrors),
    }
  }

  return { data: result.data, error: null }
}
