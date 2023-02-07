import {PostgrestError} from '@supabase/supabase-js';

export default interface ISupabaseQuery<T> {
  data?: T;
  error?: PostgrestError;
}