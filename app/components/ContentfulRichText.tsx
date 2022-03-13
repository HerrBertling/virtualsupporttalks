import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Options } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import { ReactNode } from "react";
import { Link } from "remix";
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
        withProse && "prose lg:prose-lg max-w-none prose-headings:font-headline"
      } ${
        useWhiteProse &&
        "prose-white prose-a:text-vsp-300 hover:prose-a:text-vsp-100"
      }`}
    >
      {content && documentToReactComponents(content, options)}
    </div>
  );
}
