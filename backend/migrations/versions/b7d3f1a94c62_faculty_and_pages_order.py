"""faculty and pages order

Revision ID: b7d3f1a94c62
Revises: 8c1e5a7d2b40
Create Date: 2026-10-06 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b7d3f1a94c62'
down_revision: Union[str, None] = '8c1e5a7d2b40'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

TABLES = ('faculties', 'pages', 'faculty_pages', 'department_pages')


def upgrade() -> None:
    for table in TABLES:
        op.add_column(table, sa.Column('order', sa.Integer(), nullable=True))
        # Mavjud yozuvlarga hozirgi tartib (id bo'yicha) saqlangan holda 1, 2, 3... beriladi
        op.execute(
            f"""
            UPDATE {table} AS t
            SET "order" = numbered.rn
            FROM (SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS rn FROM {table}) AS numbered
            WHERE t.id = numbered.id
            """
        )
        op.alter_column(table, 'order', nullable=False, server_default='0')


def downgrade() -> None:
    for table in TABLES:
        op.drop_column(table, 'order')
