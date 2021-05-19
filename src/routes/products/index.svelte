<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	// Fetching multiple database queries
	export async function load({ fetch }) {
		const inventoryResponse = await fetch("/products/inventory.json");
		const inventory = await inventoryResponse.json();

		const productsResponse = await fetch("/products/products.json");
		const products = await productsResponse.json();

		const warehousesResponse = await fetch("/products/warehouses.json");
		const warehouses = await warehousesResponse.json();

        const manufacturerResponse = await fetch("/products/manufacturers.json");
        const manufacturers = await manufacturerResponse.json();

		return { props: { inventory, products, warehouses, manufacturers } };
	}
</script>

<script>
	import _ from 'lodash';

	export let inventory = [];
	export let products = [];
	export let warehouses = [];



	let searchString = null;
	let selectedWarehouse = null;
	let showOutofStock = null;

	// Logic for autocompletion when adding new products
	let searchAddString = null;
	let searchResult = null;
	let userclosed = false;


	$: filteredInventory = inventory.filter((entry) => {
		let show = true;
		// If search box text is included in product name string, show
		if (searchString) {
			if (!entry.product.name.toUpperCase().includes(searchString.toUpperCase())) {
				show = false;
			}
		}
		// Dropdown default Null (All ...), else warehouse
		if (selectedWarehouse) {
			if (entry.warehouse.location !== selectedWarehouse) {
				show = false;
			}
		}
		// If checkbox checkd, show products below minimum required stock
		if (showOutofStock) {
			if (entry.stock >= entry.product.min_stock) {
				show = false
			}
		}
		return show;
	});

	$: groupInventory = _.groupBy(filteredInventory, "product_id")

	// Currency conversion to Euro
	const formatter = new Intl.NumberFormat('nl', {
		style: 'currency',
		currency: 'EUR',
	});
</script>


<!-- Dropdown menu, iterate through every warehouse/product id and list every item unless show = false -->
<div class='mx-auto text-center py-4 border-2 mt-4 rounded-xl'>
	<div>
		<input type="text" class="border-2" bind:value={searchString} placeholder="Zoek op producten...">

		<label class="mx-1">
			<select class="bg-gray-200 p-1" bind:value={selectedWarehouse}>
				<option value={null}>Alle locaties</option>
				{#each warehouses as warehouse (warehouse.id)}
					<option value={warehouse.location}>{warehouse.location}</option>
				{/each}
			</select>
		</label>

		<label>
			Niet op voorraad
			<input type="checkbox" bind:checked={showOutofStock}>
		</label>
	</div>
</div>

<!-- Table -->
<div class="border-2 mt-4 p-4 rounded-xl">
	<table id="ProductTable" class="bg-gray-100 text-gray-900 mx-auto text-xl">
		<thead>
			<tr>
				<th class="px-2 ">Product</th>
				<th class="px-2">Type</th>
				<th class="px-2">Fabrikant</th>
				{#if showOutofStock}
					<th class="px-2">Op voorraad</th>
					<th class="px-2">Min. voorraad</th>
				{:else}

					<th class="px-2">Totaal op voorraad</th>
				{/if}
				<th class="px-2">Prijs</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.values(groupInventory) as inventory}
				<tr>
					<td class="px-2">{inventory[0].product.name}</td>
					<td class="px-2">{inventory[0].product.serial}</td>
					<td class="px-2">{inventory[0].product.manufacturer.name}</td>
					<td class="px-2 text-right">{inventory.map(item => item.stock).reduce((a, b) => (a + b))}</td>
					{#if showOutofStock}
						<td class="px-2 text-right">{inventory[0].product.min_stock}</td>
					{/if}
					<td class="px-2">{formatter.format(inventory[0].product.price)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>


<!-- Adding new products to the database -->
<div class="border-2 mt-4 rounded-xl">
	<form
		method="POST"
		action="/products/addProduct"
		class="mx-auto text-center py-4"
	>
	<h2 class="mb-4 text-2xl">Voeg bestelde producten toe</h2>

	<label class="mx-1">
		<select class="bg-gray-200 p-1" name="productToAdd">
			<option value={null}>Producten</option>
			{#each products as products}
				<option value={products.id}>{products.name}</option>
			{/each}
		</select>
	</label>

	<label class="mx-1">
		<select class="bg-gray-200 p-1" name="warehouse">
			<option value={null}>Locatie</option>
			{#each warehouses as warehouse (warehouse.id)}
				<option value={warehouse.id}>{warehouse.location}</option>
			{/each}
		</select>
	</label>

	<input type="number" class="border-2 w-32 py-1" name="productTotalOrdered" placeholder="Aantal besteld">

	<button type="submit" class="bg-blue-200 hover:bg-blue-300 text-blue-700 ml-2 px-6 py-1">
		Verstuur
	</button>

	</form>
</div>

<!-- Create new products in database -->
<div class="border-2 mt-4 rounded-xl">
	<form
    method="POST"
    action="/products/createProduct"
    class="mx-auto text-center py-4"
>
		<h2 class="text-2xl mb-4 -mx-4">Creëer nieuw product</h2>
		<input
			class="border-2"
			type="text"
			placeholder="Naam"
			name="productName"
		/>
		<input
			class="border-2"
			type="text"
			placeholder="Type"
			name="productSerial"
		/>
		<input
			class="border-2"
			type="text"
			placeholder="Fabrikant"
			name="productManufacturer"
		/>

		<input
			class="border-2"
			type="number"
			placeholder="Prijs"
			name="productPrice"
			min="0"
			step="0.01"
		/>

		<input
			class="border-2"
			type="number"
			placeholder="Minimum voorraad"
			name="productMinStock"
			min="0"
		/>

		<button type="submit" class="bg-blue-200 hover:bg-blue-300 text-blue-700 ml-2 px-6 py-1">
			Voeg toe
		</button>
	</form>
</div>