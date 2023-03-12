<script>
	import { onMount } from 'svelte';
	import { PUBLIC_API_KEY } from '$env/static/public';
	import { Loader } from '@googlemaps/js-api-loader';
	export let data;
	const locations = JSON.parse(data.locations);

	let map, mapdiv

    const getDate = (date) => {
        const d = new Date(date)
        return d.toLocaleString()
    }

	onMount(() => {
		const loader = new Loader({
			apiKey: PUBLIC_API_KEY,
			version: 'weekly'
		});
		loader.load().then(async () => {
			map = new google.maps.Map(mapdiv, {
				center: { lat: locations[0].lat, lng: locations[0].lng },
				zoom: 2
			});
			const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			let labelIndex = 0;
			locations.forEach((location) => {
				const infowindow = new google.maps.InfoWindow({
					content: `${location.created}`
				});
				const marker = new google.maps.Marker({
					position: { lat: location.lat, lng: location.lng },
					map,
					label: labels[labelIndex++ % labels.length]
				});
				marker.addListener('click', () => {
					infowindow.open({
						anchor: marker,
						map
					});
				});
			});
		});
	});
</script>

<!-- {#each locations as location}
	<pre>{JSON.stringify(location, null, 2)}</pre>
	<p>{location.created}</p>
{/each} -->

<h1>Información del paquete</h1>
<div id="locations">
    {#each locations as location}
        {getDate(location.created)}
        <hr>
    {/each}
</div>
<div bind:this={mapdiv} style="width: 640px; height: 480px" />
