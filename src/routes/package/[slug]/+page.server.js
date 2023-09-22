import { error } from '@sveltejs/kit';
import pb from '$lib/db'

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
