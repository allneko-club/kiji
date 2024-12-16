export const paths = {
  home: {
    getHref: () => '/',
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
  misc: {
    about: {
      getHref: () => '/misc/about',
    },
    privacyPolicy: {
      getHref: () => '/misc/privacy-policy',
    },
    contact: {
      getHref: () => '/misc/contact',
    },
    contactDone: {
      getHref: () => '/misc/contact-done',
    },
  },
} as const;
