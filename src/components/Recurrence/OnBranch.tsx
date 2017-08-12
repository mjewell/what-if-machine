import * as React from 'react';

import DatePicker from '../DatePicker';

export default class OnBranch extends React.Component<{}, {}> {
  render() {
    return <DatePicker {...this.props} />;
  }
}
