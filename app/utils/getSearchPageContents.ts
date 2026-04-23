import { data } from "react-router";
import {
  extractGender,
  extractLanguages,
  getCoaches,
  getEmailTemplate,
  getMainNav,
  getPageById,
  getTags,
} from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import type { LOCALE_CODE } from "../../types/contentful";
import { ensureFound } from "./ensureFound";
import { filterCoaches, getAvailableTagIDs } from "./filterCoaches";

export const getSearchPageContents = async (request: Request, locale: LOCALE_CODE) => {
  const searchParams = new URL(request.url).searchParams;
  const lang = searchParams.get("lang") || locale;

  const checkedTags = searchParams.getAll("tag");

  const checkedGender = searchParams.getAll("gender");

  const searchTerm = searchParams.getAll("search");

  const [page, coaches, tags, navigation, emailTemplate] = await Promise.all([
    getPageById(pageIds.SEARCH_HELP, locale),
    getCoaches(lang),
    getTags(locale),
    getMainNav(locale),
    getEmailTemplate(locale),
  ]);

  const validCoaches = ensureFound(coaches, "Could not load coaches");
  const languages = extractLanguages(validCoaches);
  const gender = extractGender(validCoaches);

  const validPage = ensureFound(page, "Could not load page");
  const validNavigation = ensureFound(navigation, "Could not load navigation");
  const navItems = (validNavigation.fields.items ?? []).filter(
    (item): item is NonNullable<typeof item> => item !== undefined
  );

  if (validCoaches.length === 0) {
    throw new Response("No coaches found", { status: 404 });
  }

  const filteredCoaches = filterCoaches(validCoaches, {
    checkedTags,
    checkedGender,
    searchTerm: searchTerm[0] || "",
  });

  const availableTagIDs = getAvailableTagIDs(filteredCoaches);

  return data(
    {
      page: validPage,
      coaches: filteredCoaches,
      languages,
      gender,
      tags: tags ?? [],
      navItems,
      checkedTags,
      checkedGender,
      locale,
      currentLang: lang,
      coachesAmount: filteredCoaches?.length || 0,
      availableTagIDs,
      emailTemplate,
    },
    {
      headers: {
        "Cache-Tag": `entry:${validPage.sys.id},collection:coach,collection:coachtag,nav:${locale}`,
      },
    }
  );
};
