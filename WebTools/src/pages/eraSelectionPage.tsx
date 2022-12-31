﻿import * as React from 'react';
import {Era, ErasHelper} from '../helpers/eras';
import {Source, SourcesHelper} from '../helpers/sources';
import {character} from '../common/character';
import {navigateTo, Navigation} from '../common/navigator';
import {Window} from '../common/window';
import {PageIdentity} from './pageIdentity';
import {Button} from '../components/button';
import store from '../state/store';
import { addSource, removeSource, setEra, setSources } from '../state/contextActions';
import { connect } from 'react-redux';
import { withTranslation, WithTranslation } from 'react-i18next';

interface IEraSelectionPageProperties extends WithTranslation {
    sources: Source[]
}

class EraSelectionPage extends React.Component<IEraSelectionPageProperties, {}> {
    constructor(props: IEraSelectionPageProperties) {
        super(props);

        const profileButton = document.getElementById("profile-button");
        if (profileButton !== undefined) {
            profileButton.style.display = "";
        }

        character.saveStep(PageIdentity.Era);
    }

    renderSources() {
        const { t } = this.props;
        let hasUnavailableSources = false;

        const sources = SourcesHelper.getTypes().map(t => {
            const list = SourcesHelper.getSourcesByType(t.type).map((s, i) => {
                hasUnavailableSources = hasUnavailableSources || !s.available;
                const className = s.available ? (this.hasSource(s.id) ? "source source-selected" : "source") : "source unavailable";
                return (
                    <div key={s.id} className={className} onClick={() => { if (s.available) { this.sourceChanged(s.id); } } }>{s.name}</div>
                );
            });
            return (<div key={'source-type-' + t.type}>
                <div className="text-white small text-center">{t.name}</div>
                {list}
            </div>)
        });

        const note = hasUnavailableSources ? t('EraSelectionPage.sourceNote') : "";

        return (<div>
            <div className="page-text">
                {t('EraSelectionPage.sourceInstruction')}
                {note}
            </div>
            <div className="d-flex flex-wrap">
                <div className="source source-emphasis" onClick={() => { this.toggleSources(true); } }>{t('Common.button.selectAll')}</div>
                <div className="source source-emphasis" onClick={() => { this.toggleSources(false); } }>{t('Common.button.selectNone')}</div>
            </div>
            <div className="d-flex flex-wrap mt-3 mb-3">
                {sources}
            </div>
        </div>);
    }


    render() {
        const { t } = this.props;

        const eras = ErasHelper.getEras().map((e, i) => {
            return (
                <tr key={i} onClick={() => { if (Window.isCompact()) this.eraSelected(e.id); }}>
                    <td className="selection-header">{e.name}</td>
                    <td className="text-right"><Button buttonType={true} className="button-small" text={t('Common.button.select')} onClick={() => { this.eraSelected(e.id) }} /></td>
                </tr>
            );
        });

        return (
            <div className="page container ml-0">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html" onClick={(e) => navigateTo(e, PageIdentity.Home)}>{t('Page.title.home')}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{t('Page.title.era')}</li>
                    </ol>
                </nav>
                {this.renderSources()}
                <div className="page-text mt-5">
                    {t('EraSelectionPage.eraInstruction')}
                </div>
                <table className="selection-list">
                    <tbody>
                        {eras}
                    </tbody>
                </table>
            </div>
        );
    }

    private sourceChanged(source: Source) {
        if (source === Source.Core) {
            // do nothing
        } else if (this.hasSource(source)) {
            store.dispatch(removeSource(source));
        } else {
            store.dispatch(addSource(source));
        }

        this.forceUpdate();
    }

    private toggleSources(selectAll: boolean) {
        if (selectAll) {
            let sources = SourcesHelper.getSources().filter(s => s.available).map(s => s.id);
            store.dispatch(setSources(sources));
        } else {
            store.dispatch(setSources([ Source.Core ]));
        }
    }

    private eraSelected(era: Era) {
        store.dispatch(setEra(era));
        Navigation.navigateToPage(PageIdentity.ToolSelecton);
    }

    hasSource(source: Source) {
        return this.props.sources.indexOf(source) > -1 || source === Source.Core;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        sources: state.context.sources
    };
}

export default connect(mapStateToProps)(withTranslation()(EraSelectionPage));