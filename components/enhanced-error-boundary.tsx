"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bug } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    /* TODO: hook into logging / Supabase */
    // eslint-disable-next-line no-console
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    const { hasError } = this.state
    const { fallback, children } = this.props
    if (hasError) {
      return (
        fallback ?? (
          <Alert variant="destructive" className="my-4">
            <Bug className="h-4 w-4" />
            <AlertTitle className="ml-2">Something went wrong</AlertTitle>
            <AlertDescription className="mt-2 text-sm">{this.state.error?.message ?? "Unknown error"}</AlertDescription>
          </Alert>
        )
      )
    }
    return children
  }
}
