"""Backfill stock nulls and set default

Revision ID: 33a56e5d8df9
Revises: c26b1197a144
Create Date: 2026-02-13 12:38:24.973232

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '33a56e5d8df9'
down_revision: Union[str, Sequence[str], None] = 'c26b1197a144'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # update existing rows with 0
    op.execute("UPDATE products SET stock = 0 WHERE stock IS NULL")
    
    # set default value for future inserts and make non-nullable if desired
    op.alter_column('products', 'stock',
               existing_type=sa.Integer(),
               server_default='0',
               nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.alter_column('products', 'stock',
               existing_type=sa.Integer(),
               server_default=None,
               nullable=True)
