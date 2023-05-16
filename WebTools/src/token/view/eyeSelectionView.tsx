import React from "react";
import { Token } from "../model/token";
import { withTranslation, WithTranslation } from 'react-i18next';
import { connect } from "react-redux";
import store from "../../state/store";
import { setTokenEyeColor, setTokenEyeType } from "../../state/tokenActions";
import ColorSelection from "./colorSelection";
import SpeciesOptions from "../model/speciesOptions";
import EyeCatalog from "../model/eyeCatalog";
import SwatchButton from "./swatchButton";

interface IEyeSelectionViewProperties extends WithTranslation {
    token: Token;
}

class EyeSelectionView extends React.Component<IEyeSelectionViewProperties, {}> {

    render() {
        const { token } = this.props;
        return (<>
            <p className="mt-4">Eye Color:</p>
            <ColorSelection colors={SpeciesOptions.getEyeColors(token.species)} onSelection={(c) => store.dispatch(setTokenEyeColor(c))} />

            <p className="mt-4">Eye Style:</p>
            <div className="d-flex flex-wrap" style={{gap: "0.5rem"}}>
            {EyeCatalog.instance.swatches.map(s => <SwatchButton svg={s.svg} title={s.name}
                onClick={() => store.dispatch(setTokenEyeType(s.id))} active={this.props.token.eyeType === s.id}
                token={this.props.token}
                key={'eye-swatch-' + s.id }/>)}
            </div>
        </>)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        token: state.token
    };
}

export default withTranslation()(connect(mapStateToProps)(EyeSelectionView));