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
import type { ICoachtag, LOCALE_CODE } from "../../types/contentful";
import { documentContentToSimpleString } from "./documentToSimpleString";

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

  const filteredCoaches = coaches
    .filter((coach) => {
      const coachTags = coach.fields.tag;
      if (!checkedTags || checkedTags.length === 0) {
        return true;
      }

      return (
        !!coachTags &&
        checkedTags.every((tagId) => coachTags.some((cTag: ICoachtag) => cTag.sys.id === tagId))
      );
    })
    .filter((coach) => {
      const coachGenders = coach.fields.gender;
      if (!checkedGender || checkedGender.length === 0) {
        return true;
      }

      return (
        !!coachGenders && coachGenders.some((gender: string) => checkedGender.includes(gender))
      );
    })
    .filter((coach) => {
      if (searchTerm[0] && searchTerm[0] !== "") {
        const description = documentContentToSimpleString(coach.fields.description?.content);
        const searchRegex = new RegExp(searchTerm[0], "i");
        return `${coach.fields.name} ${description}`.match(searchRegex);
      } else {
        return true;
      }
    });

  // get available tags from all coaches

  const availableTagIDs = filteredCoaches
    .map((coach) => coach.fields.tag)
    .filter((tags) => !!tags)
    .flatMap((tags) => tags?.map((tag: { sys: { id: string } }) => tag.sys.id));

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
