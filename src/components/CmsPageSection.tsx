import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPublicPageBySlug } from "@/lib/pages.functions";

export function CmsPageSection({ slug }: { slug: string }) {
  const getPage = useServerFn(getPublicPageBySlug);
  const { data } = useQuery({
    queryKey: ["public-page", slug],
    queryFn: () => getPage({ data: { slug } }),
  });

  if (!data?.content_html) return null;

  return (
    <section className="container-px mx-auto max-w-5xl py-16">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-10">
        <div
          className="prose prose-neutral max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.content_html }}
        />
      </div>
    </section>
  );
}
