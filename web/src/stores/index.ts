import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { IUser } from "@/interfaces"

export let authUser: Writable<IUser> = writable({
	permission: "ADMIN",
})
