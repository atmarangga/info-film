import React, { PureComponent } from "react";
import { Header, Button, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { makeSelectDetails } from "../../redux/selector";
import { clearDataSpecific } from "../../redux/actions/generalActions";

interface Props {
  returnFunction: Function;
  deleteDetails: Function;  
  movieDetails?: any;
}

class DetailPage extends PureComponent<Props> {
  constructor(props?: any) {
    super(props);
    this.prepareDetails = this.prepareDetails.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton(e?: any) {
    const { returnFunction, deleteDetails } = this.props;
    if (returnFunction) {
      deleteDetails();
      returnFunction();
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
      id: "-",
      title: "-",
      description: "-",
    };
  }

  render() {
    const { id, title, description } = this.prepareDetails();
    return (
      <>
        <Button primary onClick={this.handleBackButton}>
          Back
        </Button>
        {title && id && description && (
          <Card>
            <Card.Header>{title}</Card.Header>
            <Card.Content>
              <Card.Description>{description}</Card.Description>
              <Card.Meta>{id}</Card.Meta>
            </Card.Content>
          </Card>
        )}
      </>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    movieDetails: makeSelectDetails(state),
  };
}

function mapDispatchToProps(dispatch?: any) {
  return {
    deleteDetails: () => dispatch(clearDataSpecific("details")),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
