export const environment = {
  production: true,
  config: {
    baseUrl: 'https://thepetsproject.org',
    login: {
      path: '/api/v1/account/login',
    },
    register: {
      path: '/api/v1/account/register',
    },
    petsSecure: {
      path: '/api/v1/pets/secure',
    },
    petsLost: {
      path: '/api/v1/pets/lost',
    },
    petsBreeds: {
      path: '/api/v1/pets/breeds',
    },
    jwtValidate: {
      path: '/api/v1/jwt/validate',
    },
    jwtRefresh: {
      path: '/api/v1/jwt/refresh',
    },
    accountData: {
      path: '/api/v1/account/secure/data',
    },
    recoverPassword: {
      path: '/api/v1/account/recover-password',
    },
    resetPassword: {
      path: '/api/v1/account/recover-password/reset',
    },
  },
};
