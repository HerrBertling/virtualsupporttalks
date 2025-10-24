import contentful from "contentful";
import type {
	LOCALE_CODE,
	TypeCoachSkeleton,
	TypeCoachtagSkeleton,
	TypeNavigationSkeleton,
	TypePageSkeleton,
	TypeTagSkeleton,
	TypeTestimonialsSkeleton,
} from "../../@types/generated/contentful";
import { availableLocales } from "./locales";

export const createContentfulClient = () => {
	const space = process.env.CONTENTFUL_SPACE;
	if (!space) {
		throw new Error("Contentful space environment variable is not set");
	}
	const accessToken = process.env.CONTENTFUL_ACCESSTOKEN;
	if (!accessToken) {
		throw new Error("Contentful access token environment variable is not set");
	}
	let client;
	try {
		client = contentful.createClient({
			space,
			accessToken,
		});
	} catch (error) {
		throw new Error(`CMS client not available: ${error}`);
	}
	return client;
};

export const getPageById = async (id: string, locale: LOCALE_CODE) => {
	const client = createContentfulClient();
	const entry = await client.withoutUnresolvableLinks.getEntry<TypePageSkeleton>(id, {
		locale: locale,
	});

	if (!entry) {
		return null;
	}

	return entry;
};

export const getMainNav = async (locale: LOCALE_CODE) => {
	const client = createContentfulClient();
	const entry = await client.withoutUnresolvableLinks.getEntry<TypeNavigationSkeleton>(
		"67EXX84GGCZfZayO0JxrFg",
		{
			include: 3,
			locale: locale,
		}
	);

	if (!entry) {
		return null;
	}

	return entry;
};

export const getPage = async (slug: string, locale: LOCALE_CODE) => {
	const client = createContentfulClient();
	const entries = await client.withoutUnresolvableLinks.getEntries<TypePageSkeleton>({
		content_type: "page",
		"fields.slug[in]": [slug],
		locale: locale,
		include: 10,
	});

	if (entries.items.length === 0) {
		return null;
	}

	return entries.items[0];
};

function createResult(items: any[]) {
	if (items.length === 0) {
		return null;
	}
	return items;
}

export const getAllPages = async () => {
	const client = createContentfulClient();
	const { items } = await client.getEntries({
		content_type: "page",
		locale: "*",
	});

	return createResult(items);
};

export const getBlogposts = async (locale: LOCALE_CODE) => {
	const client = createContentfulClient();

	const { items } = await client.getEntries({
		content_type: "blogpost",
		locale: locale,
		include: 5,
		order: ["-sys.createdAt"],
	});

	return createResult(items);
};

export const getLatestBlogposts = async (locale: LOCALE_CODE) => {
	const client = createContentfulClient();

	const { items } = await client.getEntries({
		content_type: "blogpost",
		locale: locale,
		include: 5,
		order: ["-sys.createdAt"],
		limit: 3,
	});

	return createResult(items);
};

export const getBlogpostTags = async (locale: LOCALE_CODE, tag: string | undefined) => {
	const client = createContentfulClient();
	const { items } = await client.withoutUnresolvableLinks.getEntries<TypeTagSkeleton>({
		content_type: "tag",
		locale: locale,
		"fields.slug[in]": tag ? [tag] : [],
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

export type EmailTemplate = Awaited<ReturnType<typeof getEmailTemplate>>;

export const getEmailTemplate = async (locale: LOCALE_CODE) => {
	const client = createContentfulClient();
	const { items } = await client.getEntries({
		content_type: "emailTemplate",
		locale: locale,
		include: 1,
	});

	if (items.length === 0) {
		return null;
	}
	return {
		subject: items[0].fields.subject as string,
		content: encodeURI(items[0].fields.emailTemplate as string),
	};
};

function shuffle(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export const getLanguages = async (): Promise<string[]> => {
	const coaches = await getCoaches("de");

	const languages: string[] = [];

	coaches.forEach((coach) => {
		if (coach.fields.languages) {
			languages.push(...coach.fields.languages);
		}
	});

	const lowercasedLangs = [...new Set(languages)].map((lang) => lang.toLowerCase());

	return [...new Set(lowercasedLangs)].sort().filter((lang) => lang !== "ukr");
};

// begin gender
// TODO: getGender requires lang due to getCoaches requires it

export const getGender = async (): Promise<string[]> => {
	const coaches = await getCoaches();

	const gender: string[] = [];

	coaches.forEach((coach) => {
		if (coach.fields.gender) {
			gender.push(...coach.fields.gender);
		}
	});

	const lowercasedGender = [...new Set(gender)].map((gend) => gend.toLowerCase());

	return [...new Set(lowercasedGender)].sort().filter((gend) => gend);
};

export const getTags = async (locale: LOCALE_CODE = "de") => {
	const client = createContentfulClient();

	const { items } = await client.withoutUnresolvableLinks.getEntries<TypeCoachtagSkeleton>({
		content_type: "coachtag",
		locale: locale,
	});

	return items;
};

export const getCoaches = async (lang: string | null = null) => {
	const client = createContentfulClient();

	const usedLanguage = lang === "de" ? null : lang;

	const baseOptions = {
		limit: 500,
		content_type: "coach" as const,
	};

	const options = usedLanguage
		? { ...baseOptions, "fields.languages[in]": usedLanguage }
		: baseOptions;

	const usedLocale = !lang || !availableLocales.includes(lang as LOCALE_CODE) ? "de" : lang;

	const coachesResponse = await client.withoutUnresolvableLinks.getEntries<TypeCoachSkeleton>({
		...options,
		locale: usedLocale,
	});

	return shuffle(coachesResponse.items);
};

export const getNetwork = async () => {
	const client = createContentfulClient();
	const { items } = await client.getEntries({
		content_type: "network",
		order: ["fields.title"],
	});

	return createResult(items);
};

export const getSupporters = async () => {
	const client = createContentfulClient();

	const { items } = await client.getEntries({
		content_type: "supporter",
		order: ["fields.title"],
	});
	return createResult(items);
};

export const getMedia = async () => {
	const client = createContentfulClient();

	const { items } = await client.getEntries({
		content_type: "media",
		order: ["fields.title"],
	});

	return createResult(items);
};

export const getTestimonials = async () => {
	const client = createContentfulClient();

	const { items } = await client.withoutUnresolvableLinks.getEntries<TypeTestimonialsSkeleton>({
		content_type: "testimonials",
		include: 10,
	});

	return items;
};
