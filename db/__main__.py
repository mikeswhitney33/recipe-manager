#!/usr/bin/env python3

import sqlite3
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("db_path")
args = parser.parse_args()

while True:
    print("{}> ".format(args.db_path), end="")
    command = input()
    if command == 'exit' or command == 'quit':
        break
    try:
        with sqlite3.connect(args.db_path) as conn:
            cur = conn.cursor()
            cur.execute(command)
            rows = cur.fetchall()
            conn.commit()
            for row in rows:
                print(row)
    except Exception as e:
        print(e)

