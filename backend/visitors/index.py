import json
import os
import psycopg2

SCHEMA = "t_p17413487_future_vision_projec"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id",
}

BOT_AGENTS = ["bot", "spider", "crawl", "python", "curl", "wget", "claudebot", "gptbot", "poehali"]


def is_bot(user_agent: str) -> bool:
    ua = (user_agent or "").lower()
    return any(b in ua for b in BOT_AGENTS)


def handler(event: dict, context) -> dict:
    """Трекинг посетителей: POST — записать визит, GET — получить статистику"""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    method = event.get("httpMethod", "GET")

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        user_agent = event.get("headers", {}).get("user-agent", "")
        ip = event.get("requestContext", {}).get("identity", {}).get("sourceIp", "")
        page = body.get("page", "/")

        if is_bot(user_agent):
            conn.close()
            return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True, "skipped": True})}

        cur.execute(
            f"INSERT INTO {SCHEMA}.visitors (ip, user_agent, page) VALUES (%s, %s, %s)",
            (ip, user_agent, page)
        )
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}

    if method == "GET":
        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.visitors")
        total = cur.fetchone()[0]

        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.visitors WHERE visited_at >= NOW() - INTERVAL '24 hours'")
        today = cur.fetchone()[0]

        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.visitors WHERE visited_at >= NOW() - INTERVAL '7 days'")
        week = cur.fetchone()[0]

        cur.execute(f"SELECT COUNT(*) FROM {SCHEMA}.visitors WHERE visited_at >= NOW() - INTERVAL '30 days'")
        month = cur.fetchone()[0]

        cur.execute(f"""
            SELECT DATE(visited_at) as day, COUNT(*) as cnt
            FROM {SCHEMA}.visitors
            WHERE visited_at >= NOW() - INTERVAL '30 days'
            GROUP BY day ORDER BY day DESC LIMIT 30
        """)
        daily = [{"date": str(row[0]), "count": row[1]} for row in cur.fetchall()]

        conn.close()
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({
                "total": total,
                "today": today,
                "week": week,
                "month": month,
                "daily": daily,
            }),
        }

    conn.close()
    return {"statusCode": 405, "headers": CORS_HEADERS, "body": json.dumps({"error": "Method not allowed"})}