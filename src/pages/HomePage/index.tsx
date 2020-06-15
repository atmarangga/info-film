import React, { PureComponent } from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import { Button, Header } from "semantic-ui-react";
import { makeSelectToken, makeSelectMovies, makeSelectRequestProcess } from "../../redux/selector";
import {
  logoutActions,
  getMovieList,
  getMovieDetails,
} from "../../redux/actions/generalActions";
import ItemGroup from "../../components/ItemGroup";
import DetailPage from "../DetailPage";
import LoadingItems from "../../components/LoadingItems";
import {checkRequest} from "../../helpers/utils"
import { MOVIE_LIST_REQUEST } from "../../helpers/request";

interface Props {
  token?: string;
  logoutRequest?: Function;
  getMovieList?: Function;
  getDetails?: Function;
  movies?: List<any>;
  requestPool?: List<any>;
}

interface State {
  showDetails: boolean;
  id?: string | number; 
}

class HomePage extends PureComponent<Props, State> {
  constructor(props?: any) {
    super(props);
    this.state = {
      showDetails: false,
      id: '',
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
          id: id
        }
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
    const { movies, requestPool } = this.props;
    const { showDetails } = this.state;
    const moviesArray = movies && movies.toJS();
    return (
      <>
        <Header style={styles.header}>
          <div style={styles.title}>{`Info Film`}</div>

          <Button onClick={this.handleLogout}>Logout</Button>
        </Header>
        <div style={styles.top}>
          {`Your Movies`}
          <div style={styles.subTitle}>
            Chill in and browse you movies list{" "}
          </div>
        </div>
        <div style={styles.container}>
          
          {requestPool && checkRequest(requestPool.toJS(), MOVIE_LIST_REQUEST) && (<LoadingItems />)}
          {moviesArray && !showDetails && (
            <ItemGroup
              items={moviesArray}
              onClick={(data: any) => {
                // this.setState()
                console.log('data ?', data);
                this.getMovieDetails(data);
              }}
            />
          )}
          {showDetails && <DetailPage id = {this.state.id} returnFunction={this.goBackToHomepage} />}
        </div>
      </>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    token: makeSelectToken(state),
    movies: makeSelectMovies(state),
    requestPool: makeSelectRequestProcess(state)
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
  top: {
    height: 110,
    color: "#0a0a0a",
    fontSize: 50,
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  subTitle: {
    color: "#aaaaaa",
    marginTop: 20,
    fontSize: 25,
    padding: 10,
  },
  title: {
    display: "grid",
    alignItems: "center",
    color: "#fff",
    height: "100%",
    marginRight: 50,
  },
  header: {
    display: "flex",
    height: 50,
    backgroundColor: "#1c1c1c",
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
