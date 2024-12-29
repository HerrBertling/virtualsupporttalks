import {
  getCoaches,
  getLanguages,
  getGender,
  getMainNav,
  getPageById,
  getTags,
  getEmailTemplate,
} from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import type { ICoachtag, LOCALE_CODE } from "../../@types/generated/contentful";
import { documentContentToSimpleString } from "./documentToSimpleString";

export const getSearchPageContents = async (
  request: Request,
  locale: LOCALE_CODE,
) => {
  const searchParams = new URL(request.url).searchParams;
  const lang = searchParams.get("lang") || locale;

  const checkedTags = searchParams.getAll("tag");

  const checkedGender = searchParams.getAll("gender");

  const searchTerm = searchParams.getAll("search");

  const [page, coaches, languages, gender, tags, navigation, emailTemplate] =
    await Promise.all([
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
        checkedTags.every((tagId) =>
          coachTags.some((cTag: ICoachtag) => cTag.sys.id === tagId),
        )
      );
    })
    .filter((coach) => {
      const coachGenders = coach.fields.gender;
      if (!checkedGender || checkedGender.length === 0) {
        return true;
      }

      return (
        !!coachGenders &&
        coachGenders.some((gender) => checkedGender.includes(gender))
      );
    })
    .filter((coach) => {
      if (searchTerm[0] && searchTerm[0] != "") {
        const description = documentContentToSimpleString(
          coach.fields.description?.content,
        );
        return `${coach.fields.name} ${description}`.includes(searchTerm[0]);
      } else {
        return true;
      }
    });

  // get available tags from all coaches

  const availableTagIDs = filteredCoaches
    .map((coach) => coach.fields.tag)
    .filter((tags) => !!tags)
    .map((tags) => tags?.map((tag) => tag.sys.id))
    .flat();

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
