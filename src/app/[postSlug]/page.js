import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';

// Generate metadata
export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);
  const { frontmatter: { title, abstract: description } } = post;
  return {
    title,
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
