import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import { Button, Drawer, AppBar, Toolbar, List, Typography } from "@material-ui/core";
import { CssBaseline, Divider, IconButton, Badge } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";

import type { Dispatch, User } from "../types";

import { mainListItems, secondaryListItems } from "./listItems";
import { LoginPopper } from "./pages/user";
import { ContactUs } from "./pages/modals";

import { history } from "Helpers";
import { Home, SignUp, SignUpSuccess } from "../components";
import { ConsentBanner, CookiePolicy, PrivacyPolicy, TermsOfService } from "../components";

import { userActions } from "Actions";

const NotFound = React.lazy(() => import(/* webpackChunkName: "notFound" */ "../components/pages/NotFound"));

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto"
  },
  chartContainer: {
    marginLeft: -22
  },
  tableContainer: {
    height: 320
  },
  h5: {
    marginBottom: theme.spacing(2)
  }
});

type Props = {
  classes: any,
  dispatch: Dispatch,
  user: User
};

type State = {
  open: boolean,
  authentication: {
    user: User
  }
};

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: true,
      authentication: {}
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogoutUser = () => this.props.dispatch(userActions.logout());

  render() {
    const { classes, user } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <ConsentBanner />
        <AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            {user && (
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
            <ContactUs />
            {user && (
              <Button variant="contained" size="small" color="secondary" onClick={this.handleLogoutUser}>
                <PersonIcon />
                {user.firstName}! Logout
              </Button>
            )}
            {!user && <LoginPopper />}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        <Router history={history}>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <React.Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signupSuccess" component={SignUpSuccess} />
                <Route path="/legal/cookie-policy" component={CookiePolicy} />
                <Route path="/legal/privacy-policy" component={PrivacyPolicy} />
                <Route path="/legal/terms-of-service" component={TermsOfService} />
                <Route component={NotFound} />
              </Switch>
            </React.Suspense>
          </main>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
