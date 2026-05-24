import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPublicPageBySlug } from "@/lib/pages.functions";
import { brand } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

const pageQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public-page", slug],
    queryFn: () => getPublicPageBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/p/$slug")({
  loader: async ({ context, params }) => {
    const page = await context.queryClient.fetchQuery(pageQuery(params.slug));
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const title = loaderData.meta_title || `${loaderData.title} | ${brand.name}`;
    const description = loaderData.meta_description || loaderData.excerpt || "";
    const meta: Array<Record<string, string>> = [
      { title },
      { property: "og:title", content: loaderData.og_title || title },
      { property: "og:site_name", content: brand.name },
    ];
    if (loaderData.meta_keywords) meta.push({ name: "keywords", content: loaderData.meta_keywords });
    if (description) {
      meta.push({ name: "description", content: description });
      meta.push({ property: "og:description", content: loaderData.og_description || description });
    }
    if (loaderData.og_image_url) {
      meta.push({ property: "og:image", content: loaderData.og_image_url });
      meta.push({ name: "twitter:image", content: loaderData.og_image_url });
    }
    return { meta, links: [{ rel: "canonical", href: loaderData.canonical_url || absoluteUrl(`/p/${loaderData.slug}`) }] };
  },
  component: PublicPage,
  notFoundComponent: () => (
    <div className="container-px mx-auto max-w-3xl py-24 text-center">
      <h1 className="font-display text-3xl">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or isn't published.</p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-px mx-auto max-w-3xl py-24 text-center">
      <h1 className="font-display text-2xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function PublicPage() {
  const { data } = useSuspenseQuery(pageQuery(Route.useParams().slug));
  if (!data) return null;
  return (
    <article className="container-px mx-auto max-w-3xl py-16 sm:py-24">
      <header className="mb-8">
        <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">{data.title}</h1>
        {data.excerpt && <p className="mt-3 text-base text-muted-foreground">{data.excerpt}</p>}
      </header>
      <div
        className="prose prose-neutral max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: data.content_html || "" }}
      />
    </article>
  );
}
