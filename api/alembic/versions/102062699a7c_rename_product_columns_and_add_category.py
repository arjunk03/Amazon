"""rename product columns and add category

Revision ID: 102062699a7c
Revises: a81189e0fc7d
Create Date: 2026-02-08 20:18:36.568937

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '102062699a7c'
down_revision: Union[str, Sequence[str], None] = 'a81189e0fc7d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Renaming columns using raw SQL to preserve data
    op.execute('ALTER TABLE products RENAME COLUMN name TO title')
    op.execute('ALTER TABLE products RENAME COLUMN image TO "imageUrl"')
    op.add_column('products', sa.Column('category', sa.String(), nullable=True))
    
    op.drop_index(op.f('ix_products_name'), table_name='products')
    op.create_index(op.f('ix_products_title'), 'products', ['title'], unique=True)


def downgrade() -> None:
    """Downgrade schema."""
    op.execute('ALTER TABLE products RENAME COLUMN title TO name')
    op.execute('ALTER TABLE products RENAME COLUMN "imageUrl" TO image')
    op.drop_index(op.f('ix_products_title'), table_name='products')
    op.create_index(op.f('ix_products_name'), 'products', ['name'], unique=True)
    op.drop_column('products', 'category')
