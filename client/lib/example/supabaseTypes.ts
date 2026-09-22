export interface Database {
  public: {
    Tables: {
      example: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['example']['Insert']>;
      };
    };
  };
}
