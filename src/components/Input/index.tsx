import React, { PureComponent } from "react";
import { Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { setData } from "../../redux/actions/generalActions";

interface Props {
  name: string;
  setInputData?: Function;
  isPassword?: boolean;
  placeholder?: string;
}

class CustomInput extends PureComponent<Props> {
  constructor(Props?:any) {
    super(Props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e?:any, data?: any) {
    const { setInputData, name } = this.props;
    console.log('this.props', this.props);
    console.log('key ', name);
    console.log('data', data);
    if(setInputData){
        setInputData(name, data.value);
    }   
  }

  render() {
    const { placeholder, isPassword } = this.props;
    return <Input type={isPassword ? 'password' : 'text'} placeholder={placeholder} onChange={this.handleChange} ></Input>;
  }
}

function mapStateToProps(state?: any) {
  return {};
}

function mapDispatchToProps(dispatch?: any) {
  return {
    setInputData: (key: string, value?: string) => dispatch(setData(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomInput);
