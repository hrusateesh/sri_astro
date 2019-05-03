import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './PasswordStrengthMeter.scss';

type Props = {
  password: string,
  onAccess: number => void
};

function PasswordStrengthMeter(props: Props) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    assessPassStrength();
  });

  async function assessPassStrength() {
    const strength = await import('zxcvbn').then((zxcvbn: any) => {
      return zxcvbn.default(props.password);
    });
    setScore(strength.score);
    if (props.onAccess) props.onAccess(strength.score);
  }

  function passStrengthLabel() {
    switch (score) {
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
  }

  return !props.password ? null : (
    <div>
      <div className='progress pl-1 mt-2'>
        <div
          className={`progress-bar strength-${passStrengthLabel()}`}
          role='progressbar'
          style={{ width: score * 25 + '%' }}
          aria-valuenow={score}
          aria-valuemin='0'
          aria-valuemax='4'
        />
      </div>
      <label>
        <small>
          <strong>Password strength:</strong> {passStrengthLabel()}
        </small>
      </label>
    </div>
  );
}
export default connect()(PasswordStrengthMeter);
// export { connect()(PasswordStrengthMeter) as PasswordStrengthMeter };
