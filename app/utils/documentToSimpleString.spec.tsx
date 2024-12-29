import { expect, test } from "vitest";
import { documentContentToSimpleString } from "./documentToSimpleString";
const exampleDescription = {
  data: {},
  content: [
    {
      data: {},
      content: [
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "A",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
          ],
          nodeType: "list-item",
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "B",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
          ],
          nodeType: "list-item",
        },
        {
          data: {},
          content: [
            {
              data: {},
              content: [
                {
                  data: {},
                  marks: [],
                  value: "C",
                  nodeType: "text",
                },
              ],
              nodeType: "paragraph",
            },
          ],
          nodeType: "list-item",
        },
      ],
      nodeType: "unordered-list",
    },
    {
      data: {},
      content: [
        {
          data: {},
          marks: [],
          value: "",
          nodeType: "text",
        },
      ],
      nodeType: "paragraph",
    },
  ],
  nodeType: "document",
};

test("get simple string from Document object", () => {
  const simpleText = documentContentToSimpleString(exampleDescription.content);
  expect(simpleText).toEqual("ABC");
});
