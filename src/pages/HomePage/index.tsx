import React, { PureComponent } from "react";
import { List } from "immutable";
import { connect } from "react-redux";
import { Button, Item } from "semantic-ui-react";
import { makeSelectToken, makeSelectMovies } from "../../redux/selector";
import {
  logoutActions,
  getMovieList,
} from "../../redux/actions/generalActions";
import ItemGroup from "../../components/ItemGroup";

interface Props {
  token?: string;
  logoutRequest?: Function;
  getMovieList?: Function;
  movies?: List<any>;
}
class HomePage extends PureComponent<Props> {
  constructor(props?: any) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.retrieveMovieList = this.retrieveMovieList.bind(this);
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

  handleLogout() {
    const { logoutRequest } = this.props;
    if (logoutRequest) {
      logoutRequest();
    }
  }

  render() {
    const { movies } = this.props;
    const moviesArray = movies && movies.toJS();
    console.log("movies ??? ", moviesArray);
    return (
      <>
        <p>This should be homepage</p>
        <Button onClick={this.handleLogout}>Logout</Button>
        <p>
          {moviesArray && <ItemGroup
            items={moviesArray}
            onClick={(data: any) => console.log("data : ", data)}
          />}
        </p>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
