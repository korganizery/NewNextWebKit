This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# api
```sh
Using App Router Featuree awailable in /app 那这种方式下, 如何创建一个 api/hello.js 的REST API 来使用
在 Next.js的 App Router 模式（使用 /app 目录）下，创建一个 REST API 的方式与 Pages Router 模式略有不同。以下是如何在 App Router 下创建一个 api/hello 的 REST API：

步骤
创建 API 路由文件： 在 App Router 模式下，API 路由文件应放在 app/api/ 目录下。每个 API 路由文件需要有一个 route.ts 文件（或 route.js 文件），并且导出相应的 HTTP 方法（如 GET、POST）。

您可以按照如下结构创建文件：

app/
├── api/
│   ├── hello/
│   │   └── route.ts
实现 API 的逻辑： 在 route.ts 文件中，实现 API 的具体逻辑。

typescript
// app/api/hello/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello, World!' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: `Hello, ${body.name || 'World'}!` });
}
GET 方法：当客户端发送 GET 请求时，这个方法将返回 { message: 'Hello, World!' }。

POST 方法：当客户端发送 POST 请求时，它会读取请求体中的 name 字段，并返回一个自定义的问候语。

运行项目： 启动开发服务器，然后访问 http://localhost:4000/api/hello，您将看到以下返回值（GET 请求）：

json
{
  "message": "Hello, World!"
}
发送 POST 请求： 您可以使用工具（如 Postman 或浏览器的 fetch API）发送 POST 请求：

javascript
fetch('/api/hello', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Next.js' }),
})
  .then((res) => res.json())
  .then((data) => console.log(data)); // { message: "Hello, Next.js!" }
与 Pages Router 的区别
在 Pages Router 中，API 路由存放于 pages/api/ 目录，文件名映射为 API 路由的路径。

在 App Router 中，API 路由存放于 app/api/ 目录，并且每个路由必须使用 route.ts 或 route.js 文件来定义。

优点
App Router 模式使用现代化的方式定义 API 路由，更加清晰且结构化，并支持 React 的服务端特性。

如果您有其他疑问或需要进一步的帮助，请告诉我！ 😊

next dev -p 4000
``