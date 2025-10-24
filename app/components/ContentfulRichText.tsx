import type { Options } from "@contentful/rich-text-react-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { INLINES } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import CleverLink from "./CleverLink";

type ContentfulRichTextProps = {
  content: Document;
  withProse?: boolean;
  useWhiteProse?: boolean;
};

export default function ContentfulRichText({
  content,
  withProse = true,
  useWhiteProse = false,
}: ContentfulRichTextProps) {
  const options: Options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children: ReactNode) => (
        <CleverLink to={node.data.uri} prefetch="intent">
          {node.data.url} {children}
        </CleverLink>
      ),
    },
  };
  return (
    <div
      className={`richtext prose-a:text-vsp-600 hover:prose-a:text-vsp-700 lg:prose-h1:leading-tight ${
        withProse && "prose prose-slate max-w-none lg:prose-lg prose-headings:font-headline"
      } ${useWhiteProse && "prose-white prose-a:text-vsp-300 hover:prose-a:text-vsp-100"}`}
    >
      {content && documentToReactComponents(content, options)}
    </div>
  );
}
