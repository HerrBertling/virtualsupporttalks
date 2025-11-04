// Re-export all generated types
export * from "./generated";

// Locale type
export type LOCALE_CODE = "de" | "en" | "ru" | "uk";

// Convenience type aliases with resolved links
import type {
  TypeBlogpost,
  TypeBlogpostFields,
  TypeCoach,
  TypeCoachFields,
  TypeCoachtag,
  TypeCoachtagFields,
  TypeMedia,
  TypeMediaFields,
  TypeNavigation,
  TypeNavigationFields,
  TypeNavigationItem,
  TypeNavigationItemFields,
  TypeNetwork,
  TypeNetworkFields,
  TypePage,
  TypePageFields,
  TypeSupporter,
  TypeSupporterFields,
  TypeTag,
  TypeTagFields,
} from "./generated";

export type IBlogpost = TypeBlogpost<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type IBlogpostFields = TypeBlogpostFields;

export type ICoach = TypeCoach<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type ICoachFields = TypeCoachFields;

export type ICoachtag = TypeCoachtag<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type ICoachtagFields = TypeCoachtagFields;

export type IMedia = TypeMedia<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type IMediaFields = TypeMediaFields;

export type INavigation = TypeNavigation<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type INavigationFields = TypeNavigationFields;

export type INavigationItem = TypeNavigationItem<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type INavigationItemFields = TypeNavigationItemFields;

export type INetwork = TypeNetwork<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type INetworkFields = TypeNetworkFields;

export type IPage = TypePage<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type IPageFields = TypePageFields;

export type ISupporter = TypeSupporter<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type ISupporterFields = TypeSupporterFields;

export type ITag = TypeTag<"WITHOUT_UNRESOLVABLE_LINKS", LOCALE_CODE>;
export type ITagFields = TypeTagFields;
