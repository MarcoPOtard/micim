import type { SchemaTypeDefinition } from "sanity";

import { seo } from "./objects/seo";
import { slide } from "./objects/slide";
import { socialLink } from "./objects/socialLink";
import { navigationLink } from "./objects/navigationLink";
import { siteSettings } from "./documents/siteSettings";
import { homePage } from "./documents/homePage";
import { associationPage } from "./documents/associationPage";
import { agendaPage } from "./documents/agendaPage";
import { contactPage } from "./documents/contactPage";
import { mentionsLegalesPage } from "./documents/mentionsLegalesPage";
import { show } from "./documents/show";
import { stagesPage } from "./documents/stagesPage";
import { stage } from "./documents/stage";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        seo,
        slide,
        socialLink,
        navigationLink,
        siteSettings,
        homePage,
        associationPage,
        agendaPage,
        contactPage,
        mentionsLegalesPage,
        show,
        stagesPage,
        stage,
    ],
};
