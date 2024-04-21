import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

import { loadBlogPost,getBlogPostList } from '@/helpers/file-helpers';

import { MDXRemote } from 'next-mdx-remote/rsc';

import { BLOG_TITLE } from '@/constants';

export async function generateStaticParams() {
  const blogPosts = await getBlogPostList();

  return blogPosts.map(({ slug }) => ({
    postSlug: slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);
  const { frontmatter: { title, abstract: description } } = post;
  return {
    title: `${title} • ${BLOG_TITLE}`,
    description
  };
}

async function BlogPost({params}) {
  const post = await loadBlogPost(params.postSlug);
  const { frontmatter: { title, publishedOn }, content } = post;
  
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={title}
        publishedOn={publishedOn}
      />
      <div className={styles.page}>
          <MDXRemote
            source={content}
          />
      </div>
    </article>
  );
}

export default BlogPost;
