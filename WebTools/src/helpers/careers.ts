﻿import {SkillsHelper} from './skills';
import {TalentViewModel, TalentsHelper, ToViewModel, ADVANCED_TEAM_DYNAMICS} from './talents';
import {character } from '../common/character';
import { CharacterType } from '../common/characterType';

export enum Career {
    // Core
    Young,
    Experienced,
    Veteran
}

export class CareerModel {
    id: Career;
    name: string;
    description: string;
    talent: TalentViewModel[];
    valueDescription: string;

    constructor(id: Career, name: string, description: string, talent: TalentViewModel[], valueDescription: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.talent = talent;
        this.valueDescription = valueDescription;
    }
}

class Careers {
    private _careers: CareerModel[] = [
        new CareerModel(
            Career.Young,
            "Young Officer",
            "The character is defined by their potential more than their skill. Their raw talent and their expectations of what the universe is like have not yet been tempered by reality.",
            [ToViewModel(TalentsHelper.getTalent("Untapped Potential"))],
            "The character receives a Value, which must reflect the character’s inexperience and naïveté in some way."
        ),
        new CareerModel(
            Career.Experienced,
            "Experienced Officer",
            "The character has several years of experience in service of Starfleet, and is enjoying a promising career.",
            TalentsHelper.getTalentsForSkills(SkillsHelper.getSkills()),
            "The character receives a Value, and this can be chosen freely."
        ),
        new CareerModel(
            Career.Veteran,
            "Veteran Officer",
            "The character has decades of experience in the service of Starfleet, and has served on many ships, and starbases. The character’s judgement and opinions are highly-regarded by subordinates, peers, and even superiors.",
            [ToViewModel(TalentsHelper.getTalent("Veteran"))],
            "The character receives a Value, which must reflect the character’s years of experience and the beliefs they’ve formed over their long career."
        ),
    ];

    private _civilianCareers: CareerModel[] = [
        new CareerModel(
            Career.Young,
            "Young",
            "The character is defined by their potential more than their skill. Their raw talent and their expectations of what the universe is like have not yet been tempered by reality.",
            [ToViewModel(TalentsHelper.getTalent("Untapped Potential"))],
            "The character receives a Value, which must reflect the character’s inexperience and naïveté in some way."
        ),
        new CareerModel(
            Career.Experienced,
            "Experienced",
            "The character has several years of experience in service, and is enjoying a promising career.",
            TalentsHelper.getTalentsForSkills(SkillsHelper.getSkills()),
            "The character receives a Value, and this can be chosen freely."
        ),
        new CareerModel(
            Career.Veteran,
            "Veteran",
            "The character has decades of experience in the service, and has served on many ships, worlds, and/or starbases. The character’s judgement and opinions are highly-regarded by subordinates, peers, and even superiors.",
            [ToViewModel(TalentsHelper.getTalent("Veteran"))],
            "The character receives a Value, which must reflect the character’s years of experience and the beliefs they’ve formed over their long career."
        ),
    ];

    private _klingonCareers: CareerModel[] = [
        new CareerModel(
            Career.Young,
            "Young Warrior",
            "The character is defined by their potential more than their skill. Their raw talent and their expectations of what the universe is like have not yet been tempered by reality.",
            [ToViewModel(TalentsHelper.getTalent("Untapped Potential"))],
            "The character receives a Value, which must reflect the character’s inexperience and naïveté in some way."
        ),
        new CareerModel(
            Career.Experienced,
            "Experienced Warrior",
            "The character has several years of experience in service of the Empire and is enjoying a promising career. This is the default assumption for characters created using these rules.",
            TalentsHelper.getTalentsForSkills(SkillsHelper.getSkills()),
            "The character receives a Value, and this can be chosen freely."
        ),
        new CareerModel(
            Career.Veteran,
            "Veteran Officer",
            "The character has decades of experience in the service of the Empire, and has served on many ships and space stations. The character’s judgement and opinions are highly regarded by subordinates, peers, and even superiors.",
            [ToViewModel(TalentsHelper.getTalent("Veteran"))],
            "The character receives a Value, which must reflect the character’s years of experience and the beliefs they’ve formed over their long career."
        ),
    ];

    private getBaseList() {
        if (character.type === CharacterType.KlingonWarrior) {
            return this._klingonCareers;
        } else if (character.type === CharacterType.Starfleet) {
            return this._careers;
        } else {
            return this._civilianCareers; // also allied military
        }
    }

    private getList() {
        let list = this.getBaseList();
        return list.filter(c => c.id !== Career.Young || !character.hasTalent(ADVANCED_TEAM_DYNAMICS));
    }

    getCareers() {
        let careers: CareerModel[] = [];
        let list = this.getList();
        for (let career of list) {
            careers.push(career);
        }

        return careers;
    }

    getCareer(career: Career) {
        var list = this.getBaseList();
        return list[career];
    }

    generateCareer(): Career {
        let list = this.getList();
        var roll = Math.floor(Math.random() * list.length);
        return list[roll].id;
    }

    applyCareer(career: Career) {
    }
}

export const CareersHelper = new Careers();
