export const blogInfo = {
  name: "The Blog",
  description: "Practical notes on everyday and legal life in Russia.",
}

export type BlogPost = {
  link: string
  date: string // date is a string 'YYYY-MM-DD'
  title: string
  description: string
  coverImage?: string
  parsedDate?: Date // Optional because it's added dynamically
}

const blogPosts: BlogPost[] = [
  {
    title: "Russian TRP Under Decree 702: The Complete Guide",
    description:
      "A walkthrough from an approved applicant covering the required documents and steps for a TRP in Russia under Presidential Decree 702.",
    link: "/blog/trp-presidential-decree-702-guide",
    date: "2026-07-29",
    coverImage: "/images/702-guide-cover.webp",
  },
  {
    title: "A practical starting point for life in Russia",
    description:
      "The ideas behind Russian Life Decoding and what you can expect from the blog.",
    link: "/blog/a-practical-starting-point-for-life-in-russia",
    date: "2026-07-27",
  },
  {
    title: "Small details, better context",
    description:
      "Why the everyday things are often the most useful things to understand.",
    link: "/blog/small-details-better-context",
    date: "2026-07-25",
  },
  {
    title: "Starting with the basics",
    description:
      "A short introduction to finding your way around a new country.",
    link: "/blog/starting-with-the-basics",
    date: "2026-07-23",
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
