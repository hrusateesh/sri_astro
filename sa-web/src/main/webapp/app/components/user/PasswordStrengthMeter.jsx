import * as React from 'react';
import { connect } from 'react-redux';
import './PasswordStrengthMeter.scss';
import zxcvbn from 'zxcvbn';

type Props = {
  password: string,
  onAccess: number => void
};

class PasswordStrengthMeter extends React.Component<Props> {
  createPasswordLabel = result => {
    switch (result.score) {
      case 0:
        return 'Not Recommend';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Weak';
    }
  };

  render() {
    const { password, onAccess } = this.props;
    const strength = zxcvbn(password);
    onAccess(strength.score);
    return !password ? null : (
      <div>
        <div className='progress pl-1 mt-2'>
          <div
            className={`progress-bar strength-${this.createPasswordLabel(strength)}`}
            role='progressbar'
            style={{ width: strength.score * 25 + '%' }}
            aria-valuenow={strength.score}
            aria-valuemin='0'
            aria-valuemax='4'
          />
        </div>
        <label>
          <small>
            <strong>Password strength:</strong> {this.createPasswordLabel(strength)}
          </small>
        </label>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
const connectedPasswordStrengthMeter = connect(mapStateToProps)(PasswordStrengthMeter);
export { connectedPasswordStrengthMeter as PasswordStrengthMeter };
