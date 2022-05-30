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

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children as ReactNode;
  }
}

export default ErrorBoundary;
