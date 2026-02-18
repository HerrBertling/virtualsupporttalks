import type { ICoach } from "../../types/contentful";
import { documentContentToSimpleString } from "./documentToSimpleString";

type FilterOptions = {
  checkedTags: string[];
  checkedGender: string[];
  searchTerm: string;
};

export function filterCoaches(coaches: ICoach[], options: FilterOptions): ICoach[] {
  const { checkedTags, checkedGender, searchTerm } = options;

  return coaches
    .filter((coach) => {
      const coachTags = coach.fields.tag;
      if (!checkedTags || checkedTags.length === 0) {
        return true;
      }
      return (
        !!coachTags &&
        checkedTags.every((tagId) => coachTags.some((cTag) => cTag && cTag.sys.id === tagId))
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
      if (searchTerm && searchTerm !== "") {
        const description = documentContentToSimpleString(coach.fields.description?.content);
        const searchRegex = new RegExp(searchTerm, "i");
        return `${coach.fields.name} ${description}`.match(searchRegex);
      }
      return true;
    });
}

export function getAvailableTagIDs(coaches: ICoach[]): string[] {
  return coaches
    .map((coach) => coach.fields.tag)
    .filter((tags) => !!tags)
    .flatMap((tags) => tags?.filter((tag) => !!tag).map((tag) => tag.sys.id));
}
