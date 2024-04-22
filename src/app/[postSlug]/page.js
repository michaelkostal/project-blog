import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { loadBlogPost, getBlogPostList } from "@/helpers/file-helpers";

import COMPONENT_MAP from "@/helpers/mdx-helpers";

import { MDXRemote } from "next-mdx-remote/rsc";

import { BLOG_TITLE } from "@/constants";

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);
  if (!post) {
    return "Post not found."; // TODO: 404 component
  }
  const {
    frontmatter: { title, publishedOn },
    content,
  } = post;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

// Generate metadata
export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);
  const {
    frontmatter: { title, abstract: description },
  } = post;
  return {
    title: `${title} • ${BLOG_TITLE}`,
    description,
  };
}
export async function generateStaticParams() {
  const blogPosts = await getBlogPostList();

  return blogPosts.map(({ slug }) => ({
    postSlug: slug,
  }));
}

export default BlogPost;
