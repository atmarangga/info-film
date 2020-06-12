import React, { PureComponent } from "react";
import { Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { setData } from "../../redux/actions/generalActions";
import { makeSelectData } from "../../redux/selector";

interface Props {
  name: string;
  setInputData?: Function;
  isPassword?: boolean;
  placeholder?: string;
  dataValue?: any;
  isFirst?: boolean;
  isError?: boolean;
  notFirstInput?: Function;
}

class CustomInput extends PureComponent<Props> {
  constructor(Props?: any) {
    super(Props);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidUpdate(prevProps?: any) {
    const { name, notFirstInput } = this.props;
    const first = this.props.isFirst;
    const newData = this.props.dataValue[name];
    const oldData = name && this.props.dataValue && this.props.dataValue[name];
    if (first && notFirstInput && oldData && newData && oldData.length > 0 && JSON.stringify(newData) !== JSON.stringify(oldData)) {
      notFirstInput();
    }
  }

  getData() {
    const { name, dataValue } = this.props;
    if (dataValue && name) {
      return dataValue[name];
    }
    return "";
  }
  handleChange(e?: any, data?: any) {
    const { setInputData, name } = this.props;

    if (setInputData) {
      setInputData(name, data.value);
    }
  }

  render() {
    const { placeholder, isPassword, isError, isFirst } = this.props;
    return (
      <div style={styles.container}>
        <Input
          value={this.getData()}
          type={isPassword ? "password" : "text"}
          placeholder={placeholder}
          onChange={this.handleChange}
          error={!isFirst && isError}
        ></Input>
        <div style={styles.errorText}>{!isFirst && isError && `This field is mandatory`}</div>
      </div>
    );
  }
}

function mapStateToProps(state?: any) {
  return {
    dataValue: makeSelectData,
  };
}

function mapDispatchToProps(dispatch?: any) {
  return {
    setInputData: (key: string, value?: string) =>
      dispatch(setData(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomInput);

const styles = {
  container: {
    display: "grid",
  },
  errorText: {
    color: "#9f3a38"
  }
};
