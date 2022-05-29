import React, { ReactNode } from 'react';

type StateType = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  Record<string, unknown>,
  StateType
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // You can also log the error to an error reporting service
    console.log(error);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return children as ReactNode;
  }
}

export default ErrorBoundary;
