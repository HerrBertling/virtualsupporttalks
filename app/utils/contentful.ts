import contentful, { EntryCollection } from "contentful";
import type { Entry } from "contentful";
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
  return contentful.createClient({
    space,
    accessToken,
  });
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

export const getMainNav = async (locale: LOCALE_CODE) => {
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

export const getBlogposts = async (locale: LOCALE_CODE) => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "blogpost",
    locale: locale,
    include: 5,
    order: "sys.updatedAt",
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

export const getLanguages = async () => {
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

export const getTags = async () => {
  const coaches = await getCoaches("de");

  let tags: string[] = [];

  coaches.forEach((coach) => {
    if (coach.fields.tag) {
      coach.fields.tag.forEach((coachTag: ICoachtag) => {
        tags.push(coachTag.fields.tag);
      });
    }
  });

  return [...new Set(tags)].sort();
};

export const getCoaches = async (
  lang: string | null = null,
  locale: LOCALE_CODE = "de"
) => {
  const client = createContentfulClient();

  const usedLanguage = lang === "de" ? null : lang;

  const coachesResponse: EntryCollection<ICoach> = await client.getEntries({
    limit: 500,
    content_type: "coach",
    order: "fields.name",
    locale: usedLanguage,
  });

  console.log(coachesResponse.items.length);

  return shuffle(coachesResponse.items);
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
