import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Row, Col, Label, Input, Button as ButtonReactStrap } from 'reactstrap';
// import ClientService from './Client.service';
// import PaginationButtonFactory from '../common/pagination/PaginationButtonFactory';
// import Pagination from '../common/pagination/Pagination';
// import DateField from '../common/DateField';
// import { formatClientName } from './Client.helper';
// import { isoToLocalDate } from '../../util/dateHelper';
// import { LoadingState } from '../../util/loadingHelper';
// import { isEnterKeyPressed } from '../../util/events';
// import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
// import DataGrid from '@cwds/components/lib/DataGrid';
import PersonSearchForm from './PersonSearchForm';

// import './style.sass';

// const calculatePages = (recordsCount, pageSize) => Math.ceil(recordsCount / pageSize);

// const initialFilterState = {
//   firstName: '',
//   middleName: '',
//   lastName: '',
//   dob: '',
// };

class SearchContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  renderAccessRestrictions = client =>
    client.sensitivity_type === 'SENSITIVE' ? 'Sensitive' : client.sensitivity_type === 'SEALED' ? 'Sealed' : null;

  renderPersonSearchForm() {
    return (
      <PersonSearchForm
        searchPrompt="Search CWS-CMS for clients only"
        // isClientOnly={false}
        // onSelect={person => this.onSelectPerson(person)}
      />
    );
  }

  render = () => {
    return (
      <Card className={'card'}>
        <CardHeader className={'card-header-cans card-header-cans-client-search'} title="CANS Client Search" />
        <div className={'content'}>
          <CardContent>{this.renderPersonSearchForm()}</CardContent>
        </div>
      </Card>
    );
  };
}

export default SearchContainer;
