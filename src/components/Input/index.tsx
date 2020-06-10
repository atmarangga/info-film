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
}

class CustomInput extends PureComponent<Props> {
  constructor(Props?: any) {
    super(Props);
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    const { name, dataValue } = this.props;
    if (dataValue && name) {
      console.log("data here ?", dataValue[name]);
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
    const { placeholder, isPassword } = this.props;
    return (
      <Input
        value={this.getData()}
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        onChange={this.handleChange}
      ></Input>
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
