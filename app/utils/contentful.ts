import * as contentful from "contentful";
import type { Entry, EntryCollection } from "contentful";
import type { ThrownResponse } from "remix";

import type {
  IPage,
  IPageFields,
  LOCALE_CODE,
  ICoach,
  INavigation,
  ITag,
  ICoachtag,
} from "../../@types/generated/contentful";

export type PageNotFoundResponse = ThrownResponse<404, string>;

export const createContentfulClient = () => {
  const space = process.env.CONTENTFUL_SPACE;
  if (!space) {
    throw new Error("Contentful space environment variable is not set");
  }
  const accessToken = process.env.CONTENTFUL_ACCESSTOKEN;
  if (!accessToken) {
    throw new Error("Contentful access token environment variable is not set");
  }
  let client;
  try {
    client = contentful.createClient({
      space,
      accessToken,
    });
  } catch (error) {
    console.log("Could not create client", error);
    throw new Error("CMS client not available");
  }
  return client;
};

type Slug = IPageFields["slug"];

export const getPageById = async (id: string, locale: LOCALE_CODE) => {
  const client = createContentfulClient();
  const entry: Entry<IPageFields> = await client.getEntry(id, {
    locale: locale,
  });

  if (!entry) {
    return null;
  }

  return entry as IPage;
};

export const getMainNav = async (
  locale: LOCALE_CODE
): Promise<INavigation | null> => {
  const client = createContentfulClient();
  const entry: Entry<INavigation> = await client.getEntry(
    "67EXX84GGCZfZayO0JxrFg",
    {
      include: 3,
      locale: locale,
    }
  );

  if (!entry) {
    return null;
  }

  return entry as INavigation;
};

export const getPage = async (slug: Slug, locale: LOCALE_CODE) => {
  const client = createContentfulClient();
  const entries = await client.getEntries({
    content_type: "page",
    "fields.slug[in]": slug,
    locale: locale,
    include: 5,
  });

  if (entries.items.length === 0) {
    return null;
  }

  return entries.items[0] as IPage;
};

function createResult(items: any[]) {
  if (items.length === 0) {
    return null;
  }
  return items;
}

export const getAllPages = async () => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "page",
    locale: "*",
  });

  return createResult(items);
};

export const getBlogposts = async (locale: LOCALE_CODE) => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "blogpost",
    locale: locale,
    include: 5,
    order: "-sys.createdAt",
  });

  return createResult(items);
};

export const getBlogpostTags = async (
  locale: LOCALE_CODE,
  tag: ITag["fields"]["slug"]
) => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "tag",
    locale: locale,
    "fields.slug[in]": tag,
    order: "sys.updatedAt",
  });
  return createResult(items);
};

export const getBlogpost = async (slug: string, locale: LOCALE_CODE) => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "blogpost",
    "fields.slug[in]": slug,
    locale: locale,
    include: 5,
  });

  if (items.length === 0) {
    return null;
  }

  return items[0];
};

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getLanguages = async (): Promise<string[]> => {
  const coaches = await getCoaches("de");

  let languages: string[] = [];

  coaches.forEach((coach) => {
    if (coach.fields.languages) {
      languages.push(...coach.fields.languages);
    }
  });

  const lowercasedLangs = [...new Set(languages)].map((lang) =>
    lang.toLowerCase()
  );

  return [...new Set(lowercasedLangs)].sort();
};

export const getTags = async (locale: LOCALE_CODE = "de") => {
  const client = createContentfulClient();

  const { items } = await client.getEntries({
    content_type: "coachtag",
    order: "fields.tag",
    locale: locale,
  });

  return items as ICoachtag[];
};

export const getCoaches = async (lang: string | null = null) => {
  const client = createContentfulClient();

  const usedLanguage = lang === "de" ? null : lang;

  let options = {};

  const baseOptions = {
    limit: 500,
    content_type: "coach",
    order: "fields.name",
  };

  if (usedLanguage) {
    options = {
      ...baseOptions,
      "fields.languages[in]": usedLanguage,
    };
  } else {
    options = baseOptions;
  }

  const coachesResponse: EntryCollection<ICoach> = await client.getEntries({
    ...options,
  });

  return shuffle(coachesResponse.items) as ICoach[];
};

export const getNetwork = async () => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "network",
    order: "fields.title",
  });

  return createResult(items);
};

export const getSupporters = async () => {
  const client = createContentfulClient();

  const { items } = await client.getEntries({
    content_type: "supporter",
    order: "fields.title",
  });
  return createResult(items);
};

export const getMedia = async () => {
  const client = createContentfulClient();

  const { items } = await client.getEntries({
    content_type: "media",
    order: "fields.title",
  });

  return createResult(items);
};
