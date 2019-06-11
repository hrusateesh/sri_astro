//@flow
import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import { Button, FormControl, FormControlLabel, Checkbox } from "@material-ui/core";
import { Grow, Paper, Popper, ClickAwayListener, SvgIcon } from "@material-ui/core";
import { Input, InputLabel, Typography, withStyles, Link } from "@material-ui/core";

import { userActions } from "Actions";

import type { Dispatch, User } from "../../../types";

const styles = (theme: any) => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    display: "flex",
    flexDirection: "column",
    alignItems: "left"
  },
  forgetpass: {
    marginTop: theme.spacing(2)
  }
});

type Props = {
  classes: any,
  dispatch: Dispatch,
  user: User,
  loggingIn: boolean,
  error: string,
  popup: boolean
};

type State = {
  username: string,
  password: string,
  remember_me: boolean,
  submitted: boolean,
  keepLogIn: boolean,
  forgetPass: boolean,
  submitBtnTxt: string,
  loggingIn: boolean,
  open: boolean
};

const initialState = {
  username: "",
  password: "",
  remember_me: false,
  submitted: false,
  keepLogIn: false,
  forgetPass: false,
  submitBtnTxt: "Login",
  loggingIn: false,
  open: false
};

class LoginPopper extends React.Component<Props, State> {
  anchorEl: any;
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  baseState = this.state;

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [target.name]: value });
  };

  handleSubmit = (e: SyntheticInputEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, remember_me, forgetPass } = this.state;
    const { dispatch } = this.props;
    let form = e.currentTarget;
    form.checkValidity();
    form.classList.add("was-validated");
    if (!forgetPass) {
      if (username && password) {
        dispatch(userActions.login(username, password, remember_me));
        this.setState(initialState);
        form.classList.remove("was-validated");
      }
    } else {
      if (username) {
        dispatch(userActions.forgetPass(username));
      }
    }
  };

  forgetPassword = () => {
    this.setState({
      forgetPass: true,
      submitBtnTxt: "Continue"
    });
  };

  handleToggle = () => {
    this.setState((state: State) => ({ open: !state.open }));
  };

  handleClose = (event: any) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    //this.setState({ open: false });
  };

  render() {
    // const { loggingIn, error, popup } = this.props;
    // const { username, password, remember_me, submitBtnTxt, submitted, forgetPass } = this.state;
    const { classes, error } = this.props;
    const { open, username, password, remember_me, submitted } = this.state;
    return (
      <>
        <Button
          variant="contained"
          size="small"
          color="secondary"
          className={classes.margin}
          buttonRef={(node: any) => {
            this.anchorEl = node;
          }}
          aria-owns={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          Login
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps }: any) => (
            <Grow {...TransitionProps} id="menu-list-grow" style={{ transformOrigin: "top" }}>
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <>
                    <Typography component="h2" variant="h5" gutterBottom>
                      Login via
                    </Typography>
                    <SocialLogin />
                    <Typography variant="h6">or</Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                          type="email"
                          id="username"
                          name="username"
                          value={username}
                          onChange={this.handleChange}
                          autoFocus
                        />
                        {submitted && !username && <div className="invalid-feedback">Email is required</div>}
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                        />
                        {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                        {error && <div className="invalid-feedback d-block font-weight-bold text-center">{error}</div>}
                      </FormControl>
                      <FormControlLabel
                        control={<Checkbox color="primary" value={remember_me} onChange={this.handleChange} />}
                        label="Remember me"
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Sign in
                      </Button>
                      <Link href="#" component="button" variant="body2" className={classes.forgetpass}>
                        Forget the password?
                      </Link>

                      <Typography variant="body2" color="primary" align="center">
                        Dont have account?{"  "}
                        <Link href="#" component="button" variant="body2">
                          Join us
                        </Link>
                      </Typography>
                    </form>
                  </>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  }
}

const socialStyles = (theme: any) => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    "&:hover": {
      backgroundColor: "currentColor",
      opacity: 0.9
    }
  },
  googleBtn: {
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      opacity: 0.9
    }
  },
  googleIcon: {
    paddingTop: theme.spacing(0.5)
  },
  fbBtn: {
    backgroundColor: "#385499",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#385499",
      opacity: 0.9
    }
  },
  twitterBtn: {
    backgroundColor: "#1da1f2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1da1f2",
      opacity: 0.9
    }
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    fill: "#fff"
  }
});

const SocialLogin = withStyles(socialStyles)((props: any) => {
  const { classes } = props;
  return (
    <div className="">
      <Button variant="contained" size="small" className={clsx(classes.button, classes.googleBtn)}>
        <SvgIcon className={classes.googleIcon} size="small">
          <g>
            <path
              d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
              fill="#4285F4"
            />
            <path
              d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"
              fill="#34A853"
            />
            <path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05" />
            <path
              d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"
              fill="#EA4335"
            />
          </g>
        </SvgIcon>
        Google
        <Typography variant="srOnly">Login with Google</Typography>
      </Button>
      <Button variant="contained" size="small" className={clsx(classes.button, classes.fbBtn)}>
        <SvgIcon className={classes.leftIcon} size="small">
          <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M18,5H15.5A3.5,3.5 0 0,0 12,8.5V11H10V14H12V21H15V14H18V11H15V9A1,1 0 0,1 16,8H18V5Z" />
        </SvgIcon>
        Facebook
        <Typography variant="srOnly">Login with Facebook</Typography>
      </Button>
      <Button variant="contained" size="small" className={clsx(classes.button, classes.twitterBtn)}>
        <SvgIcon className={classes.leftIcon} size="small">
          <path d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M17.71,9.33C18.19,8.93 18.75,8.45 19,7.92C18.59,8.13 18.1,8.26 17.56,8.33C18.06,7.97 18.47,7.5 18.68,6.86C18.16,7.14 17.63,7.38 16.97,7.5C15.42,5.63 11.71,7.15 12.37,9.95C9.76,9.79 8.17,8.61 6.85,7.16C6.1,8.38 6.75,10.23 7.64,10.74C7.18,10.71 6.83,10.57 6.5,10.41C6.54,11.95 7.39,12.69 8.58,13.09C8.22,13.16 7.82,13.18 7.44,13.12C7.81,14.19 8.58,14.86 9.9,15C9,15.76 7.34,16.29 6,16.08C7.15,16.81 8.46,17.39 10.28,17.31C14.69,17.11 17.64,13.95 17.71,9.33Z" />
        </SvgIcon>
        Twitter
        <Typography variant="srOnly">Login with Twitter</Typography>
      </Button>
    </div>
  );
});

type StoreState = {
  authentication: {
    loggingIn: boolean,
    error: string
  }
};

const mapStateToProps = (state: StoreState) => {
  const { loggingIn, error } = state.authentication;
  return {
    loggingIn,
    error
  };
};

export default connect(mapStateToProps)(withStyles(styles)(LoginPopper));
