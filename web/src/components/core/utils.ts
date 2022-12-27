import { bubble, listen } from "svelte/internal"

export class ClassBuilder {
	constructor(classes, defaultClasses) {
		this.defaults = (typeof classes === "function" ? classes(defaultClasses) : classes) || defaultClasses

		this.classes = this.defaults
	}

	flush() {
		this.classes = this.defaults

		return this
	}

	extend(...fns) {
		return this
	}

	get() {
		return this.classes
	}

	replace(classes, cond = true) {
		if (cond && classes) {
			this.classes = Object.keys(classes).reduce((acc, from) => acc.replace(new RegExp(from, "g"), classes[from]), this.classes)
		}

		return this
	}

	remove(classes, cond = true) {
		if (cond && classes) {
			this.classes = classes.split(" ").reduce((acc, cur) => acc.replace(new RegExp(cur, "g"), ""), this.classes)
		}

		return this
	}

	add(className, cond = true, defaultValue) {
		if (!cond || !className) return this

		switch (typeof className) {
			case "string":
			default:
				this.classes += ` ${className} `
				return this
			case "function":
				this.classes += ` ${className(defaultValue || this.classes)} `
				return this
		}
	}
}

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

export const createListener = (node: HTMLElement, cb: () => void) => (e: MouseEvent) => {
	if (node.contains(e.target as Node)) {
		return
	}
	cb()
}

export function onClickOutside(node: HTMLElement, cb: () => void) {
	const listener = createListener(node, cb)
	window.addEventListener("click", listener)

	return {
		update: (cb: () => void) => {
			window.removeEventListener("click", listener)
			const newListener = createListener(node, cb)
			window.addEventListener("click", newListener)
		},
		destroy: () => window.removeEventListener("click", listener),
	}
}
