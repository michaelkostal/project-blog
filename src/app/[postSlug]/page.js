import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';

import { loadBlogPost } from '@/helpers/file-helpers';



async function BlogPost({params}) {
  const thePost = await loadBlogPost(params.postSlug);
  const { frontmatter, content } = thePost;
  
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        
      </div>
    </article>
  );
}

export default BlogPost;
