import { SupabaseClient } from '@supabase/supabase-js';
import { Match } from '../modules/twitter/entities/match.entity';
import { Twit } from '../modules/twitter/entities/twit.entity';

export class SupabaseRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  // MATCHES
  async getMatchById(id: string): Promise<Match | null> {
    const { data, error } = await this.supabase.from('matches').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data as Match;
  }

  async insertMatch(match: Match): Promise<void> {
    const { error } = await this.supabase.from('matches').insert([match]);
    if (error) throw new Error(error.message);
  }

  async updateMatch(id: string, updates: Partial<Match>): Promise<void> {
    const { error } = await this.supabase.from('matches').update(updates).eq('id', id);
    if (error) throw new Error(error.message);
  }

  // TWITS
  async getTwitsByMatch(hype_id: string): Promise<Twit[]> {
    const { data, error } = await this.supabase.from('twits').select('*').eq('hype_id', hype_id).order('created_at', { ascending: true });
    if (error) throw new Error(error.message);
    return data as Twit[];
  }

  async insertTwit(twit: Twit): Promise<void> {
    const { error } = await this.supabase.from('twits').insert([twit]);
    if (error) throw new Error(error.message);
  }

  async getLatestTwit(hype_id: string): Promise<Twit | null> {
    const { data, error } = await this.supabase.from('twits').select('*').eq('hype_id', hype_id).order('created_at', { ascending: false }).limit(1);
    if (error) throw new Error(error.message);
    return data && data.length > 0 ? (data[0] as Twit) : null;
  }
} 