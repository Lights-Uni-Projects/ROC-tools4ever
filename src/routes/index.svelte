<script>
	//console.log(process.cwd())
</script>

<form
	method="POST"
	action="/login"
	class="mx-auto text-2xl text-center flex flex-col w-72 bg-gray-200 m-4 p-8 rounded-xl"
>
	<h2 class="text-4xl mb-4">Login</h2>
	<input
		class="border border-gray-900 p-1 mb-2"
		type="text"
		placeholder="Gebruikersnaam"
		name="username"
	/>
	<input
		class="border border-gray-900 p-1 mb-2"
		type="password"
		placeholder="Wachtwoord"
		name="password"
	/>

	<button type="submit" class="bg-blue-200 hover:bg-blue-300 text-blue-700 py-1"
		>Login
	</button>
</form>
