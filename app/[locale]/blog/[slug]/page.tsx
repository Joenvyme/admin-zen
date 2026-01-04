import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Link } from '@/i18n/routing'
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-posts"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslations } from 'next-intl/server'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  const locales = ['fr', 'de', 'en']
  
  return posts.flatMap((post) =>
    locales.map((locale) => ({
      slug: post.slug,
      locale,
    }))
  )
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: "Article non trouvé",
    }
  }

  return {
    title: `${post.title} | Blog AdminZen`,
    description: post.description,
    keywords: post.keywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params
  const post = getBlogPost(slug)
  const t = await getTranslations({ locale, namespace: 'blog' })

  if (!post) {
    notFound()
  }

  // Convertir le markdown en HTML (version simple)
  const lines = post.content.split("\n")
  const contentHtml = lines
    .reduce((acc: Array<{ type: string; content: string }>, line, index) => {
      if (line.startsWith("# ")) {
        let content = line.substring(2)
        content = content.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-noir font-semibold">$1</strong>')
        content = content.replace(/\*(?![*<])/g, "")
        acc.push({ type: "h1", content })
      } else if (line.startsWith("## ")) {
        let content = line.substring(3)
        content = content.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-noir font-semibold">$1</strong>')
        content = content.replace(/\*(?![*<])/g, "")
        acc.push({ type: "h2", content })
      } else if (line.startsWith("### ")) {
        let content = line.substring(4)
        content = content.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-noir font-semibold">$1</strong>')
        content = content.replace(/\*(?![*<])/g, "")
        acc.push({ type: "h3", content })
      } else if (line.startsWith("- ") || line.startsWith("✅ ") || line.startsWith("❌ ")) {
        let lineContent = line.startsWith("✅ ") 
          ? line.substring(2) 
          : line.startsWith("❌ ") 
          ? line.substring(2) 
          : line.substring(2)
        
        // Traiter le gras dans les listes
        lineContent = lineContent.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-noir font-semibold">$1</strong>')
        // Supprimer les astérisques restants
        lineContent = lineContent.replace(/\*(?![*<])/g, "")
        
        const listItem = `<li class="mb-2 text-gris">${line.startsWith("✅ ") ? `<span class="text-vert">✓</span> ` : line.startsWith("❌ ") ? `<span class="text-accent-red">✗</span> ` : ""}${lineContent}</li>`
        
        const prevItem = acc[acc.length - 1]
        if (prevItem && prevItem.type === "ul") {
          prevItem.content += listItem
        } else {
          acc.push({
            type: "ul",
            content: listItem,
          })
        }
      } else if (line.startsWith("⚠️ ")) {
        acc.push({ type: "warning", content: line.substring(2) })
      } else if (line.trim() === "") {
        acc.push({ type: "br", content: "" })
      } else {
        acc.push({ type: "p", content: line })
      }
      return acc
    }, [])
    .map((item) => {
      switch (item.type) {
        case "h1":
          return `<h1 class="font-display text-3xl sm:text-4xl md:text-5xl italic text-noir mb-6 mt-8">${item.content}</h1>`
        case "h2":
          return `<h2 class="font-display text-2xl sm:text-3xl md:text-4xl italic text-noir mb-4 mt-8">${item.content}</h2>`
        case "h3":
          return `<h3 class="font-display text-xl sm:text-2xl md:text-3xl italic text-noir mb-3 mt-6">${item.content}</h3>`
        case "ul":
          return `<ul class="list-disc ml-6 mb-4 space-y-2">${item.content}</ul>`
        case "warning":
          let warningContent = item.content
          warningContent = warningContent.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-noir font-semibold">$1</strong>')
          warningContent = warningContent.replace(/\*(?![*<])/g, "")
          return `<div class="text-gris mb-4 p-4 bg-jaune/10 border-l-4 border-jaune rounded"><strong>⚠️</strong> ${warningContent}</div>`
        case "br":
          return "<br />"
        case "p":
          let processed = item.content
          // Traiter les liens d'abord
          processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            const cleanText = text.replace(/\*\*/g, "")
            return `<a href="${url}" class="text-accent-red hover:underline font-semibold">${cleanText}</a>`
          })
          // Traiter le gras (doit être fait après les liens pour éviter les conflits)
          processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-noir font-semibold">$1</strong>')
          // Supprimer tous les astérisques restants qui ne sont pas dans des balises HTML
          processed = processed.replace(/\*(?![*<])/g, "")
          return `<p class="text-gris mb-4 leading-relaxed">${processed}</p>`
        default:
          return ""
      }
    })
    .join("")

  return (
    <main id="main-content" className="overflow-x-hidden max-w-full">
      <Navigation />
      <article className="pt-24 sm:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-blanc">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog">
            <Button variant="outline" className="mb-6 sm:mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </Link>

          <header className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent-red/10 text-accent-red text-xs font-semibold rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-gris text-sm">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString(locale === 'de' ? 'de-CH' : locale === 'en' ? 'en-US' : 'fr-CH', {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2 text-gris text-sm">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} {t('min')}</span>
              </div>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic text-noir mb-4 sm:mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-gris leading-relaxed">
              {post.description}
            </p>
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gris-clair/30 rounded-lg border-2 border-gris-clair">
            <h2 className="font-display text-2xl sm:text-3xl italic text-noir mb-4">
              Simplifiez vos impôts avec AdminZen
            </h2>
            <p className="text-gris mb-6">
              Ne perdez plus de temps à rassembler vos documents et à chercher les déductions. AdminZen automatise tout pour vous.
            </p>
            <Button asChild size="lg" className="bg-accent-red hover:bg-accent-red-hover">
              <Link href="/#waitlist">Tester gratuitement</Link>
            </Button>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}

