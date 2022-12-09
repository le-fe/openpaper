export function filterProps(reserved: string[], props: any) {
	const defaultReserved = ["class", "add", "remove", "replace", "value"]
	const r = [...reserved, ...defaultReserved]

	return Object.keys(props).reduce(
		(acc, cur) => (cur.includes("$$") || cur.includes("Class") || r.includes(cur) ? acc : { ...acc, [cur]: props[cur] }),
		{}
	)
}
