---
title: "個人ブログを開設しました"
createdAt: "2021/12/09"
description: "Remixを用いたブログを開設しました。技術的メモや参加報告、ブログ的な内容はここで紹介していきます。"
category: Programming
tags:
  - Announcement
  - React
  - Remix
---

こんにちは、@yamakenjiです。  
この記事は、[SLP KBIT Advent Calendar 2021](https://adventar.org/calendars/6706)の9日目の記事です。  

## はじめに  
今回はRemixを用いて、自身のブログを構築していきます。  
元々Next.jsで途中まで開発していましたが、RemixがOSSとして公開されたので使ってみることにしました。  
本記事では、主に実装した機能とVercelへのデプロイ周辺に関して説明していきます。  
詳細なコードに関しては、GitHubからご覧ください。[blog.yamakenji](https://github.com/yamakenji24/blog.yamakenji)

## 技術構成  
- Remix v1.0.4
- TypeScript
- Tailwind
- remark
- Vercel

## Remixとは  
Remixは、11/23日にv1が正式にリリースされました。  
Remixは主に4つの視点に着目しています。  
1. サーバ/クライアントモデルの採用  
2. 従来のWebの基礎となるブラウザ、HTTP、HTMLと連携する  
3. JSを使用しブラウザの動作をエミュレートし、UXを向上させる  
4. 基盤となる技術を過度に抽象化しない
     
RemixはNext.jsと違いSSGの機能を持たない代わりに、SSRをエッジサーバーで実行します。  
SSRでFetchしたデータは、クライアントに空のレスポンスを返す前にサーバ上で全てのデータを取得して、キャッシュします。 キャッシュ内容は、routeコンポーネント毎にcatche-headerを詳細に設定することができます。  
これにより、従来用意していたスケルトンUIなどが必要なくなりました。  
さらには、`<Link prefetch>` で設定しているものは、ボタンをホバーした時などにlink先のデータをprefetchし、サーバー上に期間内でキャッシュします。実際にクリックした際には、キャッシュされたデータを利用します。これは、ブラウザの機能の一つであるリンクの先読みをラップして使用しています。　　  
その他にも機能がたくさんあるので、興味ある人は公式まで。 [Remix](https://remix.run/docs/en/v1)

## 実装
ということで実装していきます。  
今回主に実装したのは、ファイル読み込みからhtmlへの変換、タグ、カテゴリー一覧の抽出、OGP画像の生成です。  

### MarkdownからHTMLへの変換
Remixでは、route下にmdxを配置することで、そのまま表示することができますが、今回はremarkを使ってmarkdownをhtmlに変換していきます。

```ts:markDownToHtml.ts
export async function markDownToHtml(content: string): Promise<string> {
  const [remark, html, gfm] = await Promise.all([
    import('remark').then(mod => mod.remark),
    import ('remark-html').then(mod => mod.default),
    import ('remark-gfm').then(mod => mod.default),
  ]);

  const result = await remark().use(gfm).use(html).process(content);
  return result.toString();
}
```

// Todo  
codeブロック上のシンタックスハイライトは、後で導入します。(おすすめあったら教えてください)  

### Markdownから記事のデータとして取得する
全ての記事に対して、MarkdownからHtmlへ変換し、内容とタイトル、メタ情報を連想配列で取得していきます。  
メタ情報は、ハイフン３つ`---`で囲んだ中身を、gray-matterで抽出しています。

```ts:posts.ts
const postsDirPath = path.join(process.cwd(), 'data', 'posts');

async function getPostFiles(): Promise<string[]> {
  return await fs.readdirSync(postsDirPath);
}

export async function readPostFile(post: string): Promise<PostData> {
  const slug = post.replace(/\.md$/, '');
  const fullPath = path.join(postsDirPath, `${slug}.md`);
  const fileContents = await fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  if (!data.updatedAt) data.updatedAt = data.createdAt;
  data.tags = !data.tags ? [] : Array.from(new Set(data.tags));

  return {
    slug: slug,
    content: await markDownToHtml(content),
    metaData: data,
  };
}

export async function getAllPosts(): Promise<PostData[]> {
  const postFiles = await getPostFiles();
  const __posts = await Promise.all(postFiles.map(readPostFile));
  const posts = __posts.sort((a, b) => (a.metaData.createdAt < b.metaData.createdAt ? 1 : -1));

  return posts;
}
```

### カテゴリー、タグ一覧の取得
取得した記事一覧から、カテゴリー一覧とタグ一覧を取得していきます。  
これらの情報は一意に限定されるものであり、重複したものは除外していきます。  

```ts:posts.ts
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = posts.map((post) => post.metaData.tags).flat();
  return Array.from(new Set(tags));
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = posts.map((post) => post.metaData.category);
  return Array.from(new Set(categories));
}
```
 
loaderはRemixが用意しているReactのライフサイクルみたいなモジュールAPIで、レンダリングされる前にサーバー側で呼び出します。また、引数を受け取ることができ、例えば`/$slug`みたいなURLからそのslugの中身を動的に抽出することもできます。  
一覧データは、全てのコンポーネントで利用することを想定しているため、ルートコンポーネントでloaderから呼び出して、不必要なリクエストを削減します。 

```tsx:root.tsx
export const loader: LoaderFunction = async () => {
  const [tags, categories] = await Promise.all([getAllTags(), getAllCategories()]);
  const data: LoaderData = { tags, categories };

  return json(data, {
    headers: {
      'Cache-Control': `public, max-age=${60 * 10} s-maxage=${60 * 60}`,
    },
  });
};

```

### タグ、カテゴリーから記事を取得
link等で/tag/$slugや/category/$slugにアクセスしたときに、そのタグやカテゴリーに関連する記事を取得していきます。
loaderで、Route Paramsを取得して、その情報をもとに取得します。  
例えば、カテゴリーの場合は以下のようになります。  
```tsx: $slug.tsx
export const loader: LoaderFunction = async (content: any) => {
  const category = content.params.slug;
  const posts = await getPostsByCategory(category);
  const data: LoaderData = { posts, category };

  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=60 s-maxage=60',
    },
  });
};
```

```ts:posts.ts
export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.metaData.category === category);
}
```
### その他
その他にも、OGPなど、htmlのmeta要素を動的に設定しています。  
Remixでは、`meta function`をexportすることで、各Routeごとにmeta要素を設定することができます。  
また、OGP画像の生成として、vercelが公開している[og-image](https://github.com/vercel/og-image)を使用しています。誰でもフォークして、中のテンプレートを編集してデプロイすることで、OGP画像を自分で生成できるので、興味ある人はお試しあれ。  


## Vercelにデプロイ
デプロイ先として、Vercelを使用しています。他にも候補として、Cloudflare Workersがありましたが、他のプロジェクトでVercelを使用していたため、今回はVercelにしました。  
Remixが公開された直後では、Vercelにデプロイする際にはいくつかの設定が必要でしたが、現在は設定なしでデプロイすることが可能です。  
なお、今回は外部ファイルを読み込んでの実装になるので、設定していきます。  
```json
{
  ...
  {
    "includeFiles": "data/**"
  }
  ...
}
```


## まとめ
Remixを用いて、ブログを構築していきました。  
自身のブログを開設したので、これからどんどん更新していきたいと思います。  
また、機能をどんどん追加していきたいと考えていますので、気軽にissueやPRを投げてもらえると嬉しいです。  
特に、今回は実装していないページネーションなども実装していく予定です。  