import { GraphQLClient } from "graphql-request";

// Initialize the GraphQL client for reading content (CDN endpoint)
// CDN endpoint is for public read access - no auth token needed
const hygraphEndpoint = process.env.HYGRAPH_ENDPOINT || "";

// Read-only client (no auth needed for published content on CDN)
export const hygraphClient = new GraphQLClient(hygraphEndpoint);

// Mutation endpoint (non-CDN, requires auth token)
// Only used if you need to create/update content from the server
const hygraphMutationEndpoint = process.env.HYGRAPH_MUTATION_ENDPOINT || 
  hygraphEndpoint.replace('.cdn.hygraph.com/content/', '.hygraph.com/v2/');

// Authenticated client for mutations (creating/updating content)
export const hygraphMutationClient = new GraphQLClient(hygraphMutationEndpoint, {
  headers: {
    ...(process.env.HYGRAPH_TOKEN && {
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    }),
  },
});

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Author {
  id: string;
  name: string;
  title?: string;
  picture?: {
    url: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  publishedAt: string;
  updatedAt?: string;
  // Optional fields - add these to your Hygraph schema if needed
  coverImage?: {
    url: string;
    width?: number;
    height?: number;
  };
  author?: Author;
  category?: string;
  tags?: string[];
}

export interface BlogPostsResponse {
  posts: BlogPost[];
}

export interface SinglePostResponse {
  post: BlogPost | null;
}

// ============================================
// GRAPHQL QUERIES
// ============================================

export const GET_ALL_POSTS = `
  query GetAllPosts($first: Int, $skip: Int) {
    posts(first: $first, skip: $skip, stage: PUBLISHED) {
      id
      title
      slug
      excerpt
      publishedAt
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    post(where: { slug: $slug }, stage: PUBLISHED) {
      id
      title
      slug
      excerpt
      content
      publishedAt
      updatedAt
    }
  }
`;

export const GET_ALL_SLUGS = `
  query GetAllSlugs {
    posts(stage: PUBLISHED) {
      slug
    }
  }
`;

// ============================================
// DATA FETCHING FUNCTIONS
// ============================================

/**
 * Fetch all blog posts with pagination
 */
export async function getAllPosts(
  first: number = 10,
  skip: number = 0
): Promise<BlogPost[]> {
  try {
    const data = await hygraphClient.request<BlogPostsResponse>(GET_ALL_POSTS, {
      first,
      skip,
    });
    return data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await hygraphClient.request<SinglePostResponse>(
      GET_POST_BY_SLUG,
      { slug }
    );
    return data.post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const data = await hygraphClient.request<{ posts: { slug: string }[] }>(
      GET_ALL_SLUGS
    );
    return data.posts.map((post) => post.slug);
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}


// ============================================
// MUTATION QUERIES (for creating/updating content)
// ============================================

export const CREATE_POST = `
  mutation CreatePost($data: PostCreateInput!) {
    createPost(data: $data) {
      id
      title
      slug
    }
  }
`;

export const PUBLISH_POST = `
  mutation PublishPost($id: ID!) {
    publishPost(where: { id: $id }) {
      id
      title
      slug
    }
  }
`;

export const UPDATE_POST = `
  mutation UpdatePost($id: ID!, $data: PostUpdateInput!) {
    updatePost(where: { id: $id }, data: $data) {
      id
      title
      slug
    }
  }
`;

export const DELETE_POST = `
  mutation DeletePost($id: ID!) {
    deletePost(where: { id: $id }) {
      id
    }
  }
`;

// ============================================
// MUTATION FUNCTIONS
// ============================================

export interface CreatePostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content
  category?: string;
  tags?: string[];
  publishedAt: string;
  coverImage?: { connect: { id: string } };
  author?: { connect: { id: string } };
}

/**
 * Create a new blog post (draft)
 */
export async function createPost(data: CreatePostInput): Promise<{ id: string; title: string; slug: string } | null> {
  try {
    const result = await hygraphMutationClient.request<{
      createPost: { id: string; title: string; slug: string };
    }>(CREATE_POST, {
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: { html: data.content },
        category: data.category,
        tags: data.tags,
        publishedAt: data.publishedAt,
        ...(data.coverImage && { coverImage: data.coverImage }),
        ...(data.author && { author: data.author }),
      },
    });
    return result.createPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

/**
 * Publish a draft post
 */
export async function publishPost(id: string): Promise<{ id: string; title: string; slug: string } | null> {
  try {
    const result = await hygraphMutationClient.request<{
      publishPost: { id: string; title: string; slug: string };
    }>(PUBLISH_POST, { id });
    return result.publishPost;
  } catch (error) {
    console.error("Error publishing post:", error);
    throw error;
  }
}

/**
 * Create and immediately publish a post
 */
export async function createAndPublishPost(data: CreatePostInput): Promise<{ id: string; title: string; slug: string } | null> {
  const created = await createPost(data);
  if (created) {
    return await publishPost(created.id);
  }
  return null;
}

/**
 * Update an existing post
 */
export async function updatePost(
  id: string,
  data: Partial<CreatePostInput>
): Promise<{ id: string; title: string; slug: string } | null> {
  try {
    const updateData: Record<string, unknown> = {};
    if (data.title) updateData.title = data.title;
    if (data.slug) updateData.slug = data.slug;
    if (data.excerpt) updateData.excerpt = data.excerpt;
    if (data.content) updateData.content = { html: data.content };
    if (data.category) updateData.category = data.category;
    if (data.tags) updateData.tags = data.tags;
    if (data.publishedAt) updateData.publishedAt = data.publishedAt;

    const result = await hygraphMutationClient.request<{
      updatePost: { id: string; title: string; slug: string };
    }>(UPDATE_POST, { id, data: updateData });
    return result.updatePost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

/**
 * Delete a post
 */
export async function deletePost(id: string): Promise<boolean> {
  try {
    await hygraphMutationClient.request(DELETE_POST, { id });
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Format date for display
 */
export function formatPostDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculate read time based on content
 */
export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Generate a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

