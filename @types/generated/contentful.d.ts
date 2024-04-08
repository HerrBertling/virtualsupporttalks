// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IBlogpostFields {
  /** Titel */
  title?: string | undefined;

  /** Slug (DO NOT TOUCH!) */
  slug?: string | undefined;

  /** Beschreibung */
  description?: string | undefined;

  /** Inhalt */
  content: (
    | IImageCollection
    | IGenericContent
    | IHeaderBlock
    | IContentImageBg
    | IContentWithFullSizeImage
    | ICenteredContent
    | ITwoImages
  )[];

  /** seo */
  seo?: ISeo | undefined;

  /** Hauptbild */
  mainImage?: Asset | undefined;

  /** Schlagworte */
  tagList?: ITag[] | undefined;
}

/** Ein Blogpost */

export interface IBlogpost extends Entry<IBlogpostFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "blogpost";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IBlogPreviewFields {
  /** Default text */
  defaultText?: string | undefined;

  /** Title and header */
  titleAndHeader: Document;

  /** Label for button */
  buttonText?: string | undefined;
}

/** Block to display a blog preview */

export interface IBlogPreview extends Entry<IBlogPreviewFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "BlogPreview";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ICenteredContentFields {
  /** Inhalt */
  content?: Document | undefined;

  /** Textfarbe */
  textcolor?: string | undefined;

  /** Hintergrundfarbe */
  backgroundcolor?: string | undefined;

  /** Interner Titel */
  title?: string | undefined;

  /** Button-Text */
  buttonText?: string | undefined;

  /** Button-URL */
  buttonUrl?: string | undefined;

  /** Hintergrundfarbe */
  bgcolor?: "white" | "gray" | "green" | undefined;
}

/** Zentrierter Inhalt mit farbigem Hintergrund */

export interface ICenteredContent extends Entry<ICenteredContentFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "centeredContent";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ICoachFields {
  /** Name */
  name: string;

  /** E-Mail */
  email?: string | undefined;

  /** Webseite */
  url?: string | undefined;

  /** Telefonnumber */
  phone?: string | undefined;

  /** Sprachen */
  languages?: string[] | undefined;

  /** Gender */
  gender: ("weiblich" | "männlich" | "divers")[];

  /** Bild */
  image?: Asset | undefined;

  /** MHFA Training */
  mhfaTraining?: Asset | undefined;

  /** Completed MHFA Training */
  completedMhfaTraining?: string | undefined;

  /** Beschreibung */
  description?: Document | undefined;

  /** Tags */
  tag?: ICoachtag[] | undefined;

  /** In dringenden Fällen erreichbar */
  emergency?: boolean | undefined;
}

/** Die Coaches */

export interface ICoach extends Entry<ICoachFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "coach";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ICoachListFields {
  /** Interner Titel */
  internalTitle?: string | undefined;
}

/** Die Liste der Coaches, inklusive Filter etc. */

export interface ICoachList extends Entry<ICoachListFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "coachList";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ICoachtagFields {
  /** tag */
  tag: string;
}

/** Tags für die Coaches */

export interface ICoachtag extends Entry<ICoachtagFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "coachtag";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IContentImageBgFields {
  /** Hintergrundbild */
  backgroundImage?: Asset | undefined;

  /** Inhalt */
  content?: Document | undefined;

  /** Interner Titel */
  title?: string | undefined;

  /** Button-Text */
  buttonText?: string | undefined;

  /** Button-URL */
  buttonUrl?: string | undefined;

  /** Mit Amazon-Smile-Banner */
  withCharityBanner?: boolean | undefined;
}

/** Inhalt mit Hintergrundbild */

export interface IContentImageBg extends Entry<IContentImageBgFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "contentImageBg";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IContentWithFullSizeImageFields {
  /** Inhalt */
  content?: Document | undefined;

  /** Hintergrundfarbe */
  backgroundcolor?: string | undefined;

  /** Bild */
  image?: Asset | undefined;

  /** Bild rechts */
  imageRight?: boolean | undefined;

  /** Interner Titel */
  title?: string | undefined;
}

/** Inhalt mit vollflächigem Bild links oder rechts */

export interface IContentWithFullSizeImage
  extends Entry<IContentWithFullSizeImageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "contentWithFullSizeImage";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IContributorFields {
  /** Vorname */
  firstname?: string | undefined;

  /** Nachname */
  lastname?: string | undefined;

  /** Position */
  position?: string | undefined;

  /** Webseite */
  url?: string | undefined;

  /** Slug (DO NOT TOUCH!) */
  slug?: string | undefined;

  /** Bild */
  image?: Asset | undefined;

  /** Beschreibung */
  content?: Document | undefined;
}

/** Die Organisatoren */

export interface IContributor extends Entry<IContributorFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "contributor";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IEmailTemplateFields {
  /** Subject */
  subject?: string | undefined;

  /** Email template */
  emailTemplate?: string | undefined;
}

export interface IEmailTemplate extends Entry<IEmailTemplateFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "emailTemplate";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IGenericContentFields {
  /** Interner Titel */
  title?: string | undefined;

  /** Inhalt */
  content?: Document | undefined;
}

/** Einfacher Inhalt ohne spezielles Design drumherum (Impressum, "normale" Inhaltsblöcke etc.) */

export interface IGenericContent extends Entry<IGenericContentFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "genericContent";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IHeaderBlockFields {
  /** Interner Titel */
  title?: string | undefined;

  /** Hintergrundbild */
  image?: Asset | undefined;

  /** Hintergrundfarbe */
  backgroundcolor?: string | undefined;

  /** Inhalt */
  content?: Document | undefined;

  /** Button-Text */
  buttonText?: string | undefined;

  /** Button-URL */
  buttonUrl?: string | undefined;
}

/** Großer Header-Block am Seitenanfang mit Bild + Hintergrundfarbe */

export interface IHeaderBlock extends Entry<IHeaderBlockFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "headerBlock";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IImageCollectionFields {
  /** Interner Titel */
  internalTitle?: string | undefined;

  /** Bilder */
  images?: IImageWithLink[] | undefined;
}

/** Eine Sammlung von Bildern, wird ab Tablet zweispaltig angezeigt, auf kleineren Bildschirmen einspaltig. */

export interface IImageCollection extends Entry<IImageCollectionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "imageCollection";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IImageWithLinkFields {
  /** Interner Titel */
  internalTitle?: string | undefined;

  /** URL */
  url?: string | undefined;

  /** Bild */
  image?: Asset | undefined;
}

/** Ein Bild mit optionalem Link. Ist keine URL dabei, wird nur das Bild angezeigt. Ist halt nix klickbar, wie auch :P */

export interface IImageWithLink extends Entry<IImageWithLinkFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "ImageWithLink";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IMediaFields {
  /** URL */
  url?: string | undefined;

  /** Bild */
  image?: Asset | undefined;

  /** Titel */
  title?: string | undefined;
}

/** Links zu Medien */

export interface IMedia extends Entry<IMediaFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "media";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface INavigationFields {
  /** Interner Titel */
  internalTitle?: string | undefined;

  /** Items */
  items?: INavigationItem[] | undefined;
}

/** Eine Sammlung von Seiten, so lässt sich insbesondere die Hauptnavigation aus dem CMS heraus bestücken. */

export interface INavigation extends Entry<INavigationFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "navigation";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface INavigationItemFields {
  /** Titel */
  title?: string | undefined;

  /** Seite */
  page?: IPage | undefined;

  /** URL */
  url?: string | undefined;
}

/** Ein Item in der Navigation */

export interface INavigationItem extends Entry<INavigationItemFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "navigationItem";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface INetworkFields {
  /** Titel */
  title?: string | undefined;

  /** Bild */
  image?: Asset | undefined;

  /** URL */
  url?: string | undefined;
}

/** Partner im Projektnetzwerk */

export interface INetwork extends Entry<INetworkFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "network";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPageFields {
  /** Titel */
  title?: string | undefined;

  /** Slug (DO NOT TOUCH!) */
  slug?: string | undefined;

  /** Inhalt */
  content: (
    | IImageCollection
    | ICoachList
    | IGenericContent
    | IHeaderBlock
    | IContentImageBg
    | IContentWithFullSizeImage
    | ICenteredContent
    | IVideoPlayer
    | ITwoImages
    | ITrackingGa
    | IBlogPreview
    | ITeamSection
  )[];

  /** seo */
  seo?: ISeo | undefined;
}

/** Eine einzelne Seite */

export interface IPage extends Entry<IPageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "page";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ISeoFields {
  /** Titel */
  title?: string | undefined;

  /** Description */
  description?: string | undefined;

  /** Bild */
  image?: Asset | undefined;
}

/** Alle Suchmaschinen-relevanten Felder */

export interface ISeo extends Entry<ISeoFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "seo";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ISupporterFields {
  /** Titel */
  title?: string | undefined;

  /** Bild */
  image?: Asset | undefined;

  /** URL */
  url?: string | undefined;
}

/** Unterstützer des Projekts */

export interface ISupporter extends Entry<ISupporterFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "supporter";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITagFields {
  /** Schlagwort */
  tagName?: string | undefined;

  /** Slug */
  slug?: string | undefined;
}

/** Ein Schlagwort – Name sowie URL-Pfad muss man beide angeben :) */

export interface ITag extends Entry<ITagFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "tag";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITeamSectionFields {
  /** Title */
  title: string;

  /** Team members */
  teamMembers: IContributor[];

  /** Description */
  description: string;
}

/** Team section – shows parts or all of the team members. You need to add everyone if you want to show the whole team here. */

export interface ITeamSection extends Entry<ITeamSectionFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "teamSection";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITrackingGaFields {
  /** Title */
  title: string;
}

/** Empty component to track conversion from Google Ads */

export interface ITrackingGa extends Entry<ITrackingGaFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "trackingGa";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITwoImagesFields {
  /** Interner Titel */
  title?: string | undefined;

  /** Bild 1 */
  image1?: Asset | undefined;

  /** Überschrift 1 */
  text1?: string | undefined;

  /** Link 1 */
  link1?: string | undefined;

  /** Bild 2 */
  image2?: Asset | undefined;

  /** Überschrift 2 */
  text2?: string | undefined;

  /** Link 2 */
  link2?: string | undefined;
}

/** Zwei Bilder mit Überschrift als Links */

export interface ITwoImages extends Entry<ITwoImagesFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "twoImages";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IVideoPlayerFields {
  /** videoID */
  videoId: string;

  /** title */
  title?: string | undefined;

  /** Content */
  content?: Document | undefined;

  /** Show only on german page */
  showOnlyOnGermanPage?: boolean | undefined;
}

/** Component to display videos */

export interface IVideoPlayer extends Entry<IVideoPlayerFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "videoPlayer";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "blogpost"
  | "BlogPreview"
  | "centeredContent"
  | "coach"
  | "coachList"
  | "coachtag"
  | "contentImageBg"
  | "contentWithFullSizeImage"
  | "contributor"
  | "emailTemplate"
  | "genericContent"
  | "headerBlock"
  | "imageCollection"
  | "ImageWithLink"
  | "media"
  | "navigation"
  | "navigationItem"
  | "network"
  | "page"
  | "seo"
  | "supporter"
  | "tag"
  | "teamSection"
  | "trackingGa"
  | "twoImages"
  | "videoPlayer";

export type IEntry =
  | IBlogpost
  | IBlogPreview
  | ICenteredContent
  | ICoach
  | ICoachList
  | ICoachtag
  | IContentImageBg
  | IContentWithFullSizeImage
  | IContributor
  | IEmailTemplate
  | IGenericContent
  | IHeaderBlock
  | IImageCollection
  | IImageWithLink
  | IMedia
  | INavigation
  | INavigationItem
  | INetwork
  | IPage
  | ISeo
  | ISupporter
  | ITag
  | ITeamSection
  | ITrackingGa
  | ITwoImages
  | IVideoPlayer;

export type LOCALE_CODE = "de" | "en" | "ru" | "uk";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "de";
