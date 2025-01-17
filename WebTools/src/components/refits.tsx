﻿import React from 'react';
import {System} from '../helpers/systems';
import {Starship} from '../common/starship';
import { withTranslation, WithTranslation } from 'react-i18next';
import { makeKey } from '../common/translationKey';

interface IRefitImprovementProperties {
    controller: Refits;
    system: System;
    value: number;
    name: string;
    showIncrease: boolean;
    showDecrease: boolean;
}

export class Refit extends React.Component<IRefitImprovementProperties, {}> {
    render() {
        const {value, name, showDecrease, showIncrease} = this.props;

        const dec = showDecrease
            ? (<img style={{ float: "left" }} height="20" src="static/img/dec.png" onClick={ () => { this.onDecrease() } } alt="-"/>)
            : undefined;

        const inc = showIncrease
            ? (<img style={{ float: "right" }} height="20" src="static/img/inc.png" onClick={ () => { this.onIncrease() } } alt="+"/>)
            : undefined;

        return (
            <div>
                <div className="attribute-container">
                    {name}
                </div>
                <div className="attribute-value">
                    {dec}
                    {value}
                    {inc}
                </div>
            </div>
        );
    }

    private onDecrease() {
        this.props.controller.onDecrease(this.props.system);
    }

    private onIncrease() {
        this.props.controller.onIncrease(this.props.system);
    }
}

interface IRefitsProperties extends WithTranslation {
    starship: Starship;
    points: number;
    refits: System[]
    onIncrease?: (system: System) => void;
    onDecrease?: (system: System) => void;
}

class Refits extends React.Component<IRefitsProperties, {}> {
    private _absoluteMax: number = 12;

    render() {
        const {t} = this.props;
        const systems: System[] = [ System.Comms, System.Computer, System.Engines, System.Sensors, System.Structure, System.Weapons ];
        const attributes = systems.map((a, i) => {
            return <Refit
                key={i}
                controller={this}
                system={a}
                name={t(makeKey('Construct.system.', System[a]))}
                value={this.currentValue(a)}
                showIncrease={this.showIncrease(a)}
                showDecrease={this.showDecrease(a)} />
        });

        return (
            <div>
                {attributes}
            </div>
        );
    }

    showDecrease(system: System) {
        return this.currentValue(system) > this.props.starship.getBaseSystem(system);
    }

    showIncrease(system: System) {
        return this.currentValue(system) < this._absoluteMax && this.props.refits.length < this.props.points;
    }

    currentValue(s: System) {
        return this.props.starship.getSystemValue(s);
    }

    onDecrease(attr: System) {
        this.props.onDecrease(attr);
        this.forceUpdate();
    }

    onIncrease(attr: System) {
        this.props.onIncrease(attr);
        this.forceUpdate();
    }
}

export default withTranslation()(Refits);