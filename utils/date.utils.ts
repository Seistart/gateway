import { format, subDays } from "date-fns"

export const getDate = (sub: number = 0) => {
  const dateXDaysAgo = subDays(new Date(), sub)
  return format(dateXDaysAgo, "dd/MM/yyyy")
}

export const getDateMonthYear = (date: Date) => {
  return format(date, "MM/yyyy")
}

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
}
