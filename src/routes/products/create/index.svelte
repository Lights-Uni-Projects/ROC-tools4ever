<script context="module">
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ fetch }) {
        const manufacturerResponse = await fetch("/products/create/manufacturers.json");
        const manufacturers = await manufacturerResponse.json();

        return { props: { manufacturers } };
    }
</script>

<script>
    export let manufacturers = [];
</script>

<form
    method="POST"
    action="/products/create/createProduct"
    class="mx-auto text-2xl text-center flex flex-col w-80 bg-gray-200 m-4 p-8 rounded-xl"
>
    <h2 class="text-2xl mb-4 -mx-4 font-bold">Creëer nieuw product</h2>
    <input
        class="border border-gray-900 p-1 mb-2"
        type="text"
        placeholder="Naam"
        name="productName"
    />
    <input
        class="border border-gray-900 p-1 mb-2"
        type="text"
        placeholder="Type"
        name="productSerial"
    />
    <label
        class="text-center border-gray-900 p-1 mb-2"
    >
        <select
            name="productManufacturer"
        >
            <option value={null}>Fabrikanten</option>
            {#each manufacturers as manufacturer (manufacturer.id)}
                <option value={manufacturer.id}>{manufacturer.name}</option>
            {/each}
        </select>
    </label>

    <input
        class="border border-gray-900 p-1 mb-2"
        type="number"
        placeholder="Prijs"
        name="productPrice"
        min="0"
        step="0.01"
    />

    <input
        class="border border-gray-900 p-1 mb-2"
        type="number"
        placeholder="Minimum voorraad"
        name="productMinStock"
        min="0"
    />

    <button type="submit" class="bg-blue-200 hover:bg-blue-300 text-blue-700 py-2">
        Voeg toe
    </button>
</form>