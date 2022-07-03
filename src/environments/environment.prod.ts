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
    jwtValidate: {
      path: '/api/v1/jwt/validate',
    },
    jwtRefresh: {
      path: '/api/v1/jwt/refresh',
    },
    accountData: {
      path: '/api/v1/account/data',
    },
  },
};
