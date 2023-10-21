"""empty message

Revision ID: 012959aa8c48
Revises: 9fbd685f466c
Create Date: 2023-10-21 12:45:33.547670

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '012959aa8c48'
down_revision = '9fbd685f466c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('profiles', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['uuid'])
        batch_op.drop_column('nowWatching')
        batch_op.drop_column('ratings')
        batch_op.drop_column('myList')

    with op.batch_alter_table('ratings', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'profiles', ['profile_id'], ['id'])

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('plan')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('plan', mysql.VARCHAR(length=32), nullable=True))

    with op.batch_alter_table('ratings', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    with op.batch_alter_table('profiles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('myList', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('ratings', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('nowWatching', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')

    # ### end Alembic commands ###
