import {
  ICoach,
  ICoachtag,
  INavigation,
  IPage,
  LOCALE_CODE,
} from "../../@types/generated/contentful";
import {
  getCoaches,
  getLanguages,
  getMainNav,
  getPageById,
  getTags,
} from "~/utils/contentful";
import pageIds from "~/utils/pageIds";

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
  tags: ICoachtag[] | null;
  availableTagIDs: string[];
  navigation: INavigation | null;
  checkedTags: string[] | null;
  currentLang: string;
  locale: LOCALE_CODE;
  coachesAmount: number;
};

export const getSearchPageContents = async (
  request: Request,
  locale: LOCALE_CODE
): Promise<SearchPageContentResponse> => {
  const searchParams = new URL(request.url).searchParams;
  const lang = searchParams.get("lang") || locale;
  const checkedTags = searchParams.getAll("tag");

  const [page, coaches, languages, tags, navigation]: PromiseResponse =
    await Promise.all([
      getPageById(pageIds.SEARCH_HELP, locale),
      getCoaches(lang),
      getLanguages(),
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
    if (!checkedTags || checkedTags.length === 0) {
      return true;
    }
    return (
      !!coachTags &&
      checkedTags.some((tag) =>
        coachTags.some((cTag: ICoachtag) => cTag.fields.tag === tag)
      )
    );
  });

  // get available tags from all coaches
  const availableTagIDs = coaches
    .map((coach) => coach.fields.tag)
    .filter((tags) => !!tags)
    .map((tags) => tags.map((tag) => tag.sys.id))
    .flat();

  return {
    page,
    coaches: filteredCoaches,
    languages,
    tags,
    navigation,
    checkedTags,
    locale,
    currentLang: lang,
    coachesAmount: filteredCoaches?.length || 0,
    availableTagIDs,
  };
};
