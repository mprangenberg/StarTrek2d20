import React from "react";

interface IInputFieldAndLabelState {
    hasFocus: boolean;
}

interface IInputFieldAndLabelProperties {
    id: string,
    labelName: string,
    type?: string,
    value: string,
    max?: number,
    onChange: (value: string) => void
}

export class InputFieldAndLabel extends React.Component<IInputFieldAndLabelProperties, IInputFieldAndLabelState> {

    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false
        }
    }

    render() {
        let additionalProps = {};
        if (this.props.type === 'number' && this.props.max != null) {
            additionalProps = {
                max: this.props.max
            }
        }

        return (
            <div className="d-sm-flex align-items-stretch mt-3">
                <label htmlFor={this.props.id} className="textinput-label">{this.props.labelName}</label>
                <input
                    id={this.props.id}
                    type={this.props.type ? this.props.type : "text"}
                    onChange={(ev) => {
                        if (!this.state.hasFocus) {
                            this.props.onChange(ev.target.value);
                        }
                    }}
                    onFocus={() => {this.setState((state) => ({...state, hasFocus: true}))}}
                    onBlur={(ev) => {
                        this.setState((state) => ({...state, hasFocus: false}));
                        this.props.onChange(ev.target.value);
                    }}
                    {...additionalProps}
                    defaultValue={this.props.value} />
            </div>);
    }
}