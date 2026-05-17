export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  slug: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Welcome to Schuster Software",
    excerpt:
      "Introducing the new Schuster Software website and our suite of modern applications.",
    slug: "welcome-to-schuster-software",
    date: "2026-05-13",
    author: "Nick Schuster",
    tags: ["announcement", "welcome"],
    content: `
# Welcome to Schuster Software

I'm excited to introduce the new Schuster Software website! This is a fresh redesign that showcases our collection of modern software applications built with quality and care.

## What's New

The new website features:
- A modernized, minimalist design
- Improved product showcase
- Dark mode support
- Enhanced search functionality
- A blog for updates and insights

## About Schuster Software

Schuster Software is a collection of independently developed applications, each designed with attention to detail, clean code, and user experience. Whether you're interested in statistical analysis, fitness tracking, collaborative tools, or games, we have something for you.

## What's Next

Stay tuned for more updates, blog posts, and announcements about our products. You can subscribe to updates via our contact form.

Thanks for visiting!
    `,
  },
  {
    id: "2",
    title: "Building Modern Web Applications with Astro",
    excerpt:
      "A deep dive into why Astro is a great choice for building fast, scalable web applications.",
    slug: "building-with-astro",
    date: "2026-05-14",
    author: "Nick Schuster",
    tags: ["astro", "web-development", "tutorial"],
    content: `
# Building Modern Web Applications with Astro

Astro is a modern web framework that brings fresh ideas to web development. In this post, I'll share why I chose Astro for the new Schuster Software website.

## Why Astro?

1. **Performance First**: Astro ships zero JavaScript by default, resulting in faster page loads
2. **Framework Agnostic**: Use your favorite framework (React, Vue, Svelte) or just plain HTML
3. **Content Collections**: Built-in support for organizing and querying content
4. **Developer Experience**: Excellent tooling and documentation

## Our Setup

For the Schuster Software website, we're using:
- Astro for the static site generation
- Tailwind CSS for styling
- Dark mode with CSS custom properties
- Client-side search for filtering products

## Performance Metrics

With this setup, we achieve:
- Lighthouse score: 100 on performance
- First Contentful Paint: < 1s
- Zero layout shift

Astro makes it easy to build fast, modern websites without compromising on functionality or developer experience.
    `,
  },
];
