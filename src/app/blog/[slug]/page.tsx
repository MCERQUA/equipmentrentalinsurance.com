import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";
import { SITE } from "@/lib/site";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE.url}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, siteName: SITE.name, title: post.title, description: post.description, publishedTime: post.date, authors: post.author ? [post.author] : undefined },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${slug}`;
  const html = markdownToHtml(post.content);
  const more = getAllPosts().filter((p) => p.slug !== slug).slice(0, 3);

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: post.author ? { "@type": "Person", name: post.author } : { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "InsuranceAgency", name: SITE.name, url: SITE.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <main>
        <article className="bg-cream pt-32 pb-16 md:pt-40">
          <div className="container-tight max-w-3xl">
            <FadeIn>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-clay hover:gap-2.5 transition-all mb-8"><ArrowLeft className="h-4 w-4" />All articles</Link>

              <div className="flex flex-wrap items-center gap-3 text-xs text-mocha mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-clay/10 text-clay rounded-md font-heading font-semibold"><Tag className="h-3 w-3" />{post.category}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
              </div>

              <h1 className="font-heading font-extrabold text-espresso text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">{post.title}</h1>
              {post.author && <p className="mt-4 text-mocha">By {post.author}</p>}

              {post.image && (
                <div className="mt-8 rounded-[2rem] overflow-hidden border-4 border-white shadow-warm-lg">
                  <img src={post.image} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
                </div>
              )}

              <div className="prose-warm mt-10" dangerouslySetInnerHTML={{ __html: html }} />

              <div className="mt-12 p-7 rounded-3xl bg-espresso text-cream">
                <p className="font-heading font-extrabold text-cream text-xl">Need this coverage for your rental fleet?</p>
                <p className="text-cream/75 mt-2 text-sm">Get a real quote in about 15 minutes — we shop A-rated specialty rental markets.</p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Link href="/quote" className="btn-primary">Get a quote</Link>
                  <a href={SITE.phoneHref} className="btn-secondary !text-cream !border-white/20 !bg-white/10 hover:!bg-white/20">{SITE.phone}</a>
                </div>
              </div>
            </FadeIn>
          </div>
        </article>

        {more.length > 0 && (
          <section className="bg-sonoran-sand py-16">
            <div className="container-wide">
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-espresso mb-8">Keep reading</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {more.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block h-full">
                    <article className="rounded-3xl bg-white border border-adobe shadow-card hover:shadow-card-hover transition-all h-full p-6 flex flex-col">
                      <span className="px-2.5 py-0.5 bg-clay/10 text-clay rounded-md text-xs font-heading font-semibold w-fit mb-3">{p.category}</span>
                      <h3 className="font-heading font-bold text-espresso group-hover:text-clay transition-colors line-clamp-2">{p.title}</h3>
                      <p className="mt-2 text-sm text-mocha line-clamp-2 flex-grow">{p.description}</p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
