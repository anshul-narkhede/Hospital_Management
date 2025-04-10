/*
  # Create patients table and policies

  1. New Tables
    - `patients`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, optional)
      - `phone` (text, optional)
      - `address` (text, optional)
      - `date_added` (timestamptz, default now())
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `patients` table
    - Add policies for authenticated users to:
      - Read their own patients
      - Create new patients
      - Update their own patients
      - Delete their own patients
*/

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  date_added timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- Enable RLS
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own patients"
  ON patients
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create patients"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own patients"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own patients"
  ON patients
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);