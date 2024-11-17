import { FC } from 'hono/jsx';

export const OwnedButton: FC<{owned: boolean, id: string}> = ({ owned, id }) => {
	return (
		<button class={owned ? "" : "outline"} hx-patch={`/${id}`}
						hx-swap="outerHTML">Mark as {owned ? "Unowned" : "Owned"}</button>
	)
}