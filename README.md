Reproduction for https://github.com/getsentry/sentry-javascript/issues/12683

`npm run test` fails:

```
 FAIL  app/utils/add.test.ts
● Test suite failed to run

  Cannot find module '@sentry/nextjs' from 'app/utils/add.ts'

  Require stack:
    app/utils/add.ts
    app/utils/add.test.ts

    10 |   }
    11 | }
  > 12 |
        | ^

    at Resolver._throwModNotFoundError (node_modules/jest-resolve/build/resolver.js:427:11)
    at Object.<anonymous> (app/utils/add.ts:12:17)
    at Object.<anonymous> (app/utils/add.test.ts:5:14)
```

This repo matches the Next [with-jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest) template.

The only changes I made were:

* `npm i @sentry/nextjs && npm i jest-environment-jsdom -D`
* Modify `app/utils/add.ts` to import and use `captureException`
* Add the following lines to `jest.config.js`:

```
testEnvironment: 'jest-environment-jsdom',
testEnvironmentOptions: {
  customExportConditions: [''],
},
```

Aside: I had to do a bit of archaelogy to figure out the reason for the `customExportConditions: ['']`, and it turns out this was due to some strange interactions between Jest and [MSW](https://mswjs.io/) (suggestion found in their docs [here](https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom)).
