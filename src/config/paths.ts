export const paths = {
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
  post: {
    getHref: (id: string) => `/posts/${id}`,
  },
  posts: {
    getHref: () => '/posts',
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
  my:{
    root: {
      getHref: () => '/my',
    },
    post: {
      getHref: (id: string) => `/my/posts/${id}`,
    },
    posts: {
      getHref: () => '/my/posts',
    },
    createPost: {
      getHref: () => '/my/posts/create',
    },
    editPost: {
      getHref: (id: string) => `/my/posts/${id}`,
    },
    settings: {
      getHref: () => '/my/settings',
      profile: {
        getHref: () => '/my/settings/profile',
      },
    },
  },
  users:{
      getHref: () => '/users',
    user: {
      getHref: (id: string) => `/users/${id}`,
    },
  }
} as const;
