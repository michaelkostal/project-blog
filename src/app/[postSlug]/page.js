import React from 'react';

import dynamic from 'next/dynamic';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

import { loadBlogPost,getBlogPostList } from '@/helpers/file-helpers';

import { MDXRemote } from 'next-mdx-remote/rsc';

import { BLOG_TITLE } from '@/constants';

import CodeSnippet from '@/components/CodeSnippet';

const DivisionGroupsDemo = dynamic(() => 
  import('@/components/DivisionGroupsDemo')
);

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
            components={{
              pre: CodeSnippet,
              DivisionGroupsDemo
            }}
          />
      </div>
    </article>
  );
}

export default BlogPost;
