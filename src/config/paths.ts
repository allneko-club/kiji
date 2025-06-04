const adminPath = '/admin';

export const paths = {
  admin:{
    getHref: () => adminPath,
    posts: {
      getHref: () => `${adminPath}/posts`,
      detail: {
        getHref:(id: string) => `${adminPath}/posts/${id}`,
      },
      create: {
        getHref: () => `${adminPath}/posts/create`,
      },
      edit: {
        getHref: (id: string) => `${adminPath}/posts/edit/${id}`,
      },
    },
    users:{
      getHref: () => `${adminPath}/users`,
      detail: {
        getHref: (id: string) => `${adminPath}/users/${id}`,
      },
    },
    profile: {
      getHref: () => `${adminPath}/profile`,
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
