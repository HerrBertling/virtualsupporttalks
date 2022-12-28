import {
  getCoaches,
  getLanguages,
  getGender,
  getMainNav,
  getPageById,
  getTags,
} from "~/utils/contentful";
import pageIds from "~/utils/pageIds";
import {
  ICoach,
  ICoachtag,
  INavigation,
  IPage,
  LOCALE_CODE,
} from "../../@types/generated/contentful";

type PromiseResponse = [
  IPage | null,
  ICoach[] | null,
  string[] | null,
  ICoachtag[] | null,
  INavigation | null
];

export type SearchPageContentResponse = {
  page: IPage | null;
  coaches: ICoach[] | null;
  languages: string[] | null;
  gender: string[] | null;
  tags: ICoachtag[] | null;
  availableTagIDs: string[];
  navigation: INavigation | null;
  checkedTags: string[] | null;
  checkedGender: string[] | null;
  currentLang: string;
  currentGender: string;
  locale: LOCALE_CODE;
  coachesAmount: number;
};

export const getSearchPageContents = async (
  request: Request,
  locale: LOCALE_CODE
): Promise<SearchPageContentResponse> => {
  const searchParams = new URL(request.url).searchParams;
  const lang = searchParams.get("lang") || locale;
  const gend = searchParams.get("gend") || locale;
  const checkedTags = searchParams.getAll("tag");
  const checkedGender = searchParams.getAll("gender");

  const [page, coaches, languages, gender, tags, navigation]: PromiseResponse =
    await Promise.all([
      getPageById(pageIds.SEARCH_HELP, locale),
      getCoaches(lang),
      getLanguages(),
      getGender(),
      getTags(locale),
      getMainNav(locale),
    ]);

  if (!coaches || coaches.length === 0) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }

  const filteredCoaches = coaches.filter((coach) => {
    const coachTags = coach.fields.tag;
    const coachGender = coach.fields.gender;
    if (
      (!checkedTags && !checkedGender) ||
      (checkedTags.length === 0 && checkedGender.length === 0)
    ) {
      return true;
    }
    return (
      !!coachTags &&
      !!coachGender &&
      checkedTags.every((tagId) =>
        coachTags.some((cTag: ICoachtag) => cTag.sys.id === tagId)
      ) &&
      checkedGender.every((gendId) =>
        coachGender.some((cGend) => cGend === gendId)
      )
    );
  });

  // get available tags from all coaches
  const availableTagIDs = filteredCoaches
    .map((coach) => coach.fields.tag)
    .filter((tags) => !!tags)
    .map((tags) => tags.map((tag) => tag.sys.id))
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
    currentGender: gend,
    coachesAmount: filteredCoaches?.length || 0,
    availableTagIDs,
  };
};
