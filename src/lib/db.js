import PocketBase from 'pocketbase';
import { PRIVATE_PB_URL } from '$env/static/private';

const pb = new PocketBase(PRIVATE_PB_URL);

export default pb