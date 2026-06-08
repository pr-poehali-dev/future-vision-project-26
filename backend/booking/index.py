import json
import os
import http.client
import urllib.parse


def handler(event: dict, context) -> dict:
    """Отправка заявки на бронирование стола в Telegram"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    date = body.get('date', '').strip()
    guests = body.get('guests', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'name and phone required'}
        }

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    lines = [
        '🥃 Новая заявка на бронь — G80',
        '',
        f'Имя: {name}',
        f'Телефон: {phone}',
    ]
    if date:
        lines.append(f'Дата/время: {date}')
    if guests:
        lines.append(f'Гостей: {guests}')
    if comment:
        lines.append(f'Комментарий: {comment}')

    text = '\n'.join(lines)

    params = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
    })

    conn = http.client.HTTPSConnection('api.telegram.org', timeout=10)
    conn.request(
        'POST',
        f'/bot{bot_token}/sendMessage',
        body=params,
        headers={'Content-Type': 'application/x-www-form-urlencoded'}
    )
    resp = conn.getresponse()
    resp_body = resp.read().decode()
    conn.close()

    print(f"Telegram response {resp.status}: {resp_body}")

    result = json.loads(resp_body)

    if not result.get('ok'):
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'telegram error', 'detail': resp_body}
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True}
    }
