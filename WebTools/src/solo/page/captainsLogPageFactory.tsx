import { ConstructType } from "../../common/construct";
import { IPageFactoryRegistry } from "../../pages/pageFactory";
import { PageIdentity } from "../../pages/pageIdentity";
import SoloConstructTypePage from "./soloConstructTypePage";
import SoloEnvironmentDetailsPage from "./soloEnvironmentDetailsPage";
import SoloEnvironmentPage from "./soloEnvironmentPage";
import SoloEraSelectionPage from "./soloEraSelectionPage";
import SoloSpeciesDetailsPage from "./soloSpeciesDetailsPage";
import SoloSpeciesPage from "./soloSpeciesPage";

export class CaptainsLogPageFactory implements IPageFactoryRegistry {

    private static _instance;

    static get instance() {
        if (CaptainsLogPageFactory._instance == null) {
            CaptainsLogPageFactory._instance = new CaptainsLogPageFactory();
        }
        return CaptainsLogPageFactory._instance;
    }

    private factories = {};

    constructor() {
        this.factories = {};

        this.factories[PageIdentity.SoloConstructType] = () => <SoloConstructTypePage />;
        this.factories[PageIdentity.SoloCharacterEra] = () => <SoloEraSelectionPage type={ConstructType.Character} />;
        this.factories[PageIdentity.SoloSpecies] = () => <SoloSpeciesPage />;
        this.factories[PageIdentity.SoloSpeciesDetails] = () => <SoloSpeciesDetailsPage />;
        this.factories[PageIdentity.SoloEnvironment] = () => <SoloEnvironmentPage />;
        this.factories[PageIdentity.SoloEnvironmentDetails] = () => <SoloEnvironmentDetailsPage />;
    }

    findFactory(page: PageIdentity) {
        return this.factories[page];
    }
}