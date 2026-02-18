import { describe, expect, test } from "vitest";
import type { ICoach, ICoachtag } from "../../types/contentful";
import { filterCoaches, getAvailableTagIDs } from "./filterCoaches";

function createCoach(
  overrides: Partial<ICoach["fields"]> & { name: string; tag?: ICoachtag[] }
): ICoach {
  return {
    sys: {
      id: overrides.name,
      contentType: { sys: { id: "coach", type: "Link", linkType: "ContentType" } },
      type: "Entry",
      createdAt: "",
      updatedAt: "",
      locale: "de",
      space: { sys: { type: "Link", linkType: "Space", id: "" } },
      environment: { sys: { type: "Link", linkType: "Environment", id: "" } },
      revision: 0,
    },
    fields: {
      email: overrides.email,
      languages: overrides.languages ?? ["de"],
      gender: overrides.gender ?? ["weiblich"],
      tag: overrides.tag ?? [],
      description: overrides.description,
      name: overrides.name,
    },
    metadata: { tags: [] },
  } as unknown as ICoach;
}

function createTag(id: string) {
  return { sys: { id }, fields: { tag: id } } as unknown as ICoachtag;
}

const coaches = [
  createCoach({
    name: "Anna",
    languages: ["de", "en"],
    gender: ["weiblich"],
    tag: [createTag("tag-anxiety"), createTag("tag-stress")],
  }),
  createCoach({
    name: "Boris",
    languages: ["de", "ru"],
    gender: ["männlich"],
    tag: [createTag("tag-stress")],
  }),
  createCoach({
    name: "Clara",
    languages: ["en"],
    gender: ["divers"],
    tag: [createTag("tag-anxiety"), createTag("tag-grief")],
  }),
];

const noFilters = { checkedTags: [], checkedGender: [], searchTerm: "" };

describe("filterCoaches", () => {
  test("returns all coaches when no filters applied", () => {
    const result = filterCoaches(coaches, noFilters);
    expect(result).toHaveLength(3);
  });

  test("filters by single tag", () => {
    const result = filterCoaches(coaches, {
      ...noFilters,
      checkedTags: ["tag-anxiety"],
    });
    expect(result.map((c) => c.fields.name)).toEqual(["Anna", "Clara"]);
  });

  test("filters by multiple tags (AND logic)", () => {
    const result = filterCoaches(coaches, {
      ...noFilters,
      checkedTags: ["tag-anxiety", "tag-stress"],
    });
    expect(result.map((c) => c.fields.name)).toEqual(["Anna"]);
  });

  test("filters by gender", () => {
    const result = filterCoaches(coaches, {
      ...noFilters,
      checkedGender: ["männlich"],
    });
    expect(result.map((c) => c.fields.name)).toEqual(["Boris"]);
  });

  test("filters by multiple genders (OR logic)", () => {
    const result = filterCoaches(coaches, {
      ...noFilters,
      checkedGender: ["weiblich", "divers"],
    });
    expect(result.map((c) => c.fields.name)).toEqual(["Anna", "Clara"]);
  });

  test("filters by search term (case-insensitive name match)", () => {
    const result = filterCoaches(coaches, {
      ...noFilters,
      searchTerm: "anna",
    });
    expect(result.map((c) => c.fields.name)).toEqual(["Anna"]);
  });

  test("combines tag and gender filters", () => {
    const result = filterCoaches(coaches, {
      ...noFilters,
      checkedTags: ["tag-stress"],
      checkedGender: ["weiblich"],
    });
    expect(result.map((c) => c.fields.name)).toEqual(["Anna"]);
  });

  test("returns empty when no coaches match", () => {
    const result = filterCoaches(coaches, {
      ...noFilters,
      checkedTags: ["tag-nonexistent"],
    });
    expect(result).toHaveLength(0);
  });

  test("handles coaches with no tags", () => {
    const coachesWithNoTags = [
      createCoach({ name: "Diana", tag: undefined as unknown as ICoachtag[] }),
    ];
    const result = filterCoaches(coachesWithNoTags, {
      ...noFilters,
      checkedTags: ["tag-anxiety"],
    });
    expect(result).toHaveLength(0);
  });
});

describe("getAvailableTagIDs", () => {
  test("returns unique tag IDs from coaches", () => {
    const result = getAvailableTagIDs(coaches);
    expect(result).toContain("tag-anxiety");
    expect(result).toContain("tag-stress");
    expect(result).toContain("tag-grief");
  });

  test("returns empty array for coaches with no tags", () => {
    const coachesWithNoTags = [
      createCoach({ name: "Diana", tag: undefined as unknown as ICoachtag[] }),
    ];
    const result = getAvailableTagIDs(coachesWithNoTags);
    expect(result).toEqual([]);
  });
});
