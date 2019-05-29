import * as React from 'react';
interface Props { }

interface State { }

export class AddTodo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>AddTodo</div>
    )
  }
}