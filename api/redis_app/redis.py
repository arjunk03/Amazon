from redis.asyncio import Redis
from config import settings

redis_client = Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

async def get_redis_client():
    return redis_client

async def block_token(token: str):
    await redis_client.set(name=token, value="blocked", ex=settings.REDIS_TOKEN_EXPIRE_MINUTES * 60)

async def is_token_blocked(token: str):
    expired = await redis_client.get(name=token)
    return expired
