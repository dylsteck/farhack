// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"getting-started.mdx": () => import("../content/docs/getting-started.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "next-steps.mdx": () => import("../content/docs/next-steps.mdx?collection=docs"), "participating-in-farhack.mdx": () => import("../content/docs/participating-in-farhack.mdx?collection=docs"), "the-farstack.mdx": () => import("../content/docs/the-farstack.mdx?collection=docs"), "resources/appendix.mdx": () => import("../content/docs/resources/appendix.mdx?collection=docs"), "resources/documentation.mdx": () => import("../content/docs/resources/documentation.mdx?collection=docs"), "resources/open-ideas.mdx": () => import("../content/docs/resources/open-ideas.mdx?collection=docs"), }),
};
export default browserCollections;