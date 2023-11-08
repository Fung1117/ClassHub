import mysql.connector

conn = mysql.connector.connect(user='root', password='your password', database='project')   #local mysql
cursor = conn.cursor()

cursor.execute('create table user (id int primary key NOT NULL AUTO_INCREMENT, name varchar(20));')
cursor.execute('insert into user (name) values (%s)', ['Michael'])
cursor.execute('insert into user (name) values (%s)', ['Jessie'])

conn.commit()

cursor.execute('select * from user')
values = cursor.fetchall()
print(values)

cursor.execute('drop table user')

cursor.close()
conn.close()