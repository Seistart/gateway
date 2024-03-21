"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary"

// Error Fallback Component
const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div className="flex h-[calc(100vh-90px)] flex-col items-center justify-center">
    <h2 className="text-center">Something went wrong!</h2>
    <pre>{error.message}</pre>
    <Button onClick={resetErrorBoundary}>Try Again</Button>
  </div>
)

// Type for children props
interface Props {
  children: React.ReactNode
}

// ErrorBoundary Component
const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary
