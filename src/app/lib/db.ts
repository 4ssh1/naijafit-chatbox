import { Pool } from '@vercel/postgres';

export const db = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function createOrGetUser(userId: string) {
  const result = await db.query(
    'INSERT INTO users (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING RETURNING *',
    [userId]
  );
  
  if (result.rows.length === 0) {
    const user = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    return user.rows[0];
  }
  
  return result.rows[0];
}

export async function updateUserProfile(userId: string, gender: string, fitnessLevel?: string) {
  await db.query(
    'UPDATE users SET gender = $1, fitness_level = $2, updated_at = CURRENT_TIMESTAMP WHERE user_id = $3',
    [gender, fitnessLevel, userId]
  );
}

export async function createConversation(userId: string, sessionId: string) {
  const result = await db.query(
    'INSERT INTO conversations (user_id, session_id) VALUES ($1, $2) RETURNING id',
    [userId, sessionId]
  );
  return result.rows[0].id;
}

export async function saveMessage(conversationId: number, role: string, content: string) {
  await db.query(
    'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3)',
    [conversationId, role, content]
  );
}

export async function getConversationHistory(conversationId: number, limit = 10) {
  const result = await db.query(
    'SELECT role, content FROM messages WHERE conversation_id = $1 ORDER BY created_at DESC LIMIT $2',
    [conversationId, limit]
  );
  return result.rows.reverse();
}

export async function getUserProfile(userId: string) {
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [userId]);
  return result.rows[0];
}