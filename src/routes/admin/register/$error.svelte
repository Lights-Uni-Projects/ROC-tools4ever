<script context="module">
  /**
   * @type {import('@sveltejs/kit').ErrorLoad}
   */
  export async function load({ status, error }) {
    return {
      props: {
        status,
        error,
      },
    };
  }
</script>

<script>
  /**
   * @type {number}
   */
  export let status;
  /**
   * @type {Error}
   */
  export let error;
</script>

<div class="text-2xl">
  <h2 class="text-4xl">Error {status}</h2>
  <p>{error.message}</p>
</div>
