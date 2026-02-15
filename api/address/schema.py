from pydantic import BaseModel

class AddressSchema(BaseModel):
    id: int
    user_id: int
    address: str
    city: str
    state: str
    pincode: str
    country: str
    is_default: bool

class AddressCreate(BaseModel):
    user_id: int
    address: str
    city: str
    state: str
    pincode: str
    country: str
    is_default: bool
    