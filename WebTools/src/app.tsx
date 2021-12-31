﻿import * as React from 'react';
import AppVersion from './components/appVersion';
import {character} from './common/character';
import { Events, EventIdentity } from './common/eventChannel';
import News from './components/news';
import { PageFactory } from './pages/pageFactory';
import { PageHeader } from './components/pageHeader';
import { PageIdentity } from './pages/pageIdentity';

import './css/main.css';

/*
class Application {
    private _activePage: PageIdentity;

    constructor() {
        this._activePage = PageIdentity.Selection;
    }

    start() {
        this.initialize();
        this.render();
    }

    private initialize() {
        Events.listen(EventIdentity.ShowPage, (page: any) => {
            this.activatePage(page as PageIdentity, false);
        });

        Events.listen(EventIdentity.HistoryBack, (page: any) => {
            this.activatePage(page as PageIdentity, true);
        });
    }

    private activatePage(page: PageIdentity, isHistory: boolean) {
        document.getElementById("app")!.scrollTop = 0;

        if (page === this._activePage) {
            var pageComponent = document.getElementsByClassName('page')[0];
            pageComponent.classList.remove('page-out');
            return;
        }

        this._activePage = page;

        if (!isHistory) {
            character.saveStep(this._activePage);
        }

        sheet.mount();

        this.render();
    }

    private render() {
        ReactDOM.render(
            React.createElement(Page, {
                page: this._activePage
            }),
            document.getElementById("app")
        );

        ReactDOM.render(
            React.createElement(History),
            document.getElementById("history-container")
        );
    }
}

const app = new Application();
*/

interface IAppState {
    showNews: boolean;
    activePage: PageIdentity;
}

export class CharacterCreationApp extends React.Component<{}, IAppState> {

    private pageFactory: PageFactory;
    constructor(props) {
        super(props);

        this.state = {
            showNews: false,
            activePage: PageIdentity.Selection
        };
        this.pageFactory = new PageFactory();
    }

    componentDidMount() {

        Events.listen(EventIdentity.ShowPage, (page: any) => {
            this.activatePage(page as PageIdentity, false);
        });

        Events.listen(EventIdentity.HistoryBack, (page: any) => {
            this.activatePage(page as PageIdentity, true);
        });
    }

    private activatePage(page: PageIdentity, isHistory: boolean) {
        document.getElementById("app")!.scrollTop = 0;

        if (page === this.state.activePage) {
            var pageComponent = document.getElementsByClassName('page')[0];
            pageComponent.classList.remove('page-out');
            return;
        }

        this.setState({
            ...this.state,
            activePage: page
        })

        if (!isHistory) {
            character.saveStep(this.state.activePage);
        }
    }

    render() {
        const page = this.pageFactory.createPage(this.state.activePage);

        return [
            <div className="lcar-container">
                <div className="lcar-header">
                    <div className="lcar-header-start"><a href="index.html"><img src="./img/logo.png" className="logo" alt="Star Trek Adventures Logo"/></a></div>
                    <div></div>
                    <div className="lcar-header-middle"></div>
                    <PageHeader page={this.state.activePage} />
                    <div className="lcar-header-end"></div>
                </div>
                <div className="lcar-content">
                    <div className="lcar-content-start">
                        <div className="lcar-content-start-top"></div>
                        <div className="lcar-content-action">
                            <div id="history-button" className="lcar-content-history" onClick={ () => console.log("showHistory();") }>History</div>
                            <div id="history-container" className="history-container-hidden"></div>
                        </div>
                        <div className="lcar-content-action">
                            <div id="profile-button" className="lcar-content-profile" onClick={ () => console.log("showCharacter();") }>Profile</div>
                            <div id="character-sheet"></div>
                        </div>
                        <div className="lcar-content-feedback" onClick={ () => console.log("feedback();") }>Feedback</div>
                        <div className="lcar-content-news" onClick={() => this.showNews()}>
                            <div id="news-button" className="lcar-news">News</div>
                        </div>
                        <div></div>
                    </div>
                    <div className="lcar-content-round"></div>
                    <div id="app">{page}</div>
                </div>
                <div className="lcar-footer">
                    <div className="lcar-footer-start"></div>
                    <div className="lcar-footer-end"></div>
                </div>
                <div className="legal">
                    TM &amp; &copy; 2018 CBS Studios Inc. STAR TREK and related marks and logos are trademarks of CBS Studios Inc. All Rights Reserved.
                </div>
            </div>,
            <AppVersion />,
            <div id="dialog"></div>,
            <News showModal={this.state.showNews} onClose={() => {this.hideNews()}}/>
        ];
    }

    showNews() {
        this.setState({
            showNews: true
        })
    }

    hideNews() {
        this.setState({
            showNews: false
        })
    }
}

export default CharacterCreationApp;
