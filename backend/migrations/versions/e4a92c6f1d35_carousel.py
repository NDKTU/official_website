"""carousel

Revision ID: e4a92c6f1d35
Revises: b7d3f1a94c62
Create Date: 2026-10-08 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e4a92c6f1d35'
down_revision: Union[str, None] = 'b7d3f1a94c62'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'carousels',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title_uz', sa.String(), nullable=False),
        sa.Column('title_ru', sa.String(), nullable=False),
        sa.Column('title_en', sa.String(), nullable=False),
        sa.Column('subtitle_uz', sa.String(), nullable=False),
        sa.Column('subtitle_ru', sa.String(), nullable=False),
        sa.Column('subtitle_en', sa.String(), nullable=False),
        sa.Column('description_uz', sa.String(), nullable=False),
        sa.Column('description_ru', sa.String(), nullable=False),
        sa.Column('description_en', sa.String(), nullable=False),
        sa.Column('text_uz', sa.String(), nullable=False, server_default=''),
        sa.Column('text_ru', sa.String(), nullable=False, server_default=''),
        sa.Column('text_en', sa.String(), nullable=False, server_default=''),
        sa.Column('photo', sa.String(), nullable=True),
        sa.Column('link', sa.String(), nullable=True),
        sa.Column('order', sa.Integer(), nullable=False, server_default='0'),
        sa.PrimaryKeyConstraint('id'),
    )


def downgrade() -> None:
    op.drop_table('carousels')
