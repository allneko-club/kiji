const adminPath = '/admin';

export const paths = {
  admin: {
    getHref: () => adminPath,
    categories: {
      getHref: () => `${adminPath}/categories`,
      create: {
        getHref: () => `${adminPath}/categories/create`,
      },
      update: {
        getHref: (id: number) => `${adminPath}/categories/${id}/update`,
      },
    },
    posts: {
      getHref: () => `${adminPath}/posts`,
      create: {
        getHref: () => `${adminPath}/posts/create`,
      },
      update: {
        getHref: (id: string) => `${adminPath}/posts/${id}/update`,
      },
    },
    tags: {
      getHref: () => `${adminPath}/tags`,
      create: {
        getHref: () => `${adminPath}/tags/create`,
      },
      update: {
        getHref: (id: number) => `${adminPath}/tags/${id}/update`,
      },
    },
    users: {
      getHref: () => `${adminPath}/users`,
      detail: {
        getHref: (id: string) => `${adminPath}/users/${id}`,
      },
      update: {
        getHref: (id: string) => `${adminPath}/users/${id}/update`,
      },
    },
  },
  home: {
    getHref: () => '/',
  },
  about: {
    getHref: () => '/about',
  },
  contact: {
    getHref: () => '/contact',
  },
  contactDone: {
    getHref: () => '/contact-done',
  },
  posts: {
    getHref: () => '/posts',
    detail: {
      getHref: (id: string) => `/posts/${id}`,
    },
  },
  categories: {
    getHref: () => '/categories',
    detail: {
      getHref: (slug: string) => `/categories/${slug}`,
    },
  },
  tags: {
    getHref: () => '/tags',
    detail: {
      getHref: (slug: string) => `/tags/${slug}`,
    },
  },
  auth: {
    register: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    resetPassword: {
      getHref: () => '/auth/reset-password',
    },
    resetPasswordDone: {
      getHref: () => '/auth/reset-password-done',
    },
  },
} as const;
