import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllBlogPosts } from "@/lib/blog-posts"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const posts = getAllBlogPosts()
  const t = await getTranslations({ locale, namespace: 'blog' })

  return (
    <main id="main-content" className="overflow-x-hidden max-w-full">
      <Navigation />
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-blanc">
        <div className="max-w-7xl mx-auto">
          {/* Bannière avec texte superposé */}
          <div className="mb-12 sm:mb-16 relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
            <Image
              src="/banner-blog.png"
              alt="Blog AdminZen"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay avec flou */}
            <div className="absolute inset-0 bg-noir/40 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center px-4 sm:px-6 max-w-4xl mx-auto">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-blanc mb-4 sm:mb-6 drop-shadow-lg">
                  {t('title')}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-blanc/95 max-w-2xl mx-auto drop-shadow-md">
                  {t('subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-blanc border-2 border-gris-clair rounded-lg p-5 sm:p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-accent-red/10 text-accent-red text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-gris text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(locale === 'de' ? 'de-CH' : locale === 'en' ? 'en-US' : 'fr-CH', {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1.5 text-gris text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime} {t('min')}</span>
                  </div>
                </div>

                <h2 className="font-display text-xl sm:text-2xl italic text-noir mb-3 flex-grow">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="hover:text-accent-red transition-colors line-clamp-2"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gris text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-accent-red font-semibold hover:gap-3 transition-all group mt-auto"
                >
                  {t('readArticle')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

