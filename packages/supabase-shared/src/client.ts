/** @format */

import { createClient } from '@supabase/supabase-js';

const supabaseClient = () => {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;

	if (!supabaseUrl || !supabaseKey) {
		throw new Error('SUPABASE_URL and SUPABASE_KEY must be set');
	}

	return createClient(supabaseUrl, supabaseKey);
};

export const SupabaseClient = supabaseClient();