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
  tags: {
    getHref: () => '/tags',
    tag: {
      getHref: (name: string) => `/tags/${name}`,
    }
  },
  search: {
    getHref: () => '/search',
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
    deleteAccountDone: {
      getHref: () => '/auth/delete-account-done',
    },
    resetPassword: {
      getHref: () => '/auth/reset-password',
    },
    resetPasswordDone: {
      getHref: () => '/auth/reset-password-done',
    },
  },
  my:{
    getHref: () => '/my',
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
    profile: {
      getHref: () => '/my/profile',
    },
    settings: {
      getHref: () => '/my/settings',
      deleteAccount: {
        getHref: () => '/my/settings/delete-account',
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
