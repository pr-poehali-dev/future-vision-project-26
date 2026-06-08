import json
import os
import urllib.request
import urllib.parse
import urllib.error


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
        '🥃 <b>Новая заявка на бронь — G80</b>',
        '',
        f'👤 <b>Имя:</b> {name}',
        f'📞 <b>Телефон:</b> {phone}',
    ]
    if date:
        lines.append(f'📅 <b>Дата/время:</b> {date}')
    if guests:
        lines.append(f'👥 <b>Гостей:</b> {guests}')
    if comment:
        lines.append(f'💬 <b>Комментарий:</b> {comment}')

    text = '\n'.join(lines)

    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode()

    req = urllib.request.Request(url, data=data, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        print(f"Telegram error {e.code}: {error_body}")
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': f'telegram {e.code}', 'detail': error_body}
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True}
    }