import PocketBase from 'pocketbase';
import { PRIVATE_PB_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

const pb = new PocketBase(PRIVATE_PB_URL);

export const load = async ({ params }) => {

	const records = await pb.collection('locations').getFullList({
        sort: '-created'
	});

    const locations = records.filter(record => record.package === params.slug)

    if (locations.length != 0){
        return {
            locations: JSON.stringify(locations)
        };
    } else {
        throw error(404, 'Paquete no encontrado, revisa tu id')
    }
    
};
