import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { makeSelectError } from "../../redux/selector";
interface Props {
  errorData?: any;
}

class Oops extends PureComponent<Props> {
  render() {
    const { errorData } = this.props;
    return (
      <Container textAlign="justified">
        <div style={styles.title}>Ooops !</div>
        <div style={styles.info}>
          There seems to be an error while retrieving the data from our
          servers....
        </div>
        <div style={styles.description}>
            {errorData && errorData.title} : 
            {errorData && errorData.message}
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    errorData: makeSelectError(state),
  };
}

export default connect(mapStateToProps)(Oops);

const styles = {
  title: {
    padding: 10,
    fontSize: 60,
    color: "#9f3a38",
    margin: 10,
  },
  info: {
    padding: 10,
    fontSize: 25,
    margin: 10,
  },
  description: {
    fontSize: 14,
    padding: 10,
    margin: 10,
    color: "2f2a2a",
  },
};
