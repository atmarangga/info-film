import React, { PureComponent } from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import { Button, Header } from "semantic-ui-react";
import { makeSelectToken, makeSelectMovies } from "../../redux/selector";
import {
  logoutActions,
  getMovieList,
  getMovieDetails,
} from "../../redux/actions/generalActions";
import ItemGroup from "../../components/ItemGroup";
import DetailPage from "../DetailPage";

interface Props {
  token?: string;
  logoutRequest?: Function;
  getMovieList?: Function;
  getDetails?: Function;
  movies?: List<any>;
}

interface State {
  showDetails: boolean;
}

class HomePage extends PureComponent<Props, State> {
  constructor(props?: any) {
    super(props);
    this.state = {
      showDetails: false,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.getMovieDetails = this.getMovieDetails.bind(this);
    this.retrieveMovieList = this.retrieveMovieList.bind(this);
    this.goBackToHomepage = this.goBackToHomepage.bind(this);
  }

  componentDidMount() {
    this.retrieveMovieList();
  }
  retrieveMovieList() {
    const { getMovieList } = this.props;
    if (getMovieList) {
      getMovieList();
    }
  }

  getMovieDetails(id?: string | number) {
    const { getDetails } = this.props;
    if (getDetails) {
      this.setState(
        {
          showDetails: true,
        },
        () => getDetails(id)
      );
    }
  }

  goBackToHomepage() {
    this.setState({
      showDetails: false,
    });
  }

  handleLogout() {
    const { logoutRequest } = this.props;
    if (logoutRequest) {
      logoutRequest();
    }
  }

  render() {
    const { movies } = this.props;
    const { showDetails } = this.state;
    const moviesArray = movies && movies.toJS();
    console.log("movies ??? ", moviesArray);
    return (
      <>
        <Header style={styles.header}>
          <Button onClick={this.handleLogout}>Logout</Button>
        </Header>

        <div style={styles.container}>
          {moviesArray && !showDetails && (
            <ItemGroup
              items={moviesArray}
              onClick={(data: any) => {
                console.log("data : ", data);
                this.getMovieDetails(data);
              }}
            />
          )}
          {showDetails && <DetailPage returnFunction={this.goBackToHomepage} />}
        </div>
      </>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    token: makeSelectToken(state),
    movies: makeSelectMovies(state),
  };
}
function mapDispatchToProps(dispatch?: any) {
  return {
    logoutRequest: () => dispatch(logoutActions()),
    getMovieList: () => dispatch(getMovieList()),
    getDetails: (id?: string | number) => dispatch(getMovieDetails(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = {
  header: {
    display: "flex",
    height: 50,
    backgroundColor: "#dc6700",
    justifyContent: "flex-end",
    alignContents: "center",
    padding: 5,
  },
  container: {
    display: "block",
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
};
