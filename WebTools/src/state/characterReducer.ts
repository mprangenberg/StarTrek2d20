import { CareerEventStep, Character, EducationStep, EnvironmentStep, SpeciesStep, UpbringingStep, character } from "../common/character";
import { ADD_CHARACTER_CAREER_EVENT, APPLY_NORMAL_MILESTONE_DISCIPLINE, APPLY_NORMAL_MILESTONE_FOCUS, MODIFY_CHARACTER_ATTRIBUTE, MODIFY_CHARACTER_DISCIPLINE, MODIFY_CHARACTER_RANK, MODIFY_CHARACTER_REPUTATION, SET_CHARACTER, SET_CHARACTER_CAREER_LENGTH, SET_CHARACTER_EARLY_OUTLOOK, SET_CHARACTER_EDUCATION, SET_CHARACTER_ENVIRONMENT, SET_CHARACTER_FOCUS, SET_CHARACTER_NAME, SET_CHARACTER_PRONOUNS, SET_CHARACTER_SPECIES, SET_CHARACTER_TYPE, SET_CHARACTER_VALUE, StepContext } from "./characterActions";

interface CharacterState {
    currentCharacter?: Character;
    isModified: boolean
}

const characterReducer = (state: CharacterState = { currentCharacter: undefined, isModified: false }, action) => {
    switch (action.type) {

        case SET_CHARACTER: {
            let temp = action.payload.character.copy();
            return {
                ...state,
                currentCharacter: temp,
                isModified: false
            }
        }
        case SET_CHARACTER_SPECIES: {
            let temp = state.currentCharacter.copy();
            temp.speciesStep = new SpeciesStep(action.payload.species);
            if (action.payload.attributes) {
                temp.speciesStep.attributes = action.payload.attributes;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_CAREER_LENGTH: {
            let temp = state.currentCharacter.copy();
            temp.career = action.payload.careerLength;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_EDUCATION: {
            let temp = state.currentCharacter.copy();
            temp.educationStep = new EducationStep(action.payload.track, action.payload.enlisted);
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_ENVIRONMENT: {
            let temp = state.currentCharacter.copy();
            let originalStep = temp.environmentStep;
            temp.environmentStep = new EnvironmentStep(action.payload.environment, action.payload.otherSpecies);
            if (originalStep) {
                if (originalStep.environment === temp.environmentStep.environment) {
                    temp.environmentStep.discipline = originalStep.discipline;
                    if (originalStep.otherSpecies === temp.environmentStep.otherSpecies) {
                        temp.environmentStep.attribute = originalStep.attribute;
                    }
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_EARLY_OUTLOOK: {
            let temp = state.currentCharacter.copy();
            let originalStep = temp.upbringingStep;
            temp.upbringingStep = new UpbringingStep(action.payload.earlyOutlook, action.payload.accepted);
            if (originalStep) {
                if (originalStep.upbringing?.id === temp.upbringingStep.upbringing?.id) {
                    temp.upbringingStep.discipline = originalStep.discipline;
                }
                temp.upbringingStep.focus = originalStep.focus;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_ATTRIBUTE: {
            let temp = state.currentCharacter.copy();
            const attribute = action.payload.attribute;
            const increase = action.payload.increase;
            if (action.payload.context === StepContext.Species && temp.speciesStep) {
                if (increase) {
                    temp.speciesStep.attributes.push(action.payload.attribute);
                    if (temp.speciesStep.attributes.length > 3) {
                        let attributes = [...temp.speciesStep.attributes];
                        attributes.splice(0, attributes.length - 3);
                        temp.speciesStep.attributes = attributes;
                    }
                } else if (temp.speciesStep.attributes.indexOf(action.payload.attribute) >= 0) {
                    let attributes = [...temp.speciesStep.attributes];
                    attributes.splice(temp.speciesStep.attributes.indexOf(action.payload.attribute), 1);
                    temp.speciesStep.attributes = attributes;
                }
            } else if (action.payload.context === StepContext.Environment && temp.environmentStep) {
                if (increase) {
                    temp.environmentStep.attribute = action.payload.attribute;
                } else if (temp.environmentStep.attribute === action.payload.attribute) {
                    temp.environmentStep.attribute = undefined;
                }
            } else if (action.payload.context === StepContext.Education && temp.educationStep) {
                if (increase) {
                    temp.educationStep.attributes.push(action.payload.attribute)
                } else if (temp.educationStep.attributes.indexOf(action.payload.attribute) >= 0) {
                    temp.educationStep.attributes.splice(temp.educationStep.attributes.indexOf(action.payload.attribute), 1);
                }
            } else if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents?.length > 0) {
                temp.careerEvents[0].attribute = increase ? attribute : undefined;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents?.length > 1) {
                temp.careerEvents[1].attribute = increase ? attribute : undefined;
            } else if (action.payload.context === StepContext.FinishingTouches && temp.finishingStep) {
                if (increase) {
                    temp.finishingStep.attributes.push(attribute);
                } else {
                    let index = temp.finishingStep.attributes.indexOf(attribute);
                    if (index >= 0) {
                        temp.finishingStep.attributes.splice(index, 1);
                    }
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case ADD_CHARACTER_CAREER_EVENT: {
            let temp = state.currentCharacter.copy();
            let event = new CareerEventStep(action.payload.eventId);
            if (action.payload.attribute != null) {
                event.attribute = action.payload.attribute;
            }
            if (action.payload.discipline != null) {
                event.discipline = action.payload.discipline;
            }

            temp.careerEvents.push(event);

            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_TYPE: {
            let temp = state.currentCharacter.copy();
            let originalType = character.type;
            temp.type = action.payload.type;
            if (temp.type !== originalType && character.educationStep) {
                character.educationStep = undefined;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_NAME: {
            let temp = state.currentCharacter.copy();
            temp.name = action.payload.name;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_PRONOUNS: {
            let temp = state.currentCharacter.copy();
            temp.pronouns = action.payload.pronouns;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_VALUE: {
            let temp = state.currentCharacter.copy();
            if (action.payload.context === StepContext.Environment) {
                temp.environmentValue = action.payload.value;
            } else if (action.payload.context === StepContext.Education) {
                temp.trackValue = action.payload.value;
            } else if (action.payload.context === StepContext.Career) {
                temp.careerValue = action.payload.value;
            } else if (action.payload.context === StepContext.FinishingTouches) {
                temp.finishValue = action.payload.value;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case SET_CHARACTER_FOCUS: {
            let temp = state.currentCharacter.copy();
            if (action.payload.context === StepContext.EarlyOutlook && temp.upbringingStep) {
                temp.upbringingStep.focus = action.payload.focus;
            } else if (action.payload.context === StepContext.Education && temp.educationStep && action.payload.index <= 2) {
                temp.educationStep.focuses[action.payload.index] = action.payload.focus;
            } else if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents[0]) {
                temp.careerEvents[0].focus = action.payload.focus;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents[1]) {
                temp.careerEvents[1].focus = action.payload.focus;
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_DISCIPLINE: {
            let temp = state.currentCharacter.copy();
            const discipline = action.payload.discipline;
            const increase = action.payload.increase;
            if (action.payload.context === StepContext.Environment && temp.environmentStep) {
                if (action.payload.increase) {
                    temp.environmentStep.discipline = action.payload.discipline;
                } else if (temp.environmentStep.discipline === action.payload.discipline) {
                    temp.environmentStep.discipline = undefined;
                }
            } else if (action.payload.context === StepContext.EarlyOutlook && temp.upbringingStep) {
                if (action.payload.increase) {
                    temp.upbringingStep.discipline = action.payload.discipline;
                } else if (temp.upbringingStep.discipline === action.payload.discipline) {
                    temp.upbringingStep.discipline = undefined;
                }
            } else if (action.payload.context === StepContext.Education && temp.educationStep) {
                if (action.payload.increase) {
                    if (action.payload.primaryDisciplines.length > 0) {
                        temp.educationStep.primaryDiscipline = discipline;
                        action.payload.primaryDisciplines.forEach(d => {
                            if (temp.educationStep.disciplines.indexOf(d) >= 0) {
                                temp.educationStep.disciplines.splice(temp.educationStep.disciplines.indexOf(d), 1);
                            }
                        });
                    } else if (temp.educationStep.decrementDiscipline === discipline) {
                        temp.educationStep.decrementDiscipline = null;
                    } else {
                        temp.educationStep.disciplines.push(discipline);
                    }
                } else {
                    if (temp.educationStep.primaryDiscipline === discipline) {
                        temp.educationStep.primaryDiscipline = null;
                        action.payload.primaryDisciplines.forEach(d => {
                            if (temp.educationStep.disciplines.indexOf(d) >= 0) {
                                temp.educationStep.disciplines.splice(temp.educationStep.disciplines.indexOf(d), 1);
                            }
                        });
                    } else if (temp.educationStep.disciplines.indexOf(discipline) >= 0) {
                        temp.educationStep.disciplines.splice(temp.educationStep.disciplines.indexOf(discipline), 1);
                    } else {
                        temp.educationStep.decrementDiscipline = discipline;
                    }
                }
            } else if (action.payload.context === StepContext.CareerEvent1 && temp.careerEvents?.length > 0) {
                temp.careerEvents[0].discipline = increase ? discipline : undefined;
            } else if (action.payload.context === StepContext.CareerEvent2 && temp.careerEvents?.length > 1) {
                temp.careerEvents[1].discipline = increase ? discipline : undefined;
            } else if (action.payload.context === StepContext.FinishingTouches && temp.finishingStep) {
                if (increase) {
                    temp.finishingStep.disciplines.push(discipline);
                } else {
                    let index = temp.finishingStep.disciplines.indexOf(discipline);
                    if (index >= 0) {
                        temp.finishingStep.disciplines.splice(index, 1);
                    }
                }
            }
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_REPUTATION: {
            let temp = state.currentCharacter.copy();
            temp.reputation += action.payload.delta;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case MODIFY_CHARACTER_RANK: {
            let temp = state.currentCharacter.copy();
            temp.rank = action.payload.rank;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case APPLY_NORMAL_MILESTONE_DISCIPLINE: {
            let temp = state.currentCharacter.copy();
            temp.skills[action.payload.decrease].expertise -= 1;
            temp.skills[action.payload.increase].expertise += 1;
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        case APPLY_NORMAL_MILESTONE_FOCUS: {
            let temp = state.currentCharacter.copy();
            let index = temp.focuses.indexOf(action.payload.removeFocus);
            if (index >= 0) {
                temp.focuses.splice(index, 1);
            }
            temp.focuses.push(action.payload.addFocus);
            return {
                ...state,
                currentCharacter: temp,
                isModified: true
            }
        }
        default:
            return state;
    }
}

export default characterReducer;