import type { FC } from 'hono/jsx';

export const Layout: FC = (props) => {
	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Eeeveelutions Tracker</title>
				<link rel="stylesheet" href="/assets/picocss@2.0.6.min.css" />
				<link rel="stylesheet" href="/assets/styles.css" />
				<script src="/assets/htmx@2.0.1.min.js" />
				<script defer src="/assets/alpinejs@3.14.1.min.js" />
				<script role="module" src="/assets/tcg-card.js" />
			</head>
			<body>
				<main class="container">{props.children}</main>
			</body>
		</html>
	);
};
