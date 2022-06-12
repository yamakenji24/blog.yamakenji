import { LinkLayout } from '..';

function Header() {
  return (
    <div className="flex justify-between items-center bg-green-400 text-white p-4">
      <h1 className="text-3xl tracking-tighter">yamakenji blog</h1>
      <div className="flex space-x-4">
        <LinkLayout to="/" prefetch="intent">
          <p>日本語</p>
        </LinkLayout>
        <LinkLayout to="/en" prefetch="intent">
          English
        </LinkLayout>
      </div>
    </div>
  );
}

export { Header };
