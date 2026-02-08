import hashlib
import bcrypt


def hash_password(password: str) -> str:
    """
    Hash a plain text password using bcrypt.

    Bcrypt has a 72-byte limit, so for longer passwords we pre-hash with SHA256.

    Args:
        password: Plain text password

    Returns:
        Hashed password string
    """
    pwd_bytes = password.encode('utf-8')

    # Pre-hash with SHA256 if password is long to avoid bcrypt 72-byte limit
    if len(pwd_bytes) > 72:
        pwd_bytes = hashlib.sha256(pwd_bytes).hexdigest().encode('utf-8')

    # Generate salt and hash
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd_bytes, salt)
    return hashed.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain text password against a hashed password.

    Args:
        plain_password: Plain text password to verify
        hashed_password: Hashed password from database

    Returns:
        True if password matches, False otherwise
    """
    pwd_bytes = plain_password.encode('utf-8')

    # Apply same pre-hashing if password is long
    if len(pwd_bytes) > 72:
        pwd_bytes = hashlib.sha256(pwd_bytes).hexdigest().encode('utf-8')

    return bcrypt.checkpw(pwd_bytes, hashed_password.encode('utf-8'))
