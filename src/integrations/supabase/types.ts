export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      article_history: {
        Row: {
          article_id: string
          created_at: string
          created_by: string | null
          id: string
          kind: string
          note: string | null
          snapshot: Json
        }
        Insert: {
          article_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          note?: string | null
          snapshot: Json
        }
        Update: {
          article_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          note?: string | null
          snapshot?: Json
        }
        Relationships: [
          {
            foreignKeyName: "article_history_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          markdown: string
          published_at: string | null
          slug: string
          status: string
          template: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          markdown?: string
          published_at?: string | null
          slug: string
          status?: string
          template?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          markdown?: string
          published_at?: string | null
          slug?: string
          status?: string
          template?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          id: string
          title: string
          issuer: string
          issue_date: string
          credential_url: string | null
          image_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          issuer: string
          issue_date: string
          credential_url?: string | null
          image_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          issuer?: string
          issue_date?: string
          credential_url?: string | null
          image_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_config: {
        Row: {
          blog_theme: string
          feature_flags: Json
          state: string
          updated_at: string
          website_theme: string
        }
        Insert: {
          blog_theme?: string
          feature_flags?: Json
          state: string
          updated_at?: string
          website_theme?: string
        }
        Update: {
          blog_theme?: string
          feature_flags?: Json
          state?: string
          updated_at?: string
          website_theme?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          id: string
          school: string
          degree: string
          year: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          school: string
          degree: string
          year: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          school?: string
          degree?: string
          year?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          id: string
          company: string
          position: string
          start_date: string
          end_date: string | null
          description: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company: string
          position: string
          start_date: string
          end_date?: string | null
          description?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company?: string
          position?: string
          start_date?: string
          end_date?: string | null
          description?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          id: string
          title: string
          type: string
          url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          type: string
          url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: string
          url?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      navigation: {
        Row: {
          id: string
          label: string
          path: string
          icon: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          path: string
          icon?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          label?: string
          path?: string
          icon?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          name: string
          headline: string
          bio: string
          avatar_url: string | null
          location: string | null
          email: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string
          headline?: string
          bio?: string
          avatar_url?: string | null
          location?: string | null
          email?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          headline?: string
          bio?: string
          avatar_url?: string | null
          location?: string | null
          email?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          thumbnail_url: string | null
          images: Json
          technologies: Json
          github_url: string | null
          live_demo_url: string | null
          featured: boolean
          status: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string
          thumbnail_url?: string | null
          images?: Json
          technologies?: Json
          github_url?: string | null
          live_demo_url?: string | null
          featured?: boolean
          status?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          thumbnail_url?: string | null
          images?: Json
          technologies?: Json
          github_url?: string | null
          live_demo_url?: string | null
          featured?: boolean
          status?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo: {
        Row: {
          id: string
          title: string
          description: string
          keywords: Json
          og_image_url: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string
          description?: string
          keywords?: Json
          og_image_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          keywords?: Json
          og_image_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          icon?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string | null
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: string
          theme: string
          language: string
          animations: boolean
          dark_mode: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          theme?: string
          language?: string
          animations?: boolean
          dark_mode?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          theme?: string
          language?: string
          animations?: boolean
          dark_mode?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content: Json
          id: string
          updated_at: string
        }
        Insert: {
          content?: Json
          id: string
          updated_at?: string
        }
        Update: {
          content?: Json
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          level: number
          icon: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string
          level?: number
          icon?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          level?: number
          icon?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          id: string
          github: string | null
          linkedin: string | null
          twitter: string | null
          youtube: string | null
          instagram: string | null
          website: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          github?: string | null
          linkedin?: string | null
          twitter?: string | null
          youtube?: string | null
          instagram?: string | null
          website?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          github?: string | null
          linkedin?: string | null
          twitter?: string | null
          youtube?: string | null
          instagram?: string | null
          website?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          author_name: string
          author_title: string
          content: string
          avatar_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_name: string
          author_title?: string
          content: string
          avatar_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          author_title?: string
          content?: string
          avatar_url?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      theme_history: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          note: string | null
          snapshot: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          snapshot: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          snapshot?: Json
        }
        Relationships: []
      }
      theme_preferences: {
        Row: {
          id: string
          theme_id: string
          primary_color: string | null
          secondary_color: string | null
          font: string | null
          border_radius: string | null
          animation_speed: string | null
          layout: string | null
          sidebar_position: string | null
          card_style: string | null
          glass_effect: boolean
          terminal_color: string | null
          wallpaper: string | null
          accent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          theme_id: string
          primary_color?: string | null
          secondary_color?: string | null
          font?: string | null
          border_radius?: string | null
          animation_speed?: string | null
          layout?: string | null
          sidebar_position?: string | null
          card_style?: string | null
          glass_effect?: boolean
          terminal_color?: string | null
          wallpaper?: string | null
          accent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          theme_id?: string
          primary_color?: string | null
          secondary_color?: string | null
          font?: string | null
          border_radius?: string | null
          animation_speed?: string | null
          layout?: string | null
          sidebar_position?: string | null
          card_style?: string | null
          glass_effect?: boolean
          terminal_color?: string | null
          wallpaper?: string | null
          accent?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bootstrap_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      publish_draft: { Args: { _note?: string }; Returns: Json }
      rollback_article: { Args: { _snapshot_id: string }; Returns: Json }
      rollback_to: { Args: { _snapshot_id: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
    },
  },
} as const
