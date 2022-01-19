import * as React from 'react';
import Modal from './modal';

interface INewsProperties {
    showModal: boolean;
    onClose: () => void;
}

class News extends React.Component<INewsProperties, {}> {

    render() {
        return (
            <Modal size="lg" show={this.props.showModal} onClose={() => this.props.onClose()} header="What's New?">
                <b>v1.220119</b>
                <ul>
                    <li>Minor improvements to the TOS character sheets, including initial support for ship outlines.</li>
                </ul>
                <b>v1.220118</b>
                <ul>
                    <li><a href="https://github.com/bcholmes/StarTrek2d20/issues/9" target="_blank" rel="noreferrer">Enhancement:</a> I've
                    created an initial implementation of a 2-page character sheet that displays the full text of the Talents. At the 
                    moment, I consider this a very preliminary implementation. In particular, I don't like the aesthetics of the 
                    final character sheet, and I'll probably end up making a lot of changes, there.</li>
                </ul>
                <b>v1.220115</b>
                <ul>
                    <li>More layout adjustments to Starship creation.</li>
                    <li>Fixed a long-standing bug with <i>Luna</i>-class ships and Mission Pods.</li>
                    <li><a href="https://github.com/bcholmes/StarTrek2d20/issues/11" target="_blank" rel="noreferrer">Enhancement:</a> Allow 
                    user to enter additional traits in the final step of the character creation process.</li>
                    <li>Improvements to the Talent Overview page to display some of the pre-requisite information</li>
                </ul>
                <b>v1.220110</b>
                <ul>
                    <li>Tweaked some screens to get better layout support on phones.</li>
                </ul>
                <b>v1.220103</b>
                <ul>
                    <li>I've upgraded some of the underlying technologies used to build the site. For the most part, I'd expect the  
                        app to behave the same as before, but as with all broad-reaching changes, please let me know if you see  
                        any odd behaviour.
                    </li>
                    <li>I've made a number of revisions to the starship creation process, including adding the ability to create
                        custom spaceframes. If you ever wanted to try out a spaceframe from Continuing Missions, or you had your
                        own stats for a <i>Loknar</i> Class, this update should help you.
                    </li>
                </ul>
                <b>v1.211023</b>
                <ul>
                    <li>Enhancement: Allow an override to starship "end of service" dates.</li>
                </ul>
                <b>v1.211022</b>
                <ul>
                    <li>Enhancement: add support for more ship outlines (notably the Olympic and Sydney class).</li>
                    <li>Bug: Data corrections for Klingon spaceframes.</li>
                    <li>Enhancement: Allow users to specify non-Klingon races when creating Klingon Warrior characters.</li>
                </ul>
                <b>v1.211018</b>
                <ul>
                    <li><a href="https://github.com/bcholmes/StarTrek2d20/issues/10" target="_blank" rel="noreferrer">Enhancement:</a> 
                        Automatically add the 'Augmented' trait when the character has an Augmented Ability talent.</li>
                </ul>
                <b>v1.211016</b>
                <ul>
                    <li>I'm experimenting with revisions to the Starship character sheet. You probably won't notice any difference.</li>
                    <li><a href="https://github.com/bcholmes/StarTrek2d20/issues/7" target="_blank" rel="noreferrer">Bug:</a> 
                        retore the accept/reject indicator on character sheets.</li>
                </ul>
                <b>v1.211008</b>
                <ul>
                    <li>Incorporate the IDW Year Five Sourcebook</li>
                    <li>Bug fixes: Some minor bugs have been fixed (if you choose Homeworld as the environment, it would be blank on the character
                        sheet, and the damage calculation for phasers was slightly off.
                    </li>
                </ul>
                <b>v1.211003</b>
                <ul>
                    <li>Bug fix: The Resolute talent wasn't being factored into the Stress calculation.</li>
                </ul>
                <b>v1.211002</b>
                <ul>
                    <li>Initial support for Klingon spaceframes / starships.</li>
                </ul>
                <b>v1.210927</b>
                <ul>
                    <li>Bug fix: The app would stop working if you tried to use the History widget to navigate to an earlier page.</li>
                </ul>
                <div className="button-container-centered">
                    <div className="button" onClick={ () => this.props.onClose() }>
                        OK
                    </div>
                </div>
            </Modal>
        );
    }

    showNews() {
        this.setState({
            showModal: true
        })
    }
}

export default News;