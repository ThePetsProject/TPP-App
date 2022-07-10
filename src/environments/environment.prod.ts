export const environment = {
  production: true,
  config: {
    baseUrl: 'https://thepetsproject.tk',
    login: {
      path: '/api/v1/account/login',
    },
    register: {
      path: '/api/v1/account/register',
    },
    petsSecure: {
      path: '/api/v1/account/pets/secure',
    },
    petsLost: {
      path: '/api/v1/pets/lost',
    },
    petsBreeds: {
      path: '/api/v1/account/pets/breeds',
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
