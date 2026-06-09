import json
import os
import psycopg2



def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def cors(body, status=200):
    return {
        'statusCode': status,
        'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password'},
        'body': body
    }


def handler(event: dict, context) -> dict:
    """API для управления меню бара G80"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    method = event.get('httpMethod', 'GET')
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')

    # GET — публичный, без пароля
    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'SELECT id, category, name, description, price, price_bottle, price_glass, sort_order FROM {schema}.menu_items WHERE is_active = TRUE ORDER BY category, sort_order, id')
        rows = cur.fetchall()
        conn.close()
        items = [
            {'id': r[0], 'category': r[1], 'name': r[2], 'description': r[3],
             'price': r[4], 'price_bottle': r[5], 'price_glass': r[6], 'sort_order': r[7]}
            for r in rows
        ]
        return cors({'items': items})

    # Все остальные методы — требуют пароль
    headers = event.get('headers', {}) or {}
    password = headers.get('X-Admin-Password') or headers.get('x-admin-password', '')
    if password != os.environ.get('ADMIN_PASSWORD', ''):
        return cors({'error': 'Unauthorized'}, 401)

    body = json.loads(event.get('body', '{}') or '{}')
    conn = get_conn()
    cur = conn.cursor()

    if method == 'POST':
        cur.execute(
            f'''INSERT INTO {schema}.menu_items (category, name, description, price, price_bottle, price_glass, sort_order, is_active)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s) RETURNING id''',
            (body.get('category'), body.get('name'), body.get('description'),
             body.get('price'), body.get('price_bottle'), body.get('price_glass'),
             body.get('sort_order', 0), body.get('is_active', True))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return cors({'id': new_id, 'success': True})

    if method == 'PUT':
        item_id = body.get('id')
        cur.execute(
            f'''UPDATE {schema}.menu_items SET category=%s, name=%s, description=%s, price=%s,
                price_bottle=%s, price_glass=%s, sort_order=%s, is_active=%s WHERE id=%s''',
            (body.get('category'), body.get('name'), body.get('description'),
             body.get('price'), body.get('price_bottle'), body.get('price_glass'),
             body.get('sort_order', 0), body.get('is_active', True), item_id)
        )
        conn.commit()
        conn.close()
        return cors({'success': True})

    if method == 'DELETE':
        item_id = body.get('id')
        cur.execute(f'DELETE FROM {schema}.menu_items WHERE id=%s', (item_id,))
        conn.commit()
        conn.close()
        return cors({'success': True})

    conn.close()
    return cors({'error': 'Method not allowed'}, 405)