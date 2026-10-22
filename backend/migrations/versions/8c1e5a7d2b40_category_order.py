"""category order

Revision ID: 8c1e5a7d2b40
Revises: df8f140cd3eb
Create Date: 2026-10-06 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c1e5a7d2b40'
down_revision: Union[str, None] = 'df8f140cd3eb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('categories', sa.Column('order', sa.Integer(), nullable=True))
    # Mavjud kategoriyalarga hozirgi tartib (id bo'yicha) saqlangan holda 1, 2, 3... beriladi
    op.execute(
        """
        UPDATE categories AS c
        SET "order" = numbered.rn
        FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS rn FROM categories) AS numbered
        WHERE c.id = numbered.id
        """
    )
    op.alter_column('categories', 'order', nullable=False, server_default='0')


def downgrade() -> None:
    op.drop_column('categories', 'order')
