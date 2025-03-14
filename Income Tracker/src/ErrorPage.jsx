import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {error.status}: {error.statusText} || {error.data}
        </i>
      </p>
      <Link href="/" class="home-button">
        Go to Homepage
      </Link>
    </div>
  );
}
