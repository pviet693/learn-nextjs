This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Chuyển nội dung trong file mark-down thành object

- npm i gray-matter

## Chuyển đổi content mark-down sang HTML

- Khi xử lý đầu vào là mark-down và đầu ra cũng là mark-down thì sử dụng package remark

- Khi xử lý đầu vào là HTML và đầu ra cũng là HTML thì sử dụng package rehype

- npm i unified rehype-document rehype-format rehype-stringify remark-parse remark-rehype

- npm i remark-toc: Thêm Table of contents

- npm i rehype-slug: Thêm id vào heading, khi nhấn vào mục trong Table of contents sẽ chạy xuống heading tương ứng

- npm i rehype-autolink-headings: Thêm thẻ link vào heading, không cần nhấn vào mục trong Table of contents mới lấy được link của heading

- npm i remark-prism: thêm hightlight cho thẻ code