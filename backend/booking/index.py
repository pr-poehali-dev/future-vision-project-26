import json
import os
import urllib.request
import urllib.parse


def send_telegram(bot_token: str, chat_id: str, text: str) -> bool:
    """Отправка сообщения в Telegram через urllib"""
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML',
    }).encode('utf-8')

    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')

    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            result = json.loads(resp.read().decode())
            print(f"Telegram [{chat_id}] ok: {result.get('ok')}")
            return result.get('ok', False)
    except Exception as e:
        print(f"Telegram [{chat_id}] error: {e}")
        return False


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
            'body': json.dumps({'error': 'name and phone required'})
        }

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

    sent = False
    for chat_id in chat_ids:
        if chat_id:
            result = send_telegram(bot_token, chat_id, text)
            if result:
                sent = True

    if not sent:
        print("WARNING: Telegram delivery failed for all chat_ids")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
