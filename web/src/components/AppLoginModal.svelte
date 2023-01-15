<script lang="ts">
	import APP_CONFIGS from "@/app.config"
	import { AvatarSelect, Button, ModalWrapper, Form, FormItem, Input, ToastUtil, closeModal } from "@components"
	import AuthRepository from "@/api/auth"
	import { _ } from "svelte-i18n"
	import * as yup from "yup"

	type ILoginForm = {
		username: string
		password: string
	}

	type IRegisForm = {
		username: string
		password: string
		confirmPassword: string
	}

	export let isOpen: boolean = false
	export let isRegisterMode: boolean = true

	let regisFormElement: Form
	let loginFormElement: Form

	let loginForm: ILoginForm = {
		username: "",
		password: "",
	}

	let loginSchema = yup.object().shape({
		username: yup.string().required().label("username"),
		password: yup.string().required().label("password"),
	})

	let regisForm: IRegisForm = {
		username: "",
		password: "",
		confirmPassword: "",
	}

	let registerSchema = yup.object().shape({
		username: yup.string().required().label("username"),
		password: yup.string().required().label("password"),
		confirmPassword: yup.string().required().label("Confirm password"),
	})

	async function loginFormSubmit() {
		const isValid = loginSchema.isValidSync(loginForm)
		if (isValid) {
			const res = AuthRepository.login(loginForm)
			console.clear()
			console.log(res)
			ToastUtil.toastSuccess($_("requestHasSubmitted"))
			// closeModal()
			// ToastUtil.toastError(res.error || $_("somethingWentWrong"))
		}
	}

	async function regisFormSubmit() {
		const isValid = registerSchema.isValidSync(regisForm)
		if (isValid) {
			const res = AuthRepository.register(regisForm)
			console.clear()
			console.log(res)
			ToastUtil.toastSuccess($_("requestHasSubmitted"))
			// closeModal()
			// ToastUtil.toastError(res.error || $_("somethingWentWrong"))
		}
	}
</script>

{#if isOpen}
	<ModalWrapper size="sm" title={$_("welcomeTo") + " " + APP_CONFIGS.organizationName}>
		<div class="px-6 mt-10">
			{#if isRegisterMode}
				<Form class="" schema={registerSchema} fields={regisForm} submitHandler={regisFormSubmit} bind:this={regisFormElement}>
					<div class="flex items-center">
						<div class="mr-4">
							<AvatarSelect size="16" />
						</div>
						<FormItem class="flex-1 overflow-hidden" label={$_("username")} name="username">
							<Input bind:value={regisForm.username} placeholder="Start with an username" />
						</FormItem>
					</div>
					<FormItem class="mt-4" label={$_("password")} name="password">
						<Input type="password" bind:value={regisForm.password} placeholder="Input your password" />
					</FormItem>
					<FormItem class="mt-4" label={$_("confirmPassword")} name="confirmPassword">
						<Input type="password" bind:value={regisForm.confirmPassword} placeholder="Input your confirm password" />
					</FormItem>
				</Form>
				<div class="w-full pb-2 mt-2 text-center pt-4">
					<Button type="primary" class="w-full" on:click={() => regisFormElement.submit()}>{$_("register")}</Button>
					<div class="mt-4">
						<Button type="link" on:click={() => (isRegisterMode = false)}>{$_("iWantToLogin")}</Button>
					</div>
				</div>
			{:else}
				<Form class="" schema={loginSchema} fields={loginForm} submitHandler={loginFormSubmit} bind:this={loginFormElement}>
					<FormItem label={$_("username")} name="username">
						<Input bind:value={loginForm.username} placeholder="Please enter username" />
					</FormItem>
					<FormItem class="mt-4" label={$_("password")} name="password">
						<Input type="password" bind:value={loginForm.password} placeholder="Please enter password" />
					</FormItem>
					<div class="text-sm mt-1">{$_("forgotPassword")}</div>
				</Form>
				<div class="w-full pb-2 mt-2 text-center">
					<Button type="link" class="my-4" on:click={() => (isRegisterMode = true)}>{$_("iWantToRegister")}</Button>
					<Button type="primary" class="w-full" on:click={() => loginFormElement.submit()}>{$_("continue")}</Button>
				</div>
			{/if}
		</div>
	</ModalWrapper>
{/if}
