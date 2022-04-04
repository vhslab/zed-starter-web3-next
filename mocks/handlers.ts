import { rest } from 'msw'

const zedApiBaseUrl = 'https://api.dev.zed.run'

export const handlers = [
  rest.get(`${zedApiBaseUrl}/signing_message`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'ZED.RUN',
      }),
    )
  }),
  // Handles a POST /login request
  rest.post(`${zedApiBaseUrl}/users/login`, (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200, 'Success'),
      ctx.json({
        stableName: 'Mockers',
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI2NTEyMTMwMjJ9.top7ZRfu0mxxTPx3T-AFszANemf4pJGqrfCdB3yonAY',
        hasOver18: true,
        hasAcceptedTerms: true,
        stableAvatarUrls: {
          original: 'https://i.pravatar.cc/300',
        },
        accountType: 'magic',
        email: 'zed-test@yopmail.com',
      }),
    )
  }),
]
