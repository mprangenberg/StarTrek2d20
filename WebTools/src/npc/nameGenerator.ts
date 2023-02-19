import { D20 } from "../common/die";
import { SpeciesModel } from "../helpers/species";

const names = require('./names.json')

export class NameGenerator {

    private static _instance: NameGenerator;

    static get instance() {
        if (NameGenerator._instance == null) {
            NameGenerator._instance = new NameGenerator();
        }
        return NameGenerator._instance;
    }

    createName(species: SpeciesModel) {

        let result = "";
        for (let name of names) {
            if (name.species === species.name) {

                let lastNames = name.names.filter(n => n.type === 'LastName');
                if (lastNames.length > 0) {
                    let r = Math.floor(Math.random() * lastNames.length);
                    let lastName = lastNames[r];

                    let firstNames = name.names
                        .filter(n => n.type === 'FirstName')
                        .filter(n => {
                            let ok = (n.gender === lastName.gender || n.gender === 'Unisex' || lastName.gender === 'Unisex');
                            if (ok) {
                                let found = (n.tags.indexOf("Common") >= 0);
                                for (let tag of lastName.tags) {
                                    if (n.tags.indexOf(tag) >= 0) {
                                        found = true;
                                        break;
                                    }
                                }
                                return found;
                            } else {
                                return ok;
                            }
                        });
                    let firstName = null;
                    if (firstNames.length > 0) {
                        let r = Math.floor(Math.random() * firstNames.length);
                        firstName = firstNames[r];
                    }

                    let firstNameString = null;
                    if (firstName != null) {
                        firstNameString = firstName.name;
                        if (firstName.variants && D20.roll() <= 10) {
                            firstNameString = firstName.variants[Math.floor(Math.random() * firstName.variants.length)];
                        }
                    }
                    result = (firstNameString != null ? firstNameString + " " : "") + lastName.name;
                }
                break;
            }
        }

        return result;
    }
}
