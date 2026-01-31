export interface FirstName {
  id: number;
  name: string;
}

export interface LastName {
  id: number;
  name: string | null;
  image_url: string | null;
}

export interface Database {
  public: {
    Tables: {
      paconames: {
        Row: {
          id: number;
          firstname: string;
        };
        Insert: Omit<{
          id: number;
          firstname: string;
        }, 'id'>;
        Update: Partial<Omit<{
          id: number;
          firstname: string;
        }, 'id'>>;
      };
      pacosurname: {
        Row: {
          id: number;
          lastname: string | null;
          image: string | null;
        };
        Insert: Omit<{
          id: number;
          lastname: string | null;
          image: string | null;
        }, 'id'>;
        Update: Partial<Omit<{
          id: number;
          lastname: string | null;
          image: string | null;
        }, 'id'>>;
      };
    };
  };
}