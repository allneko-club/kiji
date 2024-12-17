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
  admin: {
    root: {
      getHref: () => '/admin',
    },
    dashboard: {
      getHref: () => '/admin',
    },
    discussions: {
      getHref: () => '/admin/discussions',
    },
    discussion: {
      getHref: (id: string) => `/admin/discussions/${id}`,
    },
    users: {
      getHref: () => '/admin/users',
    },
    profile: {
      getHref: () => '/admin/profile',
    },
  },
  public: {
    discussion: {
      getHref: (id: string) => `/public/discussions/${id}`,
    },
  },
} as const;
