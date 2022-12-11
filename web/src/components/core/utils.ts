import { bubble, listen } from "svelte/internal"

export function filterProps(reserved: string[], props: any) {
	const defaultReserved = ["class", "add", "remove", "replace", "value"]
	const r = [...reserved, ...defaultReserved]

	return Object.keys(props).reduce(
		(acc, cur) => (cur.includes("$$") || cur.includes("Class") || r.includes(cur) ? acc : { ...acc, [cur]: props[cur] }),
		{}
	)
}

export function getEventsAction(component) {
	return (node) => {
		const events = Object.keys(component.$$.callbacks)
		const listeners = []
		events.forEach((event) => listeners.push(listen(node, event, (e) => bubble(component, e))))
		return {
			destroy: () => {
				listeners.forEach((listener) => listener())
			},
		}
	}
}
