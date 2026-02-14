import {
  getCoaches,
  getEmailTemplate,
  getGender,
  getLanguages,
  getMainNav,
  getPageById,
  getTags,
} from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import type { LOCALE_CODE } from "../../types/contentful";
import { filterCoaches, getAvailableTagIDs } from "./filterCoaches";

export const getSearchPageContents = async (request: Request, locale: LOCALE_CODE) => {
  const searchParams = new URL(request.url).searchParams;
  const lang = searchParams.get("lang") || locale;

  const checkedTags = searchParams.getAll("tag");

  const checkedGender = searchParams.getAll("gender");

  const searchTerm = searchParams.getAll("search");

  const [page, coaches, languages, gender, tags, navigation, emailTemplate] = await Promise.all([
    getPageById(pageIds.SEARCH_HELP, locale),
    getCoaches(lang),
    getLanguages(),
    getGender(),
    getTags(locale),
    getMainNav(locale),
    getEmailTemplate(locale),
  ]);

  if (!coaches || coaches.length === 0) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }

  const filteredCoaches = filterCoaches(coaches, {
    checkedTags,
    checkedGender,
    searchTerm: searchTerm[0] || "",
  });

  const availableTagIDs = getAvailableTagIDs(filteredCoaches);

  return {
    page,
    coaches: filteredCoaches,
    languages,
    gender,
    tags,
    navigation,
    checkedTags,
    checkedGender,
    locale,
    currentLang: lang,
    coachesAmount: filteredCoaches?.length || 0,
    availableTagIDs,
    emailTemplate,
  };
};
