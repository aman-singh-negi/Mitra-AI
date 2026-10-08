export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          name: string | null
          timezone: string | null
          preferred_working_hours: Json | null
          notification_preferences: Json | null
          ai_preferences: Json | null
          theme: string | null
          default_task_settings: Json | null
          productivity_preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name?: string | null
          timezone?: string | null
          preferred_working_hours?: Json | null
          notification_preferences?: Json | null
          ai_preferences?: Json | null
          theme?: string | null
          default_task_settings?: Json | null
          productivity_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string | null
          timezone?: string | null
          preferred_working_hours?: Json | null
          notification_preferences?: Json | null
          ai_preferences?: Json | null
          theme?: string | null
          default_task_settings?: Json | null
          productivity_preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          due_date: string | null
          estimated_duration: number | null
          actual_duration: number | null
          project_id: string | null
          goal_id: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          status?: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          due_date?: string | null
          estimated_duration?: number | null
          actual_duration?: number | null
          project_id?: string | null
          goal_id?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          status?: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          due_date?: string | null
          estimated_duration?: number | null
          actual_duration?: number | null
          project_id?: string | null
          goal_id?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          status: string
          priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          start_date: string | null
          deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          status?: string
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          start_date?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          status?: string
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          start_date?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          category: string | null
          priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          target_date: string | null
          status: string
          progress: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          category?: string | null
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          target_date?: string | null
          status?: string
          progress?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          category?: string | null
          priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          target_date?: string | null
          status?: string
          progress?: number
          created_at?: string
          updated_at?: string
        }
      }
      goal_milestones: {
        Row: {
          id: string
          goal_id: string
          name: string
          description: string | null
          target_date: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          goal_id: string
          name: string
          description?: string | null
          target_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          goal_id?: string
          name?: string
          description?: string | null
          target_date?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          frequency: string
          target: number
          reminder: string | null
          start_date: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          frequency?: string
          target?: number
          reminder?: string | null
          start_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          frequency?: string
          target?: number
          reminder?: string | null
          start_date?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      habit_completions: {
        Row: {
          id: string
          habit_id: string
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          habit_id: string
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          habit_id?: string
          completed_at?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      notes: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          tags: string[] | null
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          tags?: string[] | null
          category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          tags?: string[] | null
          category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      calendar_events: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          start_time: string
          end_time: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          start_time: string
          end_time: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          event_type: string
          timestamp: string
          entity_type: string | null
          entity_id: string | null
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          event_type: string
          timestamp?: string
          entity_type?: string | null
          entity_id?: string | null
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          event_type?: string
          timestamp?: string
          entity_type?: string | null
          entity_id?: string | null
          metadata?: Json | null
        }
      }
      ai_conversations: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      ai_messages: {
        Row: {
          id: string
          conversation_id: string
          role: 'user' | 'assistant'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role?: 'user' | 'assistant'
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: 'user' | 'assistant'
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
