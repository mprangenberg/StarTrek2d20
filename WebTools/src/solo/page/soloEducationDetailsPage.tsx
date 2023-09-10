import { useTranslation } from "react-i18next";
import { ISoloCharacterProperties, soloCharacterMapStateToProperties } from "./soloCharacterProperties";
import React from "react";
import { connect } from "react-redux";
import { Navigation } from "../../common/navigator";
import { PageIdentity } from "../../pages/pageIdentity";
import { Header } from "../../components/header";
import { TrackModel, TracksHelper } from "../../helpers/tracks";
import InstructionText from "../../components/instructionText";
import { IAttributeController } from "../../components/attributeController";
import { Character } from "../../common/character";
import { Attribute } from "../../helpers/attributes";
import { StepContext, modifyCharacterAttribute, modifyCharacterDiscipline, setCharacterFocus, setCharacterValue } from "../../state/characterActions";
import store from "../../state/store";
import AttributeListComponent from "../../components/attributeListComponent";
import { InputFieldAndLabel } from "../../common/inputFieldAndLabel";
import { Button } from "../../components/button";
import SoloValueInput from "../component/soloValueInput";
import { Skill } from "../../helpers/skills";
import DisciplineListComponent, { IDisciplineController } from "../../components/disciplineListComponent";
import { Dialog } from "../../components/dialog";
import SoloCharacterBreadcrumbs from "../component/soloCharacterBreadcrumbs";

class SoloEducationAttributeController implements IAttributeController {

    readonly character: Character;

    constructor(character: Character) {
        this.character = character;
    }

    isShown(attribute: Attribute) {
        return true;
    }
    isEditable(attribute: Attribute): boolean {
        return true;
    }
    getValue(attribute: Attribute): number {
        return this.character.attributes[attribute].value;
    }
    canIncrease(attribute: Attribute): boolean {
        return this.isEditable(attribute) && this.character.educationStep?.attributes?.length < 3
            && this.character.educationStep.attributes.filter(a => a === attribute).length < 2;
    }
    canDecrease(attribute: Attribute): boolean {
        return this.isEditable(attribute) && this.character.educationStep?.attributes?.indexOf(attribute) >= 0;
    }
    onIncrease(attribute: Attribute): void {
        store.dispatch(modifyCharacterAttribute(attribute, StepContext.Education));
    }
    onDecrease(attribute: Attribute): void {
        store.dispatch(modifyCharacterAttribute(attribute, StepContext.Education, false));
    }
    get instructions() {
        return []
    }
}

class SoloEducationPrimaryDisciplineController implements IDisciplineController {

    readonly character: Character;
    readonly track: TrackModel;

    constructor(character: Character, track: TrackModel) {
        this.character = character;
        this.track = track;
    }

    isShown(discipline: Skill) {
        return this.track.majorDisciplines.indexOf(discipline) >= 0;
    }
    isEditable(discipline: Skill)  {
        return true;
    }
    getValue(discipline: Skill) {
        return this.character.skills[discipline].expertise;
    }
    canIncrease(discipline: Skill) {
        return this.character.educationStep?.primaryDiscipline == null && (this.character.skills[discipline].expertise < Character.maxDiscipline(this.character));
    }
    canDecrease(discipline: Skill) {
        return this.character.educationStep?.primaryDiscipline === discipline;
    }
    onIncrease(discipline: Skill) {
        store.dispatch(modifyCharacterDiscipline(discipline, StepContext.Education, true, this.track.majorDisciplines));
    }
    onDecrease(discipline: Skill) {
        store.dispatch(modifyCharacterDiscipline(discipline, StepContext.Education, false, this.track.majorDisciplines));
    }
}

class SoloEducationSecondaryDisciplineController implements IDisciplineController {

    readonly character: Character;
    readonly track: TrackModel;

    constructor(character: Character, track: TrackModel) {
        this.character = character;
        this.track = track;
    }

    isShown(discipline: Skill) {
        if (this.character.educationStep?.primaryDiscipline != null) {
            return discipline !== this.character.educationStep?.primaryDiscipline;
        } else {
            return this.track.majorDisciplines.indexOf(discipline) < 0;
        }
    }
    isEditable(discipline: Skill)  {
        return true;
    }
    getValue(discipline: Skill) {
        return this.character.skills[discipline].expertise;
    }
    canIncrease(discipline: Skill) {
        return ((this.character.educationStep?.disciplines.length < 2) ||
            (this.character.educationStep?.disciplines.length < 3 && this.character.educationStep?.decrementDiscipline != null))
            && this.character.educationStep.disciplines.indexOf(discipline) < 0
            && (this.character.skills[discipline].expertise < Character.maxDiscipline(this.character));
    }
    canDecrease(discipline: Skill) {
        return this.character.educationStep?.disciplines.indexOf(discipline) >= 0;
    }
    onIncrease(discipline: Skill) {
        store.dispatch(modifyCharacterDiscipline(discipline, StepContext.Education, true));
    }
    onDecrease(discipline: Skill) {
        store.dispatch(modifyCharacterDiscipline(discipline, StepContext.Education, false));
    }
}

const SoloEducationDetailsPage: React.FC<ISoloCharacterProperties> = ({character}) => {

    const { t } = useTranslation();
    const track = TracksHelper.instance().getSoloTrack(character.educationStep?.track);
    const attributeController = new SoloEducationAttributeController(character);
    const primaryDisciplineController = new SoloEducationPrimaryDisciplineController(character, track);
    const secondaryDisciplineController = new SoloEducationSecondaryDisciplineController(character, track);

    const navigateToNextPage = () => {
        if (character.educationStep?.attributes?.length < 3) {
            Dialog.show(t("SoloEducationDetailsPage.errorAttributes"));
        } else if (character.educationStep?.disciplines?.length < 2 || character.educationStep?.primaryDiscipline == null ||
            (character.educationStep?.decrementDiscipline != null && character.educationStep?.disciplines?.length < 3)) {
            Dialog.show(t("SoloEducationDetailsPage.errorDisciplines"));
        } else if (character.educationStep?.focuses?.length < 3) {
            Dialog.show(t("SoloEducationDetailsPage.errorFocuses"));
        } else if (!character.trackValue) {
            Dialog.show(t("SoloEducationDetailsPage.errorValue"));
        } else {
            Navigation.navigateToPage(PageIdentity.SoloCareerLength);
        }
    }

    return (
        <div className="page container ml-0">
            <SoloCharacterBreadcrumbs  pageIdentity={PageIdentity.SoloEducationDetailsPage}/>
            <Header>{track.localizedName}</Header>
            <InstructionText text={track.localizedDescription} />

            <div className="row">
                <div className="col-md-6 my-3">
                    <Header level={2}>{t('Construct.other.attributes') + ' ' + t('SoloEducationDetailsPage.selectThree')}</Header>
                    <AttributeListComponent controller={attributeController} />
                </div>
                <div className="col-md-6 my-3">
                    <Header level={2}>{t('SoloEducationDetailsPage.primaryDiscipline')}</Header>
                    <DisciplineListComponent controller={primaryDisciplineController} />

                    <Header level={2} className="mt-3">{t('SoloEducationDetailsPage.secondaryDiscipline')}</Header>
                    <DisciplineListComponent controller={secondaryDisciplineController} />
                </div>
                <div className="my-3 col-md-6">
                    <Header level={2}>{t('Construct.other.focus')}</Header>
                    <InputFieldAndLabel id="focus1" labelName={t('Construct.other.focus1')}
                        value={character.educationStep?.focuses[0] || ""}
                        onChange={(v) => store.dispatch(setCharacterFocus(v, StepContext.Education, 0))} />
                    <InputFieldAndLabel id="focus2" labelName={t('Construct.other.focus2')}
                        value={character.educationStep?.focuses[1] || ""}
                        onChange={(v) => store.dispatch(setCharacterFocus(v, StepContext.Education, 1))} />
                    <InputFieldAndLabel id="focus3" labelName={t('Construct.other.focus3')}
                        value={character.educationStep?.focuses[2] || ""}
                        onChange={(v) => store.dispatch(setCharacterFocus(v, StepContext.Education, 2))} />
                    <div className="mt-3 text-white"><b>{t('Common.text.suggestions')}:</b> {track.focusSuggestions.join(", ")}</div>
                </div>
                <div className="my-3 col-md-6">
                    <Header level={2}>{t('Construct.other.value')}</Header>
                    <SoloValueInput textDescription={t('Value.otherTraining.text')} onValueChanged={(string) => {store.dispatch(setCharacterValue(string, StepContext.Education))}}/>

                </div>
            </div>
            <div className='text-right mt-4'>
                <Button text={t('Common.button.next')} buttonType={true} className="btn btn-primary" onClick={() => navigateToNextPage() }/>
            </div>
        </div>);
}

export default connect(soloCharacterMapStateToProperties)(SoloEducationDetailsPage);