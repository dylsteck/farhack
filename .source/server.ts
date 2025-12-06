// @ts-nocheck
import * as __fd_glob_8 from "../content/docs/resources/open-ideas.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/resources/documentation.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/resources/appendix.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/the-farstack.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/participating-in-farhack.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/next-steps.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/getting-started.mdx?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, }, {"getting-started.mdx": __fd_glob_1, "index.mdx": __fd_glob_2, "next-steps.mdx": __fd_glob_3, "participating-in-farhack.mdx": __fd_glob_4, "the-farstack.mdx": __fd_glob_5, "resources/appendix.mdx": __fd_glob_6, "resources/documentation.mdx": __fd_glob_7, "resources/open-ideas.mdx": __fd_glob_8, });