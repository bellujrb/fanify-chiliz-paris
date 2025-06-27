import { ConfigService } from '../config/config.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SupabaseProvider = {
  provide: 'SUPABASE_CLIENT',
  useFactory: (configService: ConfigService): SupabaseClient => {
    return createClient(
      configService.supabaseUrl,
      configService.supabaseServiceRoleKey
    );
  },
  inject: [ConfigService],
}; 