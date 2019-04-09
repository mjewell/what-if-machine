import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Form, Field } from 'react-final-form';
import { withTheme, Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { css } from 'emotion';

type Props = {
  theme: Theme;
} & RouteComponentProps;

const AccountsNew = ({ theme }: Props) => (
  <Paper
    className={css`
      padding: ${theme.spacing.unit * 2}px;
    `}
  >
    <Typography variant="h4" align="center">
      Create an Account
    </Typography>
    <Form
      onSubmit={x => alert(JSON.stringify(x))}
      validate={() => ({})}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Field name="name">
                {({ input }) => (
                  <TextField
                    type="text"
                    label="Name"
                    required
                    fullWidth
                    {...input}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="interestRate">
                {({ input }) => (
                  <TextField
                    inputProps={{
                      min: 0,
                      step: 0.01
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      )
                    }}
                    type="number"
                    label="Interest Rate"
                    fullWidth
                    {...input}
                  />
                )}
              </Field>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={css`
                margin-top: ${theme.spacing.unit * 2}px;
              `}
            >
              Create Account
            </Button>
          </Grid>
        </form>
      )}
    />
  </Paper>
);

export default withTheme()(AccountsNew);
