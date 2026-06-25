CREATE TABLE t_p17413487_future_vision_projec.visitors (
  id SERIAL PRIMARY KEY,
  visited_at TIMESTAMP DEFAULT NOW(),
  ip TEXT,
  user_agent TEXT,
  page TEXT DEFAULT '/'
);