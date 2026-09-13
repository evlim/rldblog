export const blogInfo = {
  name: "The Blog",
  description: "Practical notes on life, law, and technology in Russia.",
}

export type BlogPost = {
  link: string
  date: string // date is a string 'YYYY-MM-DD'
  title: string
  description: string
  coverImage?: string
  coverImageAlt?: string
  readingMinutes: number
  parsedDate?: Date // Optional because it's added dynamically
}

const blogPosts: BlogPost[] = [
  {
    title:
      "How to Improve Website Access for Russian Visitors with Regional CDN Routing",
    description:
      "Website slow or hard to access in Russia? Learn how to add Timeweb CDN regional routing to an existing site, with a Cloudflare example and practical testing steps.",
    link: "/blog/regional-cdn-routing-russian-visitors",
    date: "2026-09-13",
    coverImage: "/images/regional-cdn-routing-cover.webp",
    coverImageAlt:
      "A laptop beside a globe, with connected regional servers illustrating CDN delivery across Eurasia.",
    // About 2,120 words at 160 wpm, plus time to study the routing examples.
    readingMinutes: 15,
  },
  {
    title: "Russian TRP Under Decree 702: The Complete Guide",
    description:
      "A walkthrough from an approved applicant covering the required documents and steps for a TRP in Russia under Presidential Decree 702.",
    link: "/blog/trp-presidential-decree-702-guide",
    date: "2026-07-29",
    coverImage: "/images/702-guide-cover.webp",
    // About 3,200 words at 150 wpm, plus three minutes for document illustrations.
    readingMinutes: 25,
  },
  {
    title: "A practical starting point for life in Russia",
    description:
      "The ideas behind Russia Decoding and what you can expect from the blog.",
    link: "/blog/a-practical-starting-point-for-life-in-russia",
    date: "2026-07-27",
    readingMinutes: 1,
  },
  {
    title: "Small details, better context",
    description:
      "Why the everyday things are often the most useful things to understand.",
    link: "/blog/small-details-better-context",
    date: "2026-07-25",
    readingMinutes: 1,
  },
  {
    title: "Starting with the basics",
    description:
      "A short introduction to finding your way around a new country.",
    link: "/blog/starting-with-the-basics",
    date: "2026-07-23",
    readingMinutes: 1,
  },
]

// Parse post dates from strings to Date objects
for (const post of blogPosts) {
  if (!post.parsedDate) {
    const dateParts = post.date.split("-")
    post.parsedDate = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2]),
    ) // Note: months are 0-based
  }
}

export const sortedBlogPosts = blogPosts.sort(
  (a: BlogPost, b: BlogPost) =>
    (b.parsedDate?.getTime() ?? 0) - (a.parsedDate?.getTime() ?? 0),
)
