import React from 'react';
import { connect } from 'react-redux';
import './NotFound.scss';

type Props = {
  history: any
};
class NotFound extends React.Component<Props> {
  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div id='notFoundBody'>
        <div className='bubble' />
        <div className='bubble' />
        <div className='bubble' />
        <div className='bubble' />
        <div className='bubble' />
        <div className='main'>
          <h1>404</h1>
          <p>
            It looks like you&apos;re lost...
            <br />
            That&apos;s a trouble?
          </p>
          <button type='button' onClick={this.handleClick}>
            Go back
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(NotFound);
