import React, { PureComponent } from "react";
import { Header, Button, Container, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { MOVIE_DETAIL_REQUEST } from "../../helpers/request";
import {
  makeSelectDetails,
  makeSelectError,
  makeSelectRequestProcess,
} from "../../redux/selector";
import {
  clearDataSpecific,
  removeError,
} from "../../redux/actions/generalActions";
import ErrorComponent from "../../components/Oops";
import LoaderComponent from "../../components/Loading";
import { checkRequest } from "../../helpers/utils";

interface Props {
  returnFunction: Function;
  deleteDetails: Function;
  movieDetails?: any;
  removeError?: Function;
  isError?: any;
  processPool?: Array<string> | any;
}

class DetailPage extends PureComponent<Props> {
  constructor(props?: any) {
    super(props);
    this.prepareDetails = this.prepareDetails.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton(e?: any) {
    const { returnFunction, deleteDetails, removeError } = this.props;
    if (returnFunction && removeError) {
      deleteDetails();
      returnFunction();
      removeError();
    }
  }

  prepareDetails() {
    const { movieDetails } = this.props;
    if (movieDetails) {
      const dataJson = movieDetails.toJS();
      const id = `Movie ID - ${dataJson && dataJson.id}`;
      const title = dataJson && dataJson.name;
      const description = dataJson && dataJson.description;
      return {
        id,
        title,
        description,
      };
    }
    return {
      // id: "-",
      // title: "-",
      // description: "-",
    };
  }

  render() {
    const { id, title, description } = this.prepareDetails();
    const { isError, processPool } = this.props;
    return (
      <>
        <Button
          icon
          labelPosition="left"
          primary
          onClick={this.handleBackButton}
        >
          <Icon name="angle double left" />
          Back
        </Button>
        {checkRequest(processPool, MOVIE_DETAIL_REQUEST) && <LoaderComponent />}
        {isError && <ErrorComponent />}
        {title && id && description && (
          <Container textAlign="justified">
            <Header as="h2">
              {title}
              <Header.Subheader>{id}</Header.Subheader>
            </Header>
            <Container textAlign="justified">{description}</Container>
          </Container>
        )}
      </>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    movieDetails: makeSelectDetails(state),
    processPool: makeSelectRequestProcess(state),
    isError: makeSelectError(state),
  };
}

function mapDispatchToProps(dispatch?: any) {
  return {
    deleteDetails: () => dispatch(clearDataSpecific("details")),
    removeError: () => dispatch(removeError()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
