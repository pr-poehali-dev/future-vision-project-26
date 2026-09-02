import json
import os
import urllib.request
import urllib.parse
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def cors(body, status=200):
    return {
        'statusCode': status,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
        },
        'body': json.dumps(body)
    }


def send_telegram(bot_token: str, chat_id: str, text: str) -> bool:
    """Отправка сообщения в Telegram через urllib (best-effort, короткий таймаут)"""
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML',
    }).encode('utf-8')

    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')

    try:
        with urllib.request.urlopen(req, timeout=4) as resp:
            result = json.loads(resp.read().decode())
            print(f"Telegram [{chat_id}] ok: {result.get('ok')}")
            return result.get('ok', False)
    except Exception as e:
        print(f"Telegram [{chat_id}] error: {e}")
        return False


def handler(event: dict, context) -> dict:
    """Приём и хранение заявок на бронирование стола (БД + попытка уведомить в Telegram)"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    method = event.get('httpMethod', 'GET')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    if method == 'POST':
        body = json.loads(event.get('body', '{}') or '{}')
        name = (body.get('name') or '').strip()
        phone = (body.get('phone') or '').strip()
        date = (body.get('date') or '').strip()
        guests = (body.get('guests') or '').strip()
        comment = (body.get('comment') or '').strip()

        if not name or not phone:
            return cors({'error': 'name and phone required'}, 400)

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f'''INSERT INTO {schema}.bookings (name, phone, booking_date, guests, comment)
                VALUES (%s, %s, %s, %s, %s) RETURNING id''',
            (name, phone, date, guests, comment)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        chat_ids = [os.environ.get('TELEGRAM_CHAT_ID', ''), '-1003708419944']
        lines = [
            '🥃 <b>Новая заявка на бронь — G80</b>',
            '',
            f'👤 Имя: {name}',
            f'📞 Телефон: {phone}',
        ]
        if date:
            lines.append(f'📅 Дата/время: {date}')
        if guests:
            lines.append(f'👥 Гостей: {guests}')
        if comment:
            lines.append(f'💬 Комментарий: {comment}')
        text = '\n'.join(lines)

        for chat_id in chat_ids:
            if chat_id:
                send_telegram(bot_token, chat_id, text)

        return cors({'success': True, 'id': new_id})

    # GET и PUT — только для админа
    headers = event.get('headers', {}) or {}
    password = headers.get('X-Admin-Password') or headers.get('x-admin-password', '')
    if password != os.environ.get('ADMIN_PASSWORD', ''):
        return cors({'error': 'Unauthorized'}, 401)

    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f'''SELECT id, name, phone, booking_date, guests, comment, status, created_at
                FROM {schema}.bookings ORDER BY created_at DESC LIMIT 200'''
        )
        rows = cur.fetchall()
        conn.close()
        bookings = [
            {
                'id': r[0], 'name': r[1], 'phone': r[2], 'date': r[3],
                'guests': r[4], 'comment': r[5], 'status': r[6],
                'created_at': r[7].isoformat() if r[7] else None,
            }
            for r in rows
        ]
        return cors({'bookings': bookings})

    if method == 'PUT':
        body = json.loads(event.get('body', '{}') or '{}')
        booking_id = body.get('id')
        status = body.get('status')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'UPDATE {schema}.bookings SET status=%s WHERE id=%s', (status, booking_id))
        conn.commit()
        conn.close()
        return cors({'success': True})

    return cors({'error': 'Method not allowed'}, 405)
