import React, { PureComponent } from "react";
import { Header, Button, Container, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { MOVIE_DETAIL_REQUEST } from "../../helpers/request";
import {
  makeSelectDetails,
  makeSelectError,
  makeSelectRequestProcess,
  makeSelectMovies,
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
  movies?: any;
  id?: string | number; 
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
    const { movies, id } = this.props;
    const idSearch = id;
   
    let results = {
      id: idSearch,
      name: '',
      description: ''
    };
    if (movies) {
      const dataJson = movies.toJS();
      for(let u = 0; u < dataJson.length; u += 1){
        if(dataJson[u].id === idSearch){
          results = dataJson[u];
          
          return results;
        }
      }
    }
    
    return {
      id,
      name: '',
      description: '',
    };
  }

  render() {
    const { id, name, description } = this.prepareDetails();
    const { processPool } = this.props;
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
        {name && id && description ? (
          <Container textAlign="justified">
            <Header as="h2">
              {name || ''}
              <Header.Subheader>Movie id - {id}</Header.Subheader>
            </Header>
            <Container textAlign="justified">{description || ''}</Container>
          </Container>
        ) : <ErrorComponent />}
      </>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    movies: makeSelectMovies(state),
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
