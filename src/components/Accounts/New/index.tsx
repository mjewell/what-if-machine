import * as React from 'react';
import { Link } from '@reach/router';
import { TextField } from 'final-form-material-ui';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { css } from 'emotion';
import { withTheme, Theme } from '@material-ui/core';

type Props = {
  theme: Theme;
};

const AccountsNew = ({ theme }: Props) => (
  <div>
    <h1>Create an Account</h1>
    <Form
      onSubmit={x => alert(JSON.stringify(x))}
      validate={() => ({})}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="name" type="text" component={TextField} label="Name" />
          </div>

          <div>
            <Field
              name="interestRate"
              type="number"
              component={TextField}
              label="Interest Rate"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
            />
          </div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={css`
              margin-top: ${theme.spacing.unit}px;
            `}
          >
            Create Account
          </Button>
        </form>
      )}
    />
    <nav>
      <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
);

export default withTheme()(AccountsNew);
