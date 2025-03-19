import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.room_group_name = "notifications"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        print("✅ WebSocket Connected!")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        if not text_data:  # 🛑 Prevent JSONDecodeError if message is empty
            print("⚠️ Received empty message, ignoring...")
            return

        try:
            data = json.loads(text_data)
            print(data)
            message = data.get("message", "No message provided")
            print(f"📩 Received message: {message}")

            # Send message to WebSocket group
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "send_notification", "message": message},
            )
        except json.JSONDecodeError:
            print("❌ Invalid JSON received, ignoring...")

    async def send_notification(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))
