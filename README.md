# useYup

The friendly typescript-compatible express middleware.

## Installation

Using `npm`:

```sh
npm install use-yup
```

or if you prefer to use the `yarn` package manager:

```sh
yarn add use-yup
```

## Usage

```ts
import { useYup } from 'use-yup';
import * as express from 'express';

const app = new express();

const userObject = yup.object({
    id: yup.string(),
    username: yup.string()
});

app.post("/endpoint", useYup(userObject, (req) => req.query), (req: UseYupRequest<typeof userObject>, res) => {
    res.send(`Id: ${req.yupData.id} | Username: ${req.yupData.username}`);
});

app.listen(1234, () => {
    console.log('Application is live!');
});
```
