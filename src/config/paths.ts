const adminPath = '/admin';

export const paths = {
  admin:{
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
      detail: {
        getHref:(id: string) => `${adminPath}/posts/${id}`,
      },
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
    users:{
      getHref: () => `${adminPath}/users`,
      detail: {
        getHref: (id: string) => `${adminPath}/users/${id}`,
      },
    },
  },
  home: {
    getHref: () => '/',
  },
  about: {
    getHref: () => '/about',
  },
  privacyPolicy: {
    getHref: () => '/privacy-policy',
  },
  contact: {
    getHref: () => '/contact',
  },
  contactDone: {
    getHref: () => '/contact-done',
  },
  posts:{
    getHref: () => '/posts',
    detail: {
      getHref: (id: string) => `/posts/${id}`,
    },
  },
  tags: {
    getHref: () => '/tags',
    detail: {
      getHref: (name: string) => `/tags/${name}`,
    }
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
