import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withTheme, Theme } from '@material-ui/core';
import { css } from 'emotion';
import Router from '../Router';

type Props = {
  theme: Theme;
};

const Layout = ({ theme }: Props) => (
  <React.Fragment>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          What-if Machine
        </Typography>
      </Toolbar>
    </AppBar>
    <main
      className={css`
        margin: ${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px;
        ${theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)} {
          width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
      `}
    >
      <Router />
    </main>
  </React.Fragment>
);

export default withTheme()(Layout);
