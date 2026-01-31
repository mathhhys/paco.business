export interface FirstName {
  id: string;
  name: string;
}

export interface LastName {
  id: string;
  name: string;
  image_url: string;
}

export interface Database {
  public: {
    Tables: {
      first_names: {
        Row: FirstName;
        Insert: Omit<FirstName, 'id'>;
        Update: Partial<Omit<FirstName, 'id'>>;
      };
      last_names: {
        Row: LastName;
        Insert: Omit<LastName, 'id'>;
        Update: Partial<Omit<LastName, 'id'>>;
      };
    };
  };
}